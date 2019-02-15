const _ = require("lodash");
const axios = require("axios");

const { getExchanges } = require("../exchanges");
const { setModelNeedsBroadcast } = require("../../websocketbroadcasts/modelNeedsBroadcast");

let market;
let timestamp;
const getMarket = () => market;
const getTimestamp = () => timestamp;

const initialize = async () => {
	await tryUpdateMarket();
	setInterval(async () => {
		await tryUpdateMarket();
	}, 5 * 1000);
};

const tryUpdateMarket = async () => {
	try {
		const receivedMarket = (await axios.get("https://api.radarrelay.com/v2/markets?include=base,ticker,stats,history")).data;
		updateMarket(receivedMarket);
	} catch(error) {
		console.log(`Error while trying to fetch market from ${getExchanges().RADAR.name} API: ${error}`);
	}
};

const updateMarket = (receivedMarket) => {
	const newMarket = _.reduce(receivedMarket, (result, pair) => {
		if(pair.active && pair.displayName.split("/")[1] && pair.displayName.split("/")[0] && parseFloat(pair.ticker.price) && parseFloat(pair.ticker.bestBid) && parseFloat(pair.ticker.bestAsk) && parseFloat(pair.stats.volume24Hour)) {
			result.push({
				b: pair.displayName.split("/")[1],
				q: pair.displayName.split("/")[0],
				m: {
					l: parseFloat(pair.ticker.price),
					b: parseFloat(pair.ticker.bestBid),
					a: parseFloat(pair.ticker.bestAsk),
					v: parseFloat(pair.stats.volume24Hour),
				}
			});
		}
		return result;
	}, []);
	if (newMarket && !_.isEqual(newMarket, market)) {
		market = newMarket;
		timestamp = Date.now();
		setModelNeedsBroadcast(true);
		console.log("idex update");
	}
};

module.exports = {
	initialize,
	getMarket,
	getTimestamp
};