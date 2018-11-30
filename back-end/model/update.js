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
const getKyberMarket = require("./exchangemarkets/getKyberMarket");
const getOasisMarket = require("./exchangemarkets/getOasisMarket");
const getParadexMarket = require("./exchangemarkets/getParadexMarket");

module.exports = () => {
	_.forEach(exchanges, exchange => {
		if (exchange !== BANCOR) {
			updateExchangeMarket(exchange)
		}
	});
};

const updateExchangeMarket = async (exchange) => {
	switch (exchange) {
		case BANCOR:
			BANCOR.market = await getBancorMarket();
			console.log(`updated bancor`);
			break;
		case DDEX:
			DDEX.market = await getDdexMarket();
			console.log(`updated ddex`);
			break;
		case IDEX:
			IDEX.market = await getIdexMarket();
			console.log(`updated idex`);
			break;
		case KYBER:
			KYBER.market = await getKyberMarket();
			console.log(`updated kyber`);
			break;
		case OASIS:
			OASIS.market = await getOasisMarket();
			console.log(`updated oasis`);
			break;
		case PARADEX:
			PARADEX.market = await getParadexMarket();
			console.log(`updated paradex`);
			break;
		default:
			break;
	}
};