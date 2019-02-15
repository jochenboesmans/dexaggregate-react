const _ = require("lodash");

const { getMarket, fetchExchangeMarkets } = require("../model/market");
const { getExchanges } = require("../model/exchanges");

module.exports = (app) => {

	app.get("/api/market/:exchange", (req, res) => {
		const exchangeInModel = getExchanges()[(req.params.exchange).toUpperCase()];
		res.send(exchangeInModel ? fetchExchangeMarkets()[exchangeInModel.ID] : null);
	});
	/*app.get("/api/market/ddex", (req, res) => { res.send(fetchExchangeMarkets().DDEX.market); });
	 app.get("/api/market/idex", (req, res) => { res.send(fetchExchangeMarkets().IDEX.market); });
	 app.get("/api/market/kyber", (req, res) => { res.send(fetchExchangeMarkets().KYBER.market); });
	 app.get("/api/market/oasis", (req, res) => { res.send(fetchExchangeMarkets().OASIS.market); });
	 app.get("/api/market/tokenstore", (req, res) => { res.send(fetchExchangeMarkets().TOKENSTORE.market); });
	 app.get("/api/market/etherdelta", (req, res) => { res.send(fetchExchangeMarkets().ETHERDELTA.market); });
	 app.get("/api/market/uniswap", (req, res) => { res.send(fetchExchangeMarkets().UNISWAP.market); });*/

	app.get("/api/market", (req, res) => { res.send(getMarket()); });
};