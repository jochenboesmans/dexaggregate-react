import * as withAbsintheSocket from "@absinthe/socket";
import { Socket as PhoenixSocket } from "phoenix";
import axios from "axios";

const absintheSocket = withAbsintheSocket.create(
	new PhoenixSocket(`ws://dexaggregate.com/socket`)
);

const httpURL: string = `http://dexaggregate.com/graphql`;

const queryHTTPEndpoint = async (query: string) => await axios.request({
	url: httpURL,
	method: `POST`,
	headers: { "Content-Type": `application/json`},
	data: JSON.stringify({ query: query })
});

type Operation = "subscription" | "query";
type Field = "daiRebasedMarket" | "exchanges" | "lastUpdate"

const queryString = (operation: Operation, field: Field) => `${operation} ${restOfQuery[field]}`;

const restOfQuery = {
	"daiRebasedMarket": `daiRebasedMarket {
		rebasedMarket (rebaseAddress: "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359") {
			baseAddress
			pairs {
				baseSymbol,
				quoteSymbol,
				marketData {
					exchange,
					lastPrice,
					currentAsk,
					currentBid,
					baseVolume,
					timestamp
				}
			}
		}
	}`,
	"exchanges": `exchanges {
		exchanges
	}`,
	"lastUpdate": `lastUpdate {
		lastUpdate {
			utcTime
			timestamp
			pair {
				baseSymbol,
				quoteSymbol,
				marketData {
					baseVolume,
					currentAsk,
					currentBid,
					exchange,
					lastPrice,
					timestamp
				}
			}
		}
	}`
};

const subscribeToMarket = async (dispatch) => {
	const initialMarket = await queryHTTPEndpoint(queryString("query", "daiRebasedMarket"));
	dispatch({type: `SET_MARKET`, payload: initialMarket.data.data.rebasedMarket.pairs});
	const marketNotifier = withAbsintheSocket.send(absintheSocket, {
		operation: queryString("subscription", "daiRebasedMarket")
	});
	withAbsintheSocket.observe(absintheSocket, marketNotifier, {
		onResult: data => dispatch({type: `SET_MARKET`, payload: data.data.rebasedMarket.pairs})
	});

	const initialExchanges = await queryHTTPEndpoint(queryString("query", "exchanges"));
	dispatch({type: `SET_EXCHANGES`, payload: initialExchanges.data.data.exchanges});
	const exchangesNotifier = withAbsintheSocket.send(absintheSocket, {
		operation: queryString("subscription", "exchanges")
	});
	withAbsintheSocket.observe(absintheSocket, exchangesNotifier, {
		onResult: data => dispatch({type: `SET_EXCHANGES`, payload: data.data.exchanges})
	});

	const initialLastUpdate = await queryHTTPEndpoint(queryString("query", "lastUpdate"));
	const adaptedInitialLastUpdate = {
		pair: initialLastUpdate.data.data.lastUpdate.pair,
		timestamp: Date.now()
	};
	dispatch({type: `SET_LAST_UPDATE`, payload: adaptedInitialLastUpdate});
	const lastUpdateNotifier = withAbsintheSocket.send(absintheSocket, {
		operation: queryString("subscription", "lastUpdate")
	});
	withAbsintheSocket.observe(absintheSocket, lastUpdateNotifier, {
		onResult: data => {
			const adaptedInitialLastUpdate = {
				pair: data.data.lastUpdate.pair,
				timestamp: Date.now()
			};
			dispatch({type: `SET_LAST_UPDATE`, payload: adaptedInitialLastUpdate});
		}
	});
};

const unsubscribeFromMarket = (dispatch) => {
	// TODO: Add teardown.
};

export { subscribeToMarket, unsubscribeFromMarket };