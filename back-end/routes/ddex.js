const _ = require("lodash");
const axios = require("axios");

const applyCorsHeaders = require("../middleware/applyCorsHeaders");
const exchanges = require("../model/exchanges");

/**
 * (GET) Retrieve in-depth information about price and other information about assets.
 * 	More info at [DDEX Docs]{@link https://docs.ddex.io/#public-rest-api}.
 */
module.exports = (app) => {
	app.get('/api/markets/ddex', applyCorsHeaders, async (req, res) => {
		try {
			const result = await axios.get("https://api.ddex.io/v2/markets/tickers");
			const retrievedDDEXMarket = result.data.data.tickers;
			const formattedDDEXMarket = _.map(retrievedDDEXMarket, p => {
				if (p.marketId && p.price && p.bid && p.ask && p.high && p.low && p.volume) {
					const returnObject = {
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
					};
					return returnObject;
				}
			});
			const filterNonNull = _.filter(formattedDDEXMarket, p => p);
			res.send(filterNonNull);
		} catch (error) {
			console.log(`Error while trying to fetch market from DDEX API: ${error}`);
		}
	})
};

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