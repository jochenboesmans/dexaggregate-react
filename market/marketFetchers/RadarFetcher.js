const axios = require("axios");
const isEqual = require("lodash/isEqual");

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
	const newMarket = [];
	Object.keys(receivedMarket).forEach(pKey => {
		const p = receivedMarket[pKey];
		if(p.active && p.displayName.split("/")[1] && p.displayName.split("/")[0] && parseFloat(p.ticker.price)
			&& parseFloat(p.ticker.bestBid) && parseFloat(p.ticker.bestAsk) && parseFloat(p.stats.volume24Hour)) {
			newMarket.push({
				b: p.displayName.split("/")[1],
				q: p.displayName.split("/")[0],
				m: {
					l: parseFloat(p.ticker.price),
					b: parseFloat(p.ticker.bestBid),
					a: parseFloat(p.ticker.bestAsk),
					v: parseFloat(p.stats.volume24Hour),
				}
			});
		}
	});
	if (newMarket && !isEqual(newMarket, market)) {
		market = newMarket;
		timestamp = Date.now();
		setMarketNeedsUpdate(true);
	}
};

module.exports = {
	initialize,
	getMarket,
	getTimestamp
};