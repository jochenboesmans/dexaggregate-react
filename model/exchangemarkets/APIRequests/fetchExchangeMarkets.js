const exchanges = require("../../exchanges");

module.exports = async () => {
	return {
		BANCOR: { market: (await require("./fetchBancorMarket")()), exchange: exchanges.BANCOR },
		DDEX: { market: (await require("./fetchDdexMarket")()), exchange: exchanges.DDEX },
		IDEX: { market: (await require("./fetchIdexMarket")()), exchange: exchanges.IDEX },
		KYBER: { market: (await require("./fetchKyberMarket")()), exchange: exchanges.KYBER },
		OASIS: { market: (await require("./fetchOasisMarket")()), exchange: exchanges.OASIS },
		PARADEX: { market: (await require("./fetchParadexMarket")()), exchange: exchanges.PARADEX },
		RADAR: { market: (await require("./fetchRadarMarket")()), exchange: exchanges.RADAR },
		TOKENSTORE: { market: (await require("./fetchTokenstoreMarket")()), exchange: exchanges.TOKENSTORE },
		ETHERDELTA: { market: (await require("./fetchEtherdeltaMarket")()), exchange: exchanges.ETHERDELTA },
		UNISWAP: { market: (await require("./fetchUniswapMarket")()), exchange: exchanges.UNISWAP },
	};
};