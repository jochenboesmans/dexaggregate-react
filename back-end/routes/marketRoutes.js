const getMarket = require("../model/getMarket");

module.exports = (app) => {
	/**
	 * @returns A collection of token pairs currently being traded on various exchanges
	 *
	 * {
	 	base_symbol: string,
		quote_symbol: string,
		market_data: list of
			{
				exchange: exchangeRoutes.js Object
				last_traded: float,
				current_bid: float,
				current_ask: float,
				past_24h_high: float,
				past_24h_low: float,
				volume: float
			}
	 * }
	 */
	app.get("/api/market", async (req, res) => { res.send(await getMarket()) });
};