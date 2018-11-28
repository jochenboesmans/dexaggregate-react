const _ = require("lodash");
const axios = require("axios");

const applyCorsHeaders = require("../middleware/applyCorsHeaders");
const exchanges = require("../model/exchanges");

/**
 * (GET) Retrieve in-depth information about price and other information about assets.
 * 	More info at [Bancor Docs]{@link https://support.bancor.network/hc/en-us/sections/360001492551-Developer-Tools}.
 * 	TODO: Figure out a way to make this shitty API work.
 */
module.exports = (app) => {
	app.get('/api/markets/bancor', applyCorsHeaders, async (req, res) => {
		try {
			const pairsResponse = await axios.get("http://api.bancor.network/0.1/currencies/convertiblePairs");
			const pairs = pairsResponse.data.data;
			const listOfPairs = Object.keys(pairs).map(key => {
				return { base_symbol: key, quote_symbol: pairs[key] }
			});
			const bancorMarketInPromises = _.map(listOfPairs, async p => {
					const marketResponse = await axios.get(`https://api.bancor.network/0.1/currencies/${p.base_symbol}/ticker?fromCurrencyCode=${p.quote_symbol}`);
					const data = marketResponse.data;
					if (data) {
						const market = data.data;
						const returnObject = {
							base_symbol: p.base_symbol,
							quote_symbol: p.quote_symbol,
							market_data: {
								// TODO: exchange: exchanges.BANCOR,
								last_traded: market.last,
								current_bid: market.bid,
								current_ask: market.ask,
								past_24h_high: market.high,
								past_24h_low: market.low,
								volume: market.vol
							}
						};
						return returnObject;
					}
				}
			);
			const bancorMarket = await Promise.all(bancorMarketInPromises);
			res.send(bancorMarket);
		} catch (error) {
			console.log(`Error while trying to fetch market from Bancor API: ${error}`);
		}
	})
};