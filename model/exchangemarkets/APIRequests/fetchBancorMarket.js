/*const axios = require("axios");
const _ = require("lodash");

const exchanges = require("../../exchanges");*/

/**
 * TODO: Wait for Bancor to release an API that grants data for current_bid, current_ask, past_24h_high, past_24h_low
 */
module.exports = async () => {
	/*try {
		const pairs = (await axios.get("http://api.bancor.network/0.1/currencies/convertiblePairs")).data.data;
		const listOfPairs = Object.keys(pairs).map(key =>
			({ base_symbol: parseBaseSymbol(key), quote_symbol: pairs[key] }));
		console.log(listOfPairs);
		const bancorMarketInPromises = _.map(listOfPairs, async p => {
			const market = (await axios.get(`https://api.bancor.network/0.1/currencies/${p.base_symbol}/ticker?fromCurrencyCode=${p.quote_symbol}`)).data;
			console.log(market);
		});
			/!*if (data) {

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
				}
			}
		);
		const bancorMarket = await Promise.all(bancorMarketInPromises);
		return bancorMarket;*!/
	} catch (error) {
		console.log(`Error while trying to fetch pairs from Bancor API: ${error}`);
	}*/
};

//const parseBaseSymbol = (key) => (key.includes("BNT") && key.length > 3) ? key.replace("BNT", "") : key;

