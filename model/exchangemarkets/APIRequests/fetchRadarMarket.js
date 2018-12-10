const _ = require("lodash");
const axios = require("axios");

const exchanges = require("../../exchanges");

/**
 * (GET) Retrieve in-depth information about price and other information about assets.
 * 	More info at [RadarRelay Docs]{@link https://developers.radarrelay.com/feed-api/v2/}.
 */
module.exports = async () => {
	try {
		return _.map(filterActivePairs(await retrieveRadarPairs()), p => formatRadarMarket(p));
	} catch (error) {
		console.log(`Error while trying to fetch pairs from Radar API: ${error.message}`);
	}
};

const retrieveRadarPairs = async () => (await axios.get("https://api.radarrelay.com/v2/markets?include=base,ticker,stats,history")).data;

const filterActivePairs = (activeRadarPairs) => _.filter(activeRadarPairs, p => p.active === 1);

const formatRadarMarket = (p) => ({
	base_symbol: p.displayName.split('/')[1],
	quote_symbol: p.displayName.split('/')[0],
	market_data: {
		exchange: exchanges.RADAR,
		last_traded: parseFloat(p.ticker.price),
		current_bid: parseFloat(p.ticker.bestBid),
		current_ask: parseFloat(p.ticker.bestAsk),
		past_24h_high: _.maxBy(p.history.price24Hour, price => parseFloat(price)),
		past_24h_low: _.minBy(p.history.price24Hour, price => parseFloat(price)),
		volume: parseFloat(p.stats.volume24Hour)
	}
});