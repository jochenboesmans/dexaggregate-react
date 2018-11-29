const getBancorMarket = require("./exchangemarkets/getBancorMarket");
const getDdexMarket = require("./exchangemarkets/getDdexMarket");
const getIdexMarket = require("./exchangemarkets/getIdexMarket");
const getKyberMarket = require("./exchangemarkets/getBancorMarket");
const getOasisMarket = require("./exchangemarkets/getOasisMarket");
const getParadexMarket = require("./exchangemarkets/getParadexMarket");

module.exports = {
	BANCOR: {
		name: "Bancor"
	},
	DDEX: {
		name: "Ddex"
	},
	IDEX: {
		name: "Idex"
	},
	KYBER: {
		name: "Kyber Network"
	},
	OASIS: {
		name: "Oasis Dex"
	},
	PARADEX: {
		name: "Paradex"
	}
};