const _ = require("lodash");
const axios = require("axios");

const { setModelNeedsBroadcast } = require("../../websocketbroadcasts/modelNeedsBroadcast");

let market;

const initialize = async () => {
	const fetch = (await axios.get("https://api.ddex.io/v3/markets/tickers")).data.data.tickers;
	market = _.reduce(fetch, (result, pair) => {
		if (pair.marketId && pair.price && pair.bid && pair.ask && pair.high && pair.low && pair.volume) {
			result[pair.marketId] = {
				b: pair.marketId.split("-")[1],
				q: pair.marketId.split("-")[0],
				m: {
					l: parseFloat(pair.price),
					b: parseFloat(pair.bid),
					a: parseFloat(pair.ask),
					v: parseFloat(pair.volume) * ((parseFloat(pair.high) + parseFloat(pair.low)) / 2),
				}
			};
			setModelNeedsBroadcast(true);
		}
		return result;
	}, {});
	initializeWSConnection();
};

const initializeWSConnection = () => {
	const WebSocket = require("ws");
	const wsURL = "wss://ws.ddex.io/v3";
	const ws = new WebSocket(wsURL);
	ws.on("open", async () => {
		ws.send(JSON.stringify({
			                       "type": "subscribe",
			                       "channels": [
				                       {
					                       "name": "ticker",
					                       "marketIds": await _.map(((await axios.get("https://api.ddex.io/v3/markets")).data.data.markets), m => m.id),
				                       },
			                       ]
		                       }));
		ws.onmessage = (message) => {
			const data = JSON.parse(message.data);
			if (data.type === "ticker") {
				const pair = data;
				if (pair.marketId && pair.price && pair.bid && pair.ask && pair.high && pair.low && pair.volume) {
					market[pair.marketId] = {
						b: pair.marketId.split("-")[1],
						q: pair.marketId.split("-")[0],
						m: {
							l: parseFloat(pair.price),
							b: parseFloat(pair.bid),
							a: parseFloat(pair.ask),
							v: parseFloat(pair.volume) * ((parseFloat(pair.high) + parseFloat(pair.low)) / 2),
						}
					};
					setModelNeedsBroadcast(true);
				}

			}
		}
	});
};

const getMarket = () => market;

module.exports = { initialize, getMarket };

