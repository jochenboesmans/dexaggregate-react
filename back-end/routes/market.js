const market = require("../model/market");

module.exports = (app) => {
	app.get('/api/market/bancor', (req, res) => { res.send(market.exchangeMarkets.BANCOR) });
	app.get('/api/market/ddex', (req, res) => { res.send(market.exchangeMarkets.DDEX) });
	app.get('/api/market/idex', (req, res) => { res.send(market.exchangeMarkets.IDEX) });
	app.get('/api/market/kyber', (req, res) => { res.send(market.exchangeMarkets.KYBER) });
	app.get('/api/market/oasis', (req, res) => { res.send(market.exchangeMarkets.OASIS) });
	app.get('/api/market/paradex', (req, res) => { res.send(market.exchangeMarkets.PARADEX) });

	app.get("/api/market", async (req, res) => { res.send(market.globalMarket) });
};