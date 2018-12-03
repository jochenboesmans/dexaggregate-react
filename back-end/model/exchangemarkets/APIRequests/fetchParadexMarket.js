const axios = require("axios");
const _ = require("lodash");

const {paradexAPIKey} = require("../../../config/keys");
const exchanges = require("../../exchanges");

// TODO: Docs, refactoring
module.exports = async () => {
	try {
		const result = await axios.get("https://api.paradex.io/consumer/v0/markets", {
			headers: {"API-KEY" : paradexAPIKey}
		});
		const retrievedParadexMarket = result.data;
		const paradexMarketInPromises = _.map(retrievedParadexMarket, async m => {
			if (m.state === 'enabled') {
				const o = ((await axios.get(`https://api.paradex.io/consumer/v0/ohlcv?market=${m.symbol}&period=1d&amount=1`, {
					headers: {"API-KEY" : paradexAPIKey}
				})).data)[0];
				const t = (await axios.get(`https://api.paradex.io/consumer/v0/ticker?market=${m.symbol}`, {
					headers: {"API-KEY" : paradexAPIKey}
				})).data;
				if (t.last && t.bid && t.ask && o.high && o.low && o.volume) {
					return {
						base_symbol: m.baseToken,
						quote_symbol: m.quoteToken,
						market_data: {
							exchange: exchanges.PARADEX,
							last_traded: 1 / parseFloat(t.last),
							current_bid: 1 / parseFloat(t.bid),
							current_ask: 1 / parseFloat(t.ask),
							past_24h_high: 1 / parseFloat(o.high),
							past_24h_low: 1 / parseFloat(o.low),
							volume: parseFloat(o.volume) * (1 / parseFloat(t.last))
						}
					}
				}
			}}
		);
		const paradexMarket = await Promise.all(paradexMarketInPromises);
		const filtered = _.filter(paradexMarket, p => p);
		return filtered;
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