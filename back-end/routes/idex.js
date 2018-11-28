const _ = require("lodash");
const axios = require("axios");

const applyCorsHeaders = require("../middleware/applyCorsHeaders");
const exchanges = require("../model/exchanges");

/**
 * (GET) Retrieve all IDEX markets.
 * 	More info at [Idex Docs]{@link https://github.com/AuroraDAO/idex-api-docs#returnticker}.
 */
module.exports = (app) => {
	app.get('/api/markets/idex', applyCorsHeaders, async (req, res) => {
		try {
			const pairs = (await axios.post("https://api.idex.market/returnTicker", {
				json: {}
			})).data;
			const listOfPairs = Object.keys(pairs).map(key => {
				return { pair: key, ...pairs[key] }
			});
			const idexMarket = _.map(listOfPairs, p => {
				return (
					{
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
				)}
			);
			res.send(idexMarket);
		} catch (err) {
			console.log(`Error while trying to fetch market from IDEX API: ${err})`);
		}
	})
};

/**
 * Parses the base symbol from a string of type "{BASE_SYMBOL}/{QUOTE_SYMBOL}".
 */
const parseBaseSymbol = (pair) => {
	return pair.split('_')[0];
};

/**
 * Parses the quote symbol from a string of type "{BASE_SYMBOL}/{QUOTE_SYMBOL}".
 */
const parseQuoteSymbol = (pair) => {
	return pair.split('_')[1];
};