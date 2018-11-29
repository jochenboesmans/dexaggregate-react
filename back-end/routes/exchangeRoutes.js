const getBancorMarket = require("../model/exchangemarkets/getBancorMarket");
const getDdexMarkets = require("../model/exchangemarkets/getDdexMarket");
const getIdexMarket = require("../model/exchangemarkets/getIdexMarket");
const getKyberMarket = require("../model/exchangemarkets/getKyberMarket");
const getOasisMarket = require("../model/exchangemarkets/getOasisMarket");
const getParadexMarket = require("../model/exchangemarkets/getParadexMarket");

// TODO: Restrict direct access to API calls; work with model from server.
module.exports = (app) => {
	app.get('/api/markets/bancor', async (req, res) => { res.send(await getBancorMarket()) });
	app.get('/api/markets/ddex', async (req, res) => { res.send(await getDdexMarkets()) });
	app.get('/api/markets/idex', async (req, res) => { res.send(await getIdexMarket()) });
	app.get('/api/markets/kyber', async (req, res) => { res.send(await getKyberMarket()) });
	app.get('/api/markets/oasis', async (req, res) => { res.send(await getOasisMarket()) });
	app.get('/api/markets/paradex', async (req, res) => { res.send(await getParadexMarket()) });
};