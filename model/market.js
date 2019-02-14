const _ = require("lodash");

const { getExchanges } = require("./exchanges");
const { rebaseMarket } = require("../util/marketFunctions");

const marketFetchers = {
	DDEX: require("./marketFetchers/DdexFetcher"),
	ETHERDELTA: require("./marketFetchers/EtherdeltaFetcher"),
	IDEX: require("./marketFetchers/IdexFetcher"),
	KYBER: require("./marketFetchers/KyberFetcher"),
	RADAR: require("./marketFetchers/RadarFetcher"),
	TOKENSTORE: require("./marketFetchers/TokenstoreFetcher"),
	UNISWAP: require("./marketFetchers/UniswapFetcher"),
	PARADEX: require("./marketFetchers/ParadexFetcher"),
	OASIS: require("./marketFetchers/OasisFetcher"),
};

const fetchExchangeMarkets = () => _.reduce(Object.keys(getExchanges()), (result, exchangeKey) => {
		const market = marketFetchers[exchangeKey].getMarket();
		const exchange = getExchanges()[exchangeKey];
		result[exchangeKey] = { market, exchange };
		return result;
	}, {});

const getMarket = () => {
	let market = {};

	const exchangeMarkets = fetchExchangeMarkets();

	_.forEach(exchangeMarkets, em => {
		const { exchange } = em;
		_.forEach(em.market, emp => {
			const ID = emp.b + "/" + emp.q;
			if (!market[ID]) {
				market[ID] = {
					b: emp.b,
					q: emp.q,
					m: {
						[exchange.ID]: { ...emp.m, exchangeID: exchange.ID }
					},
				}
			} else {
				market[ID].m[exchange.ID] = { ...emp.m, exchangeID: exchange.ID };
			}
		});
	});

	const exchangesInMarket = _.reduce(Object.keys(exchangeMarkets), (result, exchangeID) => {
		if (exchangeMarkets[exchangeID].market) {
			result.push(getExchanges()[exchangeID])
		}
		return result;
	}, []);

	return {
		market: rebaseMarket(market, "DAI"), exchanges: exchangesInMarket, timestamp: Date.now(),
	};
};

const initializeFetchers = () => {
	_.forEach(Object.keys(marketFetchers), mfKey => {
		marketFetchers[mfKey].initialize();
	});
};

module.exports = { fetchExchangeMarkets, getMarket, initializeFetchers };