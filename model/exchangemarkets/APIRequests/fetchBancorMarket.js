const axios = require("axios");
 const _ = require("lodash");

 const exchanges = require("../../exchanges");

/**
 * TODO: Wait for Bancor to release an API that grants data for current_bid, current_ask
 */
module.exports = async () => {
	try {
		const pairs = (await axios.get("http://api.bancor.network/0.1/currencies/convertiblePairs")).data.data;
		const listOfPairs = Object.keys(pairs)
		                          .map(key => ({ base_symbol: parseBaseSymbol(key), quote_symbol: pairs[key] }));
		const bancorMarket = await Promise.all(_.map(listOfPairs, async p => {
			const market = (await axios.get(`https://api.bancor.network/0.1/currencies/${p.base_symbol}/ticker?fromCurrencyCode=${p.quote_symbol}&displayCurrencyCode=ETH`)).data.data;
			const baseConverter = (await axios.get(`https://api.bancor.network/0.1/converters?code=${p.base_symbol}`)).data.data;
			const quoteConverter = (await axios.get(`https://api.bancor.network/0.1/converters?code=${p.quote_symbol}`)).data.data;
			const baseConverterPage = baseConverter ? baseConverter.page[0] : null;
			const quoteConverterPage = quoteConverter ? quoteConverter.page[0]: null;
			const baseID = baseConverterPage ? baseConverterPage._id : null;
			const quoteID = quoteConverterPage ? quoteConverterPage._id : null;
			const ask = (baseID && quoteID) ? (await axios.get(`https://api.bancor.network/0.1/currencies/${baseID}/value?toCurrencyId=${quoteID}&toAmount=1`)).data.data : null;
			const bid = (baseID && quoteID) ? (await axios.get(`https://api.bancor.network/0.1/currencies/${quoteID}/value?toCurrencyId=${baseID}&toAmount=1`)).data.data : null;
			if (ask && bid && market) {
				const result = {
					base_symbol: p.base_symbol, quote_symbol: p.quote_symbol, market_data: {
						exchange: exchanges.BANCOR,
						last_traded: parseFloat(market.price),
						current_bid: parseFloat(bid),
						current_ask: parseFloat(ask),
						past_24h_high: null,
						past_24h_low: null,
						volume: parseFloat(market.volume24h) / Math.pow(10,18),
					}
				};
				return result;
			}
		}));
		return _.filter(bancorMarket, el => el);
	} catch(error) {
		console.log(`Error while trying to fetch pairs from Bancor API: ${error}`);
	}
};

const parseBaseSymbol = (key) => (key.includes("BNT") && key.length > 3) ? key.replace("BNT", "") : key;

