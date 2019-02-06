const _ = require("lodash");
const axios = require("axios");
const WebSocket = require("ws");

const { IDEX } = require("../../exchanges");

/* TODO: Implement WebSocket client.
The current IDEX WebSocket API doesn't currently provide a straight forward way to fetch ticker, volume data directly.
There'd have to be a maintained copy of the orderbook on this application's side.
Perhaps best to wait for the upcoming "v2" rollout.

let retrievedMarket = {};

const wsURL = "wss://v1.idex.market";
const ws = new WebSocket(wsURL);
ws.on("open", async () => {
	ws.send(JSON.stringify(  {
		                         "method": "handshake",
		                         "payload": {
			                         "type": "client",
			                         "version": "2.0",
			                         "key": "17paIsICur8sA0OBqG6dH5G1rmrHNMwt4oNk4iX9"
		                         }
	                         }));
	ws.onmessage = (message) => {
		const data = JSON.parse(message.data);
		if (data.type === "subscriptions") {
			subscribedChannels = data.channels;
		} else if (data.type === "ticker") {
			retrievedMarket[data.marketId] = data;
		}
	}
});*/

/* Retrieves the current market from the Idex API. */
module.exports = async () => {
	try {
		console.log(`IDEX START: ${Date.now()}`);
		return constructIdexMarket(await retrieveIdexMarket());
	} catch(error) {
		console.log(`Error while trying to fetch market from ${IDEX.name} API: ${error}`);
	}
};

/**
 * (GET) Retrieves in-depth information about price and other information about assets.
 *  More info at [Idex Docs]{@link https://github.com/AuroraDAO/idex-api-docs#returnticker}.
 */
const retrieveIdexMarket = async () => (await axios.post("https://api.idex.market/returnTicker", { json: {} })).data;

/* Formats a given filteredIdexMarket into the application-specific exchangeMarket structure. */
const constructIdexMarket = (retrievedIdexMarket) => _.reduce(Object.keys(retrievedIdexMarket), (result, key) => {
	const p = retrievedIdexMarket[key];
	if((parseFloat(p.last) && parseFloat(p.highestBid) && parseFloat(
		p.lowestAsk) && parseFloat(p.high) && parseFloat(p.low) && parseFloat(
		p.baseVolume))) {
		result.push({
			base_symbol: key.split("_")[0], quote_symbol: key.split("_")[1], market_data: {
				exchange: IDEX,
				last_traded: parseFloat(p.last),
				current_bid: parseFloat(p.highestBid),
				current_ask: parseFloat(p.lowestAsk),
				past_24h_high: parseFloat(p.high),
				past_24h_low: parseFloat(p.low),
				volume: parseFloat(p.baseVolume)
			}
		});
	}
	return result;
}, []);