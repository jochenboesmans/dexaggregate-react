const _ = require("lodash");
const axios = require("axios");

const exchanges = require("../exchanges");

/**
 * Retrieves the current market from the Idex API.
 */
module.exports = async () => {
	const retrievedIdexMarket = await retrieveIdexMarket();
	const asListIdexMarket = convertToList(retrievedIdexMarket);
	const filteredIdexMarket = filterPairs(asListIdexMarket);
	return formatIdexMarket(filteredIdexMarket);
};

/**
 * (GET) Retrieves in-depth information about price and other information about assets.
 * 	More info at [Idex Docs]{@link https://github.com/AuroraDAO/idex-api-docs#returnticker}.
 */
const retrieveIdexMarket = async () => {
	try {
		return (await axios.post("https://api.idex.market/returnTicker", {json: {}})).data;
	} catch (error) {
		console.log(`Error while trying to fetch market from ${exchanges.IDEX.name} API: ${error}`);
	}
};

const convertToList = (retrievedIdexMarket) => {
	return Object.keys(retrievedIdexMarket).map(key => { return { pair: key, ...retrievedIdexMarket[key] }});
};

/**
 * Filters a given retrievedIdexMarket based on them having the appropriate market data.
 */
const filterPairs = (retrievedIdexMarket) => _.filter(retrievedIdexMarket, p =>
	(parseFloat(p.last) && parseFloat(p.highestBid) && parseFloat(p.lowestAsk) && parseFloat(p.high) && parseFloat(p.low) && parseFloat(p.baseVolume)));

/**
 * Formats a given filteredIdexMarket into the application-specific exchangeMarket structure.
 */
const formatIdexMarket = (filteredIdexMarket) => _.map(filteredIdexMarket, p => {
	return {
		base_symbol: parseBaseSymbol(p.pair),
		quote_symbol: parseQuoteSymbol(p.pair),
		market_data: {
			exchange: exchanges.IDEX,
			last_traded: parseFloat(p.last),
			current_bid: parseFloat(p.highestBid),
			current_ask: parseFloat(p.lowestAsk),
			past_24h_high: parseFloat(p.high),
			past_24h_low: parseFloat(p.low),
			volume: parseFloat(p.baseVolume)
		}
	}
});


/**
 * Parses the base symbol from a string of type "{BASE_SYMBOL}_{QUOTE_SYMBOL}".
 */
const parseBaseSymbol = (pair) => {
	return pair.split('_')[0];
};

/**
 * Parses the quote symbol from a string of type "{BASE_SYMBOL}_{QUOTE_SYMBOL}".
 */
const parseQuoteSymbol = (pair) => {
	return pair.split('_')[1];
};