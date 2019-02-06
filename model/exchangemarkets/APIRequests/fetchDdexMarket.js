const _ = require("lodash");
const axios = require("axios");
const WebSocket = require("ws");

const { DDEX } = require("../../exchanges");

const getMarketIds = async () => _.map(((await axios.get("https://api.ddex.io/v3/markets")).data.data.markets), m => m.id);

let subscribedChannels;
let retrievedMarket = {};

const wsURL = "wss://ws.ddex.io/v3";
const ws = new WebSocket(wsURL);
ws.on("open", async () => {
	ws.send(JSON.stringify({
		        "type": "subscribe",
		        "channels": [
			        {
				        "name": "ticker",
				        "marketIds": await getMarketIds(),
			        },
		        ]
	        }));
	ws.onmessage = (message) => {
		const data = JSON.parse(message.data);
		if (data.type === "subscriptions") {
			subscribedChannels = data.channels;
		} else if (data.type === "ticker") {
			retrievedMarket[data.marketId] = data;
		}
	}
});

module.exports = async () => {
	try {
		console.log(`DDEX START: ${Date.now()}`);
		if (Object.keys(retrievedMarket).length === 0) {
			await retrieveDdexMarket();
		}
		return formatDdexMarket(filterPairs());
	} catch(error) {
		console.log(`Error while trying to fetch market from ${DDEX.name} API: ${error}`);
	}
};

/**
 * (GET) Retrieves in-depth information about price and other information about assets.
 *  More info at [Ddex Docs]{@link https://docs.ddex.io/#list-tickers}.
 */

const retrieveDdexMarket = async () => {
	const tickers = (await axios.get("https://api.ddex.io/v3/markets/tickers")).data.data.tickers;
	_.forEach(tickers, t => {
		retrievedMarket[t.marketId] = t
	});
};

/* Filters a given retrievedDdexMarket based on its pairs having the appropriate market data. */
const filterPairs = () => _.filter(retrievedMarket,
                                                      p => (p.marketId && p.price && p.bid && p.ask && p.high && p.low && p.volume));

/* Formats a given filteredDdexMarket into the application-specific exchangeMarket structure. */
const formatDdexMarket = (filteredDdexMarket) => _.map(filteredDdexMarket, p => ({
	base_symbol: p.marketId.split("-")[1], quote_symbol: p.marketId.split("-")[0], market_data: {
		exchange: DDEX,
		last_traded: parseFloat(p.price),
		current_bid: parseFloat(p.bid),
		current_ask: parseFloat(p.ask),
		past_24h_high: parseFloat(p.high),
		past_24h_low: parseFloat(p.low),
		volume: parseFloat(p.volume) * twentyFourHourAverage(p),
	}
}));

const outOfDate = (timestamp) => (Date.now() - timestamp) >= 24 * 60 * 60 * 1000;
const twentyFourHourAverage = (p) => (parseFloat(p.high) + parseFloat(p.low)) / 2;