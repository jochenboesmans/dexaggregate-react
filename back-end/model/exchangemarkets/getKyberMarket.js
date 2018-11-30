const _ = require("lodash");
const axios = require("axios");

const exchanges = require("../exchanges");

/**
 * Retrieves the current market from the Kyber API.
 */
module.exports = async () => {
	try {
		const retrievedKyberMarket = await retrieveKyberMarket();


		/*if (outOfDate(retrievedKyberMarket.timestamp)) {
			throw new Error(`Retrieved market from ${exchanges.KYBER.name} API is out of date.`);
		}*/
		return formatKyberMarket(retrievedKyberMarket);
	} catch (error) {
		console.log(`Error while trying to fetch market from ${exchanges.KYBER.name} API: ${error}`);
	}
};

/**
 * (GET) Retrieves in-depth information about price and other information about assets.
 * 	More info at [Kyber Docs]{@link https://developer.kyber.network/docs/Trading/#market}.
 */
const retrieveKyberMarket = async () => (await axios.get("https://api.kyber.network/market")).data.data;

/**
 * Formats a given retrievedKyberMarket into the application-specific exchangeMarket structure.
 */
const formatKyberMarket = (retrievedKyberMarket) =>
	_.map(retrievedKyberMarket, p => {
		return {
			base_symbol: p.base_symbol,
			quote_symbol: p.quote_symbol,
			market_data: {
				exchangeID: exchanges.KYBER.ID,
				last_traded: p.last_traded,
				current_bid: p.current_bid,
				current_ask: p.current_ask,
				past_24h_high: p.past_24h_high,
				past_24h_low: p.past_24h_low,
				volume: p.eth_24h_volume
			}
		}
	});

/**
 * Checks whether the given timestamp is more than 24 hours in the past.
 */
const outOfDate = (timestamp) => {
	let now = Date.now();
	return (now - timestamp) >= 24 * 60 * 60 * 1000;
};