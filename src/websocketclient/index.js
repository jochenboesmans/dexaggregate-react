import * as withAbsintheSocket from "@absinthe/socket";
import { Socket as PhoenixSocket } from "phoenix";

const subscribeToSocketBroadcasts = async (dispatch) => {
	const absintheSocket = withAbsintheSocket.create(
		new PhoenixSocket(`ws://dexaggregate.com/socket`)
	);

	const daiRebasedMarketSubscription = `
	  subscription daiRebasedMarket {
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
			  baseVolume
			}
		  }
		}
	  }
	`;

	const exchangesSubscription = `
		subscription exchanges {
		  exchanges 
		}
	`;

	const lastUpdateSubscription = `
		subscription lastUpdate {
			lastUpdate {
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
				utcTime
				timestamp
			}
		}
	`;

	const marketNotifier = withAbsintheSocket.send(absintheSocket, {
		operation: daiRebasedMarketSubscription
	});

	withAbsintheSocket.observe(absintheSocket, marketNotifier, {
		onResult: data => dispatch({type: `SET_MARKET`, payload: data.data.rebasedMarket.pairs})
	});

	const exchangesNotifier = withAbsintheSocket.send(absintheSocket, {
		operation: exchangesSubscription
	});

	withAbsintheSocket.observe(absintheSocket, exchangesNotifier, {
		onResult: data => dispatch({type: `SET_EXCHANGES`, payload: data.data.exchanges})
	});

	const lastUpdateNotifier = withAbsintheSocket.send(absintheSocket, {
		operation: lastUpdateSubscription
	});

	withAbsintheSocket.observe(absintheSocket, lastUpdateNotifier, {
		onResult: data => {
			const lastUpdate = {
				pair: data.data.lastUpdate.pair,
				timestamp: Date.now()
			};
			dispatch({type: `SET_LAST_UPDATE`, payload: lastUpdate});
		}
	});
};

const unsubscribeFromSocketBroadcasts = (dispatch) => {

};

export { subscribeToSocketBroadcasts, unsubscribeFromSocketBroadcasts };