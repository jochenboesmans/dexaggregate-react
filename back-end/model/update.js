const _ = require("lodash");

const exchanges = require("./exchanges");

const BANCOR = require("./exchanges").BANCOR;
const DDEX = require("./exchanges").DDEX;
const IDEX = require("./exchanges").IDEX;
const KYBER = require("./exchanges").KYBER;
const OASIS = require("./exchanges").OASIS;
const PARADEX = require("./exchanges").PARADEX;

const getBancorMarket = require("./exchangemarkets/getBancorMarket");
const getDdexMarket = require("./exchangemarkets/getDdexMarket");
const getIdexMarket = require("./exchangemarkets/getIdexMarket");
const getKyberMarket = require("./exchangemarkets/getBancorMarket");
const getOasisMarket = require("./exchangemarkets/getOasisMarket");
const getParadexMarket = require("./exchangemarkets/getParadexMarket");

module.exports = () => {
	_.forEach(exchanges, exchange => {
		if (exchange !== BANCOR && exchange !== PARADEX) {
			updateExchangeMarket(exchange)
		}
	});
};

const updateExchangeMarket = async (exchange) => {
	switch (exchange) {
		case BANCOR:
			BANCOR.market = await getBancorMarket();
			break;
		case DDEX:
			DDEX.market = await getDdexMarket();
			break;
		case IDEX:
			IDEX.market = await getIdexMarket();
			break;
		case KYBER:
			KYBER.market = await getKyberMarket();
			break;
		case OASIS:
			OASIS.market = await getOasisMarket();
			break;
		case PARADEX:
			PARADEX.market = await getParadexMarket();
			break;
		default:
			break;
	}
};