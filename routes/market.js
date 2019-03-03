const { getMarket, getExchangeMarkets } = require("../market/market");
const { getExchanges } = require("../market/exchanges");

module.exports = (app) => {

	app.get("/api/market/:exchange", (req, res) => {
		const exchangeInModel = getExchanges()[(req.params.exchange).toUpperCase()];
		res.send(exchangeInModel ? getExchangeMarkets()[exchangeInModel.ID] : null);
	});

	app.get("/api/market", (req, res) => { res.send(getMarket()); });
};