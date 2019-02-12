const exchanges = require("../../exchanges");

const marketFetchers = {
	DDEX: require("./DdexFetcher").getDdexMarket,
	ETHERDELTA: require("./EtherdeltaFetcher").getEtherdeltaMarket,
	IDEX: require("./IdexFetcher").getIdexMarket,
	KYBER: require("./KyberFetcher").getKyberMarket,
	RADAR: require("./RadarFetcher").getRadarMarket,
	TOKENSTORE: require("./TokenstoreFetcher").getTokenstoreMarket,
	UNISWAP: require("./UniswapFetcher").getUniswapMarket,
	PARADEX: require("./ParadexFetcher").getParadexMarket,
	OASIS: require("./OasisFetcher").getOasisMarket,
};

module.exports = () => {
	return {
		DDEX: { market: (marketFetchers.DDEX)(), exchange: exchanges.DDEX },
		IDEX: { market: (marketFetchers.IDEX)(), exchange: exchanges.IDEX },
		KYBER: { market: (marketFetchers.KYBER)(), exchange: exchanges.KYBER },
		RADAR: { market: (marketFetchers.RADAR)(), exchange: exchanges.RADAR },
		TOKENSTORE: { market: (marketFetchers.TOKENSTORE)(), exchange: exchanges.TOKENSTORE },
		ETHERDELTA: { market: (marketFetchers.ETHERDELTA)(), exchange: exchanges.ETHERDELTA },
		UNISWAP: { market: (marketFetchers.UNISWAP)(), exchange: exchanges.UNISWAP },
		PARADEX: { market: (marketFetchers.PARADEX)(), exchange: exchanges.PARADEX },
		OASIS: { market: (marketFetchers.OASIS)(), exchange: exchanges.OASIS },
	};
};