const getMarket = require("../model/getMarket");
const exchangeMarkets = require("../model/exchangemarkets/exchangeMarkets");

module.exports = (app) => {
	app.get("/api/market/bancor", (req, res) => { res.send(exchangeMarkets.BANCOR); });
	app.get("/api/market/ddex", (req, res) => { res.send(exchangeMarkets.DDEX); });
	app.get("/api/market/idex", (req, res) => { res.send(exchangeMarkets.IDEX); });
	app.get("/api/market/kyber", (req, res) => { res.send(exchangeMarkets.KYBER); });
	app.get("/api/market/oasis", (req, res) => { res.send(exchangeMarkets.OASIS); });
	app.get("/api/market/paradex", (req, res) => { res.send(exchangeMarkets.PARADEX); });
	app.get("/api/market/tokenstore", (req, res) => { res.send(exchangeMarkets.TOKENSTORE); });
	app.get("/api/market/etherdelta", (req, res) => { res.send(exchangeMarkets.ETHERDELTA); });
	app.get("/api/market/uniswap", (req, res) => { res.send(exchangeMarkets.UNISWAP); });

	app.get("/api/market", (req, res) => { res.send(getMarket()); });
};