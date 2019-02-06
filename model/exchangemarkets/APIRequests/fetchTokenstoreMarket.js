const _ = require("lodash");
const axios = require("axios");

const { TOKENSTORE } = require("../../exchanges");

/**
 * TODO: Implement WebSocket client once it arrives.
 * No signs of it appearing any time soon.
 */
module.exports = async () => {
	try {
		console.log(`TOKENSTORE START: ${Date.now()}`);
		return formatTokenstoreMarket(await retrieveTokenstoreMarket());
	} catch(error) {
		console.log(`Error while trying to fetch market from ${TOKENSTORE.name} API: ${error}`);
	}
};

const retrieveTokenstoreMarket = async () => (await axios.get("https://v1-1.api.token.store/ticker")).data;

/* Formats a given retrievedKyberMarket into the application-specific exchangeMarket structure. */
const formatTokenstoreMarket = (retrievedTokenstoreMarket) => _.reduce(retrievedTokenstoreMarket, (result, p) => {
	result.push({
		base_symbol: "ETH", quote_symbol: p.symbol, market_data: {
			exchange: TOKENSTORE,
			last_traded: p.last,
			current_bid: p.ask,
			current_ask: p.bid,
			past_24h_high: null,
			past_24h_low: null,
			volume: p.baseVolume,
		}
	});
	return result;
}, []);