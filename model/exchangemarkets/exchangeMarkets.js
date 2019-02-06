const exchangeMarkets = {};

const getExchangeMarkets = () => exchangeMarkets;
const getExchangeMarket = (exchange) => {
	if (exchange) {
		return Object.keys(exchangeMarkets).includes(exchange.ID) ? exchangeMarkets[exchange.ID] : null;
	}
};
const updateExchangeMarket = (exchange, exchangeMarket) => {
	exchangeMarkets[exchange.ID] = exchangeMarket;
};

module.exports = { getExchangeMarket, updateExchangeMarket, getExchangeMarkets };