const axios = require("axios");
const _ = require("lodash");
const io = require("socket.io-client");

const { paradexAPIKey } = require("../../../config");
const { PARADEX } = require("../../exchanges");

// TODO: Implement WebSocket client for better performance.
/*const socketURL = "http://api.paradex.io/wsapi/v1";
const socket = io.connect(socketURL, { transports: ['websocket'] });
socket.on("open", () => console.log("open"));
socket.on("connect", () => console.log("connect"));
socket.on("connection", () => console.log("connection"));
socket.emit({
	'version': '1.0',
	'type': 'request',
	'target': '/api/v1/tokens',
	'method': 'GET',
	'api_key': paradexAPIKey,
	'id': 1,
});
socket.emit({
	'version': '1.0',
	'type': 'request',
	'target': '/api/v1/markets',
	'method': 'GET',
	'api_key': paradexAPIKey,
	'id': 1,
});
socket.on("message", (message) => {
	console.log(message);
});*/

let lastOhlcvUpdate = 0;

module.exports = async () => {
	try {
		console.log(`PARADEX START: ${Date.now()}`);
		const retrievedParadexMarket = await retrieveParadexMarket();
		const paradexMarketInPromises = _.map(retrievedParadexMarket, async m => {
			if(m.state === "enabled") {
				const o = await retrieveParadexOhlcv(m);
				const t = await retrieveParadexTicker(m);
				if(t.last && t.bid && t.ask && o && o.high && o.low && o.volume) {
					return formatParadexMarketPair(m, o, t);
				}
			}
		});
		return _.filter((await Promise.all(paradexMarketInPromises)), p => p);
	} catch(error) {
		console.log(`Error while trying to fetch market from ${PARADEX.name} API: ${error}`);
	}
};

const retrieveParadexMarket = async () => (await axios.get("https://api.paradex.io/consumer/v0/markets",
                                                           { headers: { "API-KEY": paradexAPIKey } })).data;
const retrieveParadexOhlcv = async (m) => {
	if (Date.now() - lastOhlcvUpdate >= 5 * 60 * 1000) {
		lastOhlcvUpdate = Date.now();
		return ((await axios.get(`https://api.paradex.io/consumer/v0/ohlcv?market=${m.symbol}&period=1d&amount=1`,
		                         { headers: { "API-KEY": paradexAPIKey } })).data)[0];
	}
};

const retrieveParadexTicker = async (m) => (await axios.get(`https://api.paradex.io/consumer/v0/ticker?market=${m.symbol}`,
                                                            { headers: { "API-KEY": paradexAPIKey } })).data;

const formatParadexMarketPair = (m, o, t) => ({
	base_symbol: m.quoteToken, quote_symbol: m.baseToken, market_data: {
		exchange: PARADEX,
		last_traded: parseFloat(t.last),
		current_bid: parseFloat(t.bid),
		current_ask: parseFloat(t.ask),
		past_24h_high: parseFloat(o.high),
		past_24h_low: parseFloat(o.low),
		volume: parseFloat(o.volume) * twentyFourHourAverage(o)
	}
});

const twentyFourHourAverage = (o) => (parseFloat(o.high) + parseFloat(o.low)) / 2;