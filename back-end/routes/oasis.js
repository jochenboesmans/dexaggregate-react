const axios = require("axios");
const _ = require("lodash");

const applyCorsHeaders = require("../middleware/applyCorsHeaders");
const exchanges = require("../model/exchanges");

/**
 * (GET) Retrieve in-depth information about price and other information about assets.
 * 	More info at [MakerDAO Docs]{@link https://developer.makerdao.com/oasis/api/1/markets}.
 */
module.exports = (app) => {
	app.get('/api/markets/oasis', applyCorsHeaders, async (req, res) => {
		try {
			const pairsResponse = await axios.get("http://api.oasisdex.com/v1/pairs/");
			const pairs = pairsResponse.data.data;
			const timestamp = pairsResponse.data.time;
			if (!outOfDate(timestamp)) {
				const oasisMarketInPromises = _.map(pairs, async p => {
						if (p.active) {
							const marketResponse = await axios.get(`http://api.oasisdex.com/v1/markets/${p.base}/${p.quote}`);
							const market = marketResponse.data.data;
							const returnObject = {
								base_symbol: p.base,
								quote_symbol: p.quote,
								market_data: {
									exchange: exchanges.OASIS_DEX,
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
				const oasisMarket = await Promise.all(oasisMarketInPromises);
				const filtered = _.filter(oasisMarket, p => p);
				res.send(filtered);
			}
		} catch (error) {
			console.log(`Error while trying to fetch market from Oasis API: ${error.message}`);
		}
	})
};
/**
 * Checks whether the given timestamp is more than 24 hours in the past.
 */
const outOfDate = (timestamp) => {
	let now = Date.now() / 1000;
	return (now - timestamp) >= 24 * 60 * 60 * 1000;
};
