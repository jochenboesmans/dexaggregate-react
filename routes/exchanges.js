const { getMarket } = require("../model/market");

module.exports = (app) => {
	app.get("/api/exchanges", (req, res) => { res.send(getMarket().exchanges); });
};