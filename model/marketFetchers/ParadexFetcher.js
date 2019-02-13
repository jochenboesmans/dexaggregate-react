const axios = require("axios");
const _ = require("lodash");

const { paradexAPIKey } = require("../../config");
const { getExchanges } = require("../exchanges");
const { setModelNeedsBroadcast } = require("../../websocketbroadcasts/modelNeedsBroadcast");

let market = {};

const initialize = async () => {
	await updateParadexMarket();
	setInterval(async () => {
		await updateParadexMarket();
	}, 15 * 1000);
};

const updateParadexMarket = async () => {
	const retrieveParadexMarket = async () => (await axios.get("https://api.paradex.io/consumer/v0/markets", {headers: {"API-KEY" : paradexAPIKey}})).data;
	const retrieveParadexOhlcv = async (m) => ((await axios.get(`https://api.paradex.io/consumer/v0/ohlcv?market=${m.symbol}&period=1d&amount=1`, {headers: {"API-KEY" : paradexAPIKey}})).data)[0];
	const retrieveParadexTicker = async (m) => (await axios.get(`https://api.paradex.io/consumer/v0/ticker?market=${m.symbol}`, {headers: {"API-KEY" : paradexAPIKey}})).data;
	const twentyFourHourAverage = (o) => (parseFloat(o.high) + parseFloat(o.low)) / 2;

	try {
		const retrievedParadexMarket = await retrieveParadexMarket();
		const paradexMarket = await Promise.all(_.map(retrievedParadexMarket, async m => {
			if (m.state === 'enabled') {
				const o = await retrieveParadexOhlcv(m);
				const t = await retrieveParadexTicker(m);
				if (t.last && t.bid && t.ask && o.high && o.low && o.volume) {
					return {
						base_symbol: m.quoteToken,
						quote_symbol: m.baseToken,
						market_data: {
							exchange: getExchanges().PARADEX,
							last_traded: parseFloat(t.last),
							current_bid: parseFloat(t.bid),
							current_ask: parseFloat(t.ask),
							volume: parseFloat(o.volume) * twentyFourHourAverage(o)
						}
					}
				}
			}}
		));
		market = _.filter(paradexMarket, p => p);
		setModelNeedsBroadcast(true);
	} catch (error) {
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

const getMarket = () => market;

module.exports = { initialize, getMarket };