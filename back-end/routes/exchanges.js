const exchanges = require("../model/exchanges");

module.exports = (app) => {
	app.get('/api/exchanges/bancor', (req, res) => { res.send(exchanges.BANCOR) });
	app.get('/api/exchanges/ddex', (req, res) => { res.send(exchanges.DDEX) });
	app.get('/api/exchanges/idex', (req, res) => { res.send(exchanges.IDEX) });
	app.get('/api/exchanges/kyber', (req, res) => { res.send(exchanges.KYBER) });
	app.get('/api/exchanges/oasis', (req, res) => { res.send(exchanges.OASIS) });
	app.get('/api/exchanges/paradex', (req, res) => { res.send(exchanges.PARADEX) });

	app.get('/api/exchanges', (req, res) => { res.send(exchanges) });
};