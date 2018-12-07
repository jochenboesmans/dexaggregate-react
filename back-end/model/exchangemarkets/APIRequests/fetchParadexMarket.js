const axios = require("axios");
const _ = require("lodash");

const {paradexAPIKey} = require("../../../config");
const {PARADEX} = require("../../exchanges");

module.exports = async () => {
	try {
		const retrievedParadexMarket = await retrieveParadexMarket();
		const paradexMarketInPromises = _.map(retrievedParadexMarket, async m => {
			if (m.state === 'enabled') {
				const o = await retrieveParadexOhlcv(m);
				const t = await retrieveParadexTicker(m);
				if (t.last && t.bid && t.ask && o.high && o.low && o.volume) {
					return formatParadexMarketPair(m, o, t);
				}
			}}
		);
		return _.filter((await Promise.all(paradexMarketInPromises)), p => p);
	} catch (error) {
		console.log(`Error while trying to fetch market from ${PARADEX.name} API: ${error}`);
	}
};

const retrieveParadexMarket = async () => (await axios.get("https://api.paradex.io/consumer/v0/markets", {headers: {"API-KEY" : paradexAPIKey}})).data;
const retrieveParadexOhlcv = async (m) => ((await axios.get(`https://api.paradex.io/consumer/v0/ohlcv?market=${m.symbol}&period=1d&amount=1`, {headers: {"API-KEY" : paradexAPIKey}})).data)[0];
const retrieveParadexTicker = async (m) => (await axios.get(`https://api.paradex.io/consumer/v0/ticker?market=${m.symbol}`, {headers: {"API-KEY" : paradexAPIKey}})).data;

const formatParadexMarketPair = (m, o, t) => ({
	base_symbol: m.quoteToken,
	quote_symbol: m.baseToken,
	market_data: {
		exchange: PARADEX,
		last_traded: parseFloat(t.last),
		current_bid: parseFloat(t.bid),
		current_ask: parseFloat(t.ask),
		past_24h_high: parseFloat(o.high),
		past_24h_low: parseFloat(o.low),
		volume: parseFloat(o.volume) * parseFloat(t.last)
	}
});