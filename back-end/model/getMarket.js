const _ = require("lodash");

const exchangeMarkets = require("./exchangemarkets/exchangeMarkets");

module.exports = () => {
	let marketInTheMaking = [];

	_.forEach(exchangeMarkets, exchangeMarket => {
		_.forEach(exchangeMarket.market, exchangeMarketPair => {

			const matchingPair = _.find(marketInTheMaking, p => (p.quote_symbol === exchangeMarketPair.quote_symbol &&
				p.base_symbol === exchangeMarketPair.base_symbol));
			if (matchingPair) {
				matchingPair.market_data.push(exchangeMarketPair.market_data);
			} else {
				marketInTheMaking.push({
					base_symbol: exchangeMarketPair.base_symbol,
					quote_symbol: exchangeMarketPair.quote_symbol,
					market_data: [exchangeMarketPair.market_data]
				});
			}
		})
	});
	return marketInTheMaking;
};