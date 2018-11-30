const exchanges = require("../model/exchanges");

// TODO: Restrict direct access to API calls; work with model from server.
module.exports = (app) => {
	app.get('/api/markets/bancor', (req, res) => { res.send(exchanges.BANCOR.market) });
	app.get('/api/markets/ddex', (req, res) => { res.send(exchanges.DDEX.market) });
	app.get('/api/markets/idex', (req, res) => { res.send(exchanges.IDEX.market) });
	app.get('/api/markets/kyber', (req, res) => { res.send(exchanges.KYBER.market) });
	app.get('/api/markets/oasis', (req, res) => { res.send(exchanges.OASIS.market) });
	app.get('/api/markets/paradex', (req, res) => { res.send(exchanges.PARADEX.market) });
};