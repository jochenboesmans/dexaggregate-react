const axios = require("axios");
const WebSocket = require("ws");

const { setMarketNeedsUpdate } = require("../updateNotifier");

console.log(setMarketNeedsUpdate);

let market = {};
let timestamp;
const getMarket = () => market;
const getTimestamp = () => timestamp;

const fetch = async () => {
	const fetch = (await axios.get("https://api.ddex.io/v3/markets/tickers")).data.data.tickers;
	fetch.forEach((pair) => potentiallyAddToMarket(pair));
};

const initialize = async () => {
	await fetch();
	await initializeWSConnection();
};

const initializeWSConnection = async () => {
	const wsURL = "wss://ws.ddex.io/v3";
	const ws = new WebSocket(wsURL);
	const askForTickers = JSON.stringify({
		"type": "subscribe",
		"channels": [{
			"name": "ticker",
			"marketIds": ((await axios.get("https://api.ddex.io/v3/markets")).data.data.markets).map(m => m.id),
		},]
	});
	setTimeout(() => ws.send(askForTickers),2.5 * 1000);
	ws.onmessage = (response) => {
		const data = JSON.parse(response.data);
		if(data.type === "ticker") {
			potentiallyAddToMarket(data);
		}
	};
};

const potentiallyAddToMarket = (pair) => {
	const l = parseFloat(pair.price);
	const b = parseFloat(pair.bid);
	const a = parseFloat(pair.ask);

	const v = parseFloat(pair.volume) * pair.price;

	if(pair.marketId && l && b && a && v) {
		market[pair.marketId] = {
			b: pair.marketId.split("-")[1],
			q: pair.marketId.split("-")[0],
			m: {
				l: l,
				b: b,
				a: a,
				v: v,
			}
		};
		timestamp = Date.now();
		setMarketNeedsUpdate(true);
	}
};

module.exports = {
	initialize,
	getMarket,
	getTimestamp
};

