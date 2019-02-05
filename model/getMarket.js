const _ = require("lodash");

const exchangeMarkets = require("./exchangemarkets/exchangeMarkets");
const exchanges = require("./exchanges");

module.exports = () => {
	let marketInTheMaking = [];
	let timestamp;

	_.forEach(exchangeMarkets, exchangeMarket => {
		// find newest timestamp among exchangeMarkets
		if(!timestamp || exchangeMarket.timestamp >= timestamp) {
			timestamp = exchangeMarket.timestamp;
		}
		_.forEach(exchangeMarket.market, exchangeMarketPair => {

			const matchingPair = _.find(marketInTheMaking,
			                            p => (p.quote_symbol === exchangeMarketPair.quote_symbol && p.base_symbol === exchangeMarketPair.base_symbol));
			if(matchingPair) {
				const exchange = exchangeMarketPair.market_data.exchange;
				if (! _.find(matchingPair.market_data, emd => emd.exchange === exchange)) {
					matchingPair.market_data.push(exchangeMarketPair.market_data);
				}
			} else {
				marketInTheMaking.push({
					                       base_symbol: exchangeMarketPair.base_symbol,
					                       quote_symbol: exchangeMarketPair.quote_symbol,
					                       market_data: [exchangeMarketPair.market_data]
				                       });
			}
		});
	});

	const exchangesInMarket = _.map(Object.keys(exchangeMarkets),
	                                exchangeID => _.find(exchanges, exchange => exchange.ID === exchangeID));

	return {
		market: marketInTheMaking, exchanges: exchangesInMarket, timestamp: timestamp,
	};
};