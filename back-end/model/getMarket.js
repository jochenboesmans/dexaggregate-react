const _ = require("lodash");

const exchanges = require("./exchanges");

/**
 * @returns A collection of token pairs currently being traded on various exchanges
 *
 * {
	 	base_symbol: string,
		quote_symbol: string,
		market_data: list of
			{
				exchange: model/exchanges.js Object
				last_traded: float,
				current_bid: float,
				current_ask: float,
				past_24h_high: float,
				past_24h_low: float,
				volume: float
			}
 * }
 */
module.exports = async () => joinExchangeMarkets(gatherExchangeMarkets());

/**
 * @returns A collection of market data from every exchange
 */
const gatherExchangeMarkets = () => _.map(exchanges, exchange => {
	console.log(exchange.market);
	return exchange.market;
});

/**
 * @returns A collection of token pairs with market data from every exchange
 */
const joinExchangeMarkets= (exchangeMarkets) => {
	let market = [];

	_.forEach(exchangeMarkets, exchangeMarket => {
		_.forEach(exchangeMarket, exchangeMarketPair => {

			const matchingPair = _.find(market, p => (p.quote_symbol === exchangeMarketPair.quote_symbol &&
				p.base_symbol === exchangeMarketPair.base_symbol));
			if (matchingPair) {
				matchingPair.market_data.push(exchangeMarketPair.market_data);
			} else {
				let newPair = {
					base_symbol: exchangeMarketPair.base_symbol,
					quote_symbol: exchangeMarketPair.quote_symbol,
					market_data: [exchangeMarketPair.market_data]
				};
				market.push(newPair);
			}
		})
	});
	return market;
};