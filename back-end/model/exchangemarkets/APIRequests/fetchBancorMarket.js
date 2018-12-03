const axios = require("axios");
const _ = require("lodash");

const exchanges = require("../../exchanges");

/**
 * TODO: Wait for Bancor to release an API that grants data for current_bid, current_ask, past_24h_high, past_24h_low
 */
module.exports = async () => {
	/*try {
		const pairsResponse = await axios.get("http://api.bancor.network/0.1/currencies/convertiblePairs");
		const pairs = pairsResponse.data.data;
		const listOfPairs = Object.keys(pairs).map(key => {
			return { base_symbol: parseBaseSymbol(key), quote_symbol: pairs[key] }
		});
		const bancorMarketInPromises = _.map(listOfPairs, async p => {
				try {
					const marketResponse = await axios.get(`https://api.bancor.network/0.1/currencies/${p.base_symbol}/ticker?fromCurrencyCode=${p.quote_symbol}`);
					const data = marketResponse.data;
					if (data) {

						const m = data.data;
						return {
							base_symbol: p.base_symbol,
							quote_symbol: p.quote_symbol,
							market_data: {
								exchange: exchanges.BANCOR,
								last_traded: m.price,
								//current_bid: market.bid,
								//current_ask: market.ask,
								//past_24h_high: market.high,
								//past_24h_low: market.low,
								volume: m.volume24h
							}
						}
					}
				} catch (error) {
					console.log(`Error while trying to fetch ticker from Bancor API: ${error}`);
				}
			}
		);
		const bancorMarket = await Promise.all(bancorMarketInPromises);
		return bancorMarket;
	} catch (error) {
		console.log(`Error while trying to fetch pairs from Bancor API: ${error}`);
	}*/
};

const parseBaseSymbol = (key) => {
	const length = key.length;
	if (key.slice(-3) === "BNT" && length > 3) {
		return key.slice(0, length-3);
	} else {
		return key;
	}

};
