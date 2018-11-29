const axios = require("axios");
const _ = require("lodash");

const {paradexAPI} = require("../../config/keys");
const exchanges = require("../exchanges");

// TODO: Rewrite Kyber code to suit Paradex API
module.exports = async () => {
	try {
		const result = await axios.get("TODO: paradexAPIURL", {
			headers: {"API-KEY" : paradexAPI}
		});
		const retrievedParadexMarket = result.data.data;
		const paradexMarket = _.map(retrievedParadexMarket, p => {
			if (!outOfDate(retrievedParadexMarket.timestamp)) {
				return (
					{
						base_symbol: p.base_symbol,
						quote_symbol: p.quote_symbol,
						market_data: {
							exchange: exchanges.PARADEX,
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
		return paradexMarket;
	} catch (error) {
		console.log(`Error while trying to fetch market from Paradex API: ${error}`);
	}
};

/**
 * Checks whether the given timestamp is more than 24 hours in the past.
 */
const outOfDate = (timestamp) => {
	let now = Date.now();
	return (now - timestamp) >= 24 * 60 * 60 * 1000;
};