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
							const m = marketResponse.data.data;
							if (parseFloat(m.last) && parseFloat(m.bid) && parseFloat(m.ask) && parseFloat(m.high) && parseFloat(m.low) && parseFloat(m.vol)) {
								const returnObject = {
									base_symbol: p.quote,
									quote_symbol: p.base,
									market_data: {
										exchange: exchanges.OASIS_DEX,
										last_traded: parseFloat(m.last),
										current_bid: parseFloat(m.bid),
										current_ask: parseFloat(m.ask),
										past_24h_high: parseFloat(m.high),
										past_24h_low: parseFloat(m.low),
										volume: parseFloat(m.vol)
									}
								};
								return returnObject;
							}
						}
					}
				);
				const oasisMarket = await Promise.all(oasisMarketInPromises);
				const filterNotNull = _.filter(oasisMarket, p => p);
				res.send(filterNotNull);
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
