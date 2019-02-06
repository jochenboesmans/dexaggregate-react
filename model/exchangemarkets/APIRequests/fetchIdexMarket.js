const _ = require("lodash");
const axios = require("axios");

const { IDEX } = require("../../exchanges");

/* Retrieves the current market from the Idex API. */
module.exports = async () => {
	try {
		console.log(`IDEX START: ${Date.now()}`);
		return formatIdexMarket(filterPairs(convertToList(await retrieveIdexMarket())));
	} catch(error) {
		console.log(`Error while trying to fetch market from ${IDEX.name} API: ${error}`);
	}
};

/**
 * (GET) Retrieves in-depth information about price and other information about assets.
 *  More info at [Idex Docs]{@link https://github.com/AuroraDAO/idex-api-docs#returnticker}.
 */
const retrieveIdexMarket = async () => (await axios.post("https://api.idex.market/returnTicker", { json: {} })).data;

const convertToList = (retrievedIdexMarket) => Object.keys(retrievedIdexMarket)
                                                     .map(key => ({ pair: key, ...retrievedIdexMarket[key] }));

/* Filters a given retrievedIdexMarket based on them having the appropriate market data. */
const filterPairs = (retrievedIdexMarket) => _.filter(retrievedIdexMarket,
                                                      p => (parseFloat(p.last) && parseFloat(p.highestBid) && parseFloat(
	                                                      p.lowestAsk) && parseFloat(p.high) && parseFloat(p.low) && parseFloat(
	                                                      p.baseVolume)));

/* Formats a given filteredIdexMarket into the application-specific exchangeMarket structure. */
const formatIdexMarket = (filteredIdexMarket) => _.map(filteredIdexMarket, p => ({
	base_symbol: p.pair.split("_")[0], quote_symbol: p.pair.split("_")[1], market_data: {
		exchange: IDEX,
		last_traded: parseFloat(p.last),
		current_bid: parseFloat(p.highestBid),
		current_ask: parseFloat(p.lowestAsk),
		past_24h_high: parseFloat(p.high),
		past_24h_low: parseFloat(p.low),
		volume: parseFloat(p.baseVolume)
	}
}));