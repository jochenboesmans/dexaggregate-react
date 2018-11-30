const _ = require("lodash");
const axios = require("axios");

const exchanges = require("../market").exchanges;

/**
 * Retrieves the current market from the Ddex API.
 */
module.exports = async () => {
	const retrievedDdexMarket = await retrieveDdexMarket();
	const filteredDdexMarket = filterPairs(retrievedDdexMarket);
	return formatDdexMarket(filteredDdexMarket);
};

/**
 * (GET) Retrieves in-depth information about price and other information about assets.
 * 	More info at [Ddex Docs]{@link https://docs.ddex.io/#list-tickers}.
 */
const retrieveDdexMarket = async () => {
	try {
		return (await axios.get("https://api.ddex.io/v2/markets/tickers")).data.data.tickers;
	} catch (error) {
		console.log(`Error while trying to fetch market from ddex API: ${error}`);
	}
};

/**
 * Filters a given retrievedDdexMarket based on them having the appropriate market data.
 */
const filterPairs = (retrievedDdexMarket) => _.filter(retrievedDdexMarket, p =>
	(p.marketId && p.price && p.bid && p.ask && p.high && p.low && p.volume && !outOfDate(p.updatedAt)));

/**
 * Formats a given filteredDdexMarket into the application-specific exchangeMarket structure.
 */
const formatDdexMarket = (filteredDdexMarket) => _.map(filteredDdexMarket, p => {
	return {
		base_symbol: parseBaseSymbol(p.marketId),
		quote_symbol: parseQuoteSymbol(p.marketId),
		market_data: {
			exchange: exchanges.DDEX,
			last_traded: parseFloat(p.price),
			current_bid: parseFloat(p.bid),
			current_ask: parseFloat(p.ask),
			past_24h_high: parseFloat(p.high),
			past_24h_low: parseFloat(p.low),
			volume: parseFloat(p.volume) * parseFloat(p.price)
		}
	}
});

/**
 * Parses the base symbol from a string of type "{BASE_SYMBOL}/{QUOTE_SYMBOL}".
 */
const parseBaseSymbol = (pair) => {
	return pair.split('-')[1];
};

/**
 * Parses the quote symbol from a string of type "{BASE_SYMBOL}/{QUOTE_SYMBOL}".
 */
const parseQuoteSymbol = (pair) => {
	return pair.split('-')[0];
};

/**
 * Checks whether the given timestamp is more than 24 hours in the past.
 */
const outOfDate = (timestamp) => {
	let now = Date.now();
	return (now - timestamp) >= 24 * 60 * 60 * 1000;
};