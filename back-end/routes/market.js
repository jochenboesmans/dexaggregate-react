const exchanges = require("../model/exchanges");
const _ = require("lodash");

module.exports = (app) => {
	/**
	 * @returns A collection of token pairs currently being traded on various exchanges
	 *
	 * {
	 	base_symbol: string,
		quote_symbol: string,
		market_data: list of
			{
				exchange: exchanges.js Object
				last_traded: float,
				current_bid: float,
				current_ask: float,
				past_24h_high: float,
				past_24h_low: float,
				volume: float
			}
	 * }
	 */
	app.get("/api/market", async (req, res) => {
		let market = [];
		const exchangeMarketsInPromises = _.map(exchanges, exchange => exchange.getMarket || null);
		const exchangeMarkets = await Promise.all(exchangeMarketsInPromises);

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
		res.send(market);
	})
};