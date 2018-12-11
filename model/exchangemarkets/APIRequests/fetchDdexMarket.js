const _ = require("lodash");
const axios = require("axios");

const {DDEX} = require("../../exchanges");

/* Retrieves the current market from the Ddex API. */
module.exports = async () => {
	try {
		return formatDdexMarket(filterPairs(await retrieveDdexMarket()));
	} catch (error) {
		console.log(`Error while trying to fetch market from ${DDEX.name} API: ${error}`);
	}
};

/**
 * (GET) Retrieves in-depth information about price and other information about assets.
 * 	More info at [Ddex Docs]{@link https://docs.ddex.io/#list-tickers}.
 */
const retrieveDdexMarket = async () => (await axios.get("https://api.ddex.io/v2/markets/tickers")).data.data.tickers;

/* Filters a given retrievedDdexMarket based on its pairs having the appropriate market data. */
const filterPairs = (retrievedDdexMarket) => _.filter(retrievedDdexMarket, p =>
	(p.marketId && p.price && p.bid && p.ask && p.high && p.low && p.volume && !outOfDate(p.updatedAt)));

/* Formats a given filteredDdexMarket into the application-specific exchangeMarket structure. */
const formatDdexMarket = (filteredDdexMarket) => _.map(filteredDdexMarket, p => ({
	base_symbol: p.marketId.split('-')[1],
	quote_symbol: p.marketId.split('-')[0],
	market_data: {
		exchange: DDEX,
		last_traded: parseFloat(p.price),
		current_bid: parseFloat(p.bid),
		current_ask: parseFloat(p.ask),
		past_24h_high: parseFloat(p.high),
		past_24h_low: parseFloat(p.low),
		volume: parseFloat(p.volume) * twentyFourHourAverage(p)
	}
}));

const outOfDate = (timestamp) => (Date.now() - timestamp) >= 24 * 60 * 60 * 1000;
const twentyFourHourAverage = (p) => (parseFloat(p.high) + parseFloat(p.low)) / 2;