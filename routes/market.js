const getMarket = require("../model/getMarket");
const { getExchangeMarket } = require("../model/exchangemarkets/exchangeMarkets");
const exchanges = require("./exchanges");

module.exports = (app) => {
	app.get("/api/market/ddex", (req, res) => { res.send(getExchangeMarket(exchanges.DDEX).market); });
	app.get("/api/market/idex", (req, res) => { res.send(getExchangeMarket(exchanges.IDEX).market); });
	app.get("/api/market/kyber", (req, res) => { res.send(getExchangeMarket(exchanges.KYBER).market); });
	app.get("/api/market/oasis", (req, res) => { res.send(getExchangeMarket(exchanges.OASIS).market); });
	//app.get("/api/market/paradex", (req, res) => { res.send(getExchangeMarket(exchanges.PARADEX).market); });
	app.get("/api/market/tokenstore", (req, res) => { res.send(getExchangeMarket(exchanges.TOKENSTORE).market); });
	app.get("/api/market/etherdelta", (req, res) => { res.send(getExchangeMarket(exchanges.ETHERDELTA).market); });
	app.get("/api/market/uniswap", (req, res) => { res.send(getExchangeMarket(exchanges.UNISWAP).market); });

	app.get("/api/market", (req, res) => { res.send(getMarket()); });
};