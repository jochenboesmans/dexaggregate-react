const _ = require("lodash");
const axios = require("axios");

const applyCorsHeaders = require("../middleware/applyCorsHeaders");
const exchanges = require("../model/exchanges");

/**
 * (GET) Retrieve in-depth information about price and other information about assets.
 * 	More info at [KyberDocs]{@link https://developer.kyber.network/docs/Trading/#market}.
 */
module.exports = (app) => {
	app.get('/api/markets/kyber', applyCorsHeaders, async (req, res) => {
		try {
			const result = await axios.get("https://api.kyber.network/market");
			const retrievedKyberMarket = result.data.data;
			const kyberMarket = _.map(retrievedKyberMarket, p => {
				if (!outOfDate(retrievedKyberMarket.timestamp)) {
					return (
						{
							base_symbol: p.base_symbol,
							quote_symbol: p.quote_symbol,
							market_data: {
								exchange: exchanges.KYBER_NETWORK,
								last_traded: p.last_traded,
								current_bid: p.current_bid,
								current_ask: p.current_ask,
								past_24h_high: p.past_24h_high,
								past_24h_low: p.past_24h_low,
								volume: p.eth_24h_volume
							}
						}
					)
				}}
			);
			res.send(kyberMarket);
		} catch (error) {
			console.log(`Error while trying to fetch market from Kyber API: ${error}`);
		}
	})
};
/**
 * Checks whether the given timestamp is more than 24 hours in the past.
 */
const outOfDate = (timestamp) => {
	let now = Date.now();
	return (now - timestamp) >= 24 * 60 * 60 * 1000;
};
