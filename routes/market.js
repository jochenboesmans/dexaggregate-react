const { getMarket, fetchExchangeMarkets } = require("../model/market");
const { getExchanges } = require("../model/exchanges");

module.exports = (app) => {

	app.get("/api/market/:exchange", (req, res) => {
		const exchangeInModel = getExchanges()[(req.params.exchange).toUpperCase()];
		res.send(exchangeInModel ? fetchExchangeMarkets()[exchangeInModel.ID] : null);
	});

	app.get("/api/market", (req, res) => { res.send(getMarket()); });
};