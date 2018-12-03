const exchanges = require("../../exchanges");

module.exports = async () => {
	return {
		BANCOR: {market: (await require("./fetchBancorMarket")()), exchange: exchanges.BANCOR},
		DDEX: {market: (await require("./fetchDdexMarket")()), exchange: exchanges.DDEX},
		IDEX: {market: (await require("./fetchIdexMarket")()), exchange: exchanges.IDEX},
		KYBER: {market: (await require("./fetchKyberMarket")()), exchange: exchanges.KYBER},
		OASIS: {market: (await require("./fetchOasisMarket")()), exchange: exchanges.OASIS},
		PARADEX: {market: (await require("./fetchParadexMarket")()), exchange: exchanges.PARADEX}
	}
};