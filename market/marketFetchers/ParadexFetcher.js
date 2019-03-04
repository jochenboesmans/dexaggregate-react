const axios = require("axios");
const isEqual = require("lodash/isEqual");

const paradexAPIKey = process.env.PARADEX_API_KEY;
const { getExchanges } = require("../exchanges");
const { setMarketNeedsUpdate } = require("../updateNotifier");

let market;
let timestamp;
const getMarket = () => market;
const getTimestamp = () => timestamp;

const initialize = async () => {
	await tryUpdateMarket();
	setInterval(async () => {
		await tryUpdateMarket();
	}, 60 * 1000);
};

const tryUpdateMarket = async () => {
	const retrieveParadexMarket = async () => (await axios.get("https://api.paradex.io/consumer/v0/markets", { headers: { "API-KEY": paradexAPIKey } })).data;
	const retrieveParadexOhlcv = async (m) => ((await axios.get(`https://api.paradex.io/consumer/v0/ohlcv?market=${m.symbol}&period=1d&amount=1`, { headers: { "API-KEY": paradexAPIKey } })).data)[0];
	const retrieveParadexTicker = async (m) => (await axios.get(`https://api.paradex.io/consumer/v0/ticker?market=${m.symbol}`, { headers: { "API-KEY": paradexAPIKey } })).data;
	const lbaAverage = (t) => (parseFloat(t.last) + parseFloat(t.ask) + parseFloat(t.bid)) / 3;

	try {
		const retrievedParadexMarket = await retrieveParadexMarket();
		const paradexMarket = await Promise.all(Object.keys(retrievedParadexMarket).map(async mKey => {
			const m = retrievedParadexMarket[mKey];
			if (m.state === "enabled") {
				const o = await retrieveParadexOhlcv(m);
				if (o.high && o.low && o.volume) {
					const t = await retrieveParadexTicker(m);
					if (t.last && t.bid && t.ask) {
						return {
							b: m.quoteToken,
							q: m.baseToken,
							m: {
								l: parseFloat(t.last),
								b: parseFloat(t.bid),
								a: parseFloat(t.ask),
								v: parseFloat(o.volume) * lbaAverage(t)
							}
						};
					}
				}
			}
		}));
		const newMarket = paradexMarket.filter(p => p);
		if (newMarket && !isEqual(newMarket, market)) {
			market = newMarket;
			timestamp = Date.now();
			setMarketNeedsUpdate(true);
		}
	} catch(error) {
		console.log(`Error while trying to fetch market from ${getExchanges().PARADEX.name} API: ${error}`);
	}
};

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

module.exports = {
	initialize,
	getMarket,
	getTimestamp
};