const getMarket = require("../model/getMarket");

module.exports = (app) => {
	app.get('/api/market/bancor', (req, res) => { res.send(getMarket().market.BANCOR) });
	app.get('/api/market/ddex', (req, res) => { res.send(getMarket().market.DDEX) });
	app.get('/api/market/idex', (req, res) => { res.send(getMarket().market.IDEX) });
	app.get('/api/market/kyber', (req, res) => { res.send(getMarket().market.KYBER) });
	app.get('/api/market/oasis', (req, res) => { res.send(getMarket().market.OASIS) });
	app.get('/api/market/paradex', (req, res) => { res.send(getMarket().market.PARADEX) });

	app.get("/api/market", (req, res) => { res.send(getMarket()) });
};