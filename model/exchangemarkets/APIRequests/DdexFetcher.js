const _ = require("lodash");
const axios = require("axios");

const { DDEX } = require("../../exchanges");
const { setModelNeedsBroadcast } = require("../../../websocketbroadcasts/modelNeedsBroadcast");

let subscribedChannels;
let market = {};

const initializeDdexFetcher = async () => {
	const fetch = (await axios.get("https://api.ddex.io/v3/markets/tickers")).data.data.tickers;
	market = _.reduce(fetch, (market, pair) => {
		market[pair.marketId] = pair;
		return market;
	}, market);
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
			if (data.type === "subscriptions") {
				subscribedChannels = data.channels;
			} else if (data.type === "ticker") {
				market[data.marketId] = data;
				setModelNeedsBroadcast(true);
			}
		}
	});
};

const getDdexMarket = () => _.reduce(market, (result, pair) => {
	const twentyFourHourAverage = (p) => (parseFloat(p.high) + parseFloat(p.low)) / 2;
	if (pair.marketId && pair.price && pair.bid && pair.ask && pair.high && pair.low && pair.volume) {
		result.push({
			            base_symbol: pair.marketId.split("-")[1],
			            quote_symbol: pair.marketId.split("-")[0],
			            market_data: {
				            exchange: DDEX,
				            last_traded: parseFloat(pair.price),
				            current_bid: parseFloat(pair.bid),
				            current_ask: parseFloat(pair.ask),
				            volume: parseFloat(pair.volume) * twentyFourHourAverage(pair),
			            }
		            })
	}
	return result;
}, []);

module.exports = { initializeDdexFetcher, getDdexMarket };

