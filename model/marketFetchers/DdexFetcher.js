const _ = require("lodash");
const axios = require("axios");

const { setModelNeedsBroadcast } = require("../../websocketbroadcasts/modelNeedsBroadcast");

let market = {};
let timestamp;
const getMarket = () => market;
const getTimestamp = () => timestamp;

const fetch = async () => {
	const fetch = (await axios.get("https://api.ddex.io/v3/markets/tickers")).data.data.tickers;
	_.forEach(fetch, (pair) => potentiallyAddToMarket(pair));
};

const initialize = async () => {
	await fetch();
	await initializeWSConnection();
	/* Fallback in case of improper ws API */
	/*setInterval(async () => {
		if (Date.now() - timestamp > 60 * 1000) {
			await fetch();
		}
	}, 5 * 1000);*/
};

const initializeWSConnection = async () => {
	const WebSocket = require("ws");
	const wsURL = "wss://ws.ddex.io/v3";
	const ws = new WebSocket(wsURL);
	const askForTickers = JSON.stringify({
		"type": "subscribe",
		"channels": [{
			"name": "ticker",
			"marketIds": await _.map(((await axios.get("https://api.ddex.io/v3/markets")).data.data.markets), m => m.id),
		},]
	});
	setTimeout(() => ws.send(askForTickers),5 * 1000);
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
	const v = parseFloat(pair.volume) * ((parseFloat(pair.high) + parseFloat(pair.low)) / 2);

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
		setModelNeedsBroadcast(true);
	}
};

module.exports = {
	initialize,
	getMarket,
	getTimestamp
};

