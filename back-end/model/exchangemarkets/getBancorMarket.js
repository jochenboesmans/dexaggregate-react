const axios = require("axios");
const _ = require("lodash");

const exchanges = require("../exchanges");

module.exports = async () => {
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
							exchange: exchanges.BANCOR,
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
		return bancorMarket;
	} catch (error) {
		console.log(`Error while trying to fetch market from Bancor API: ${error}`);
	}
};