const _ = require("lodash");

const { getExchanges } = require("./exchanges");
const { rebaseMarket } = require("../util (where the magic happens)/rebasing");

const marketFetchers = {
	DDEX: require("./marketFetchers/DdexFetcher"),
	/*ETHERDELTA: require("./marketFetchers/EtherdeltaFetcher"),*/
	IDEX: require("./marketFetchers/IdexFetcher"),
	KYBER: require("./marketFetchers/KyberFetcher"),
	RADAR: require("./marketFetchers/RadarFetcher"),
	TOKENSTORE: require("./marketFetchers/TokenstoreFetcher"),
	UNISWAP: require("./marketFetchers/UniswapFetcher"),
	PARADEX: require("./marketFetchers/ParadexFetcher"),
	OASIS: require("./marketFetchers/OasisFetcher"),
};

const fetchExchangeMarkets = () => {
	const maxAge = 60 * 60 * 1000;
	const result = {};
	Object.keys(getExchanges()).forEach(exchangeKey => {
		const market = marketFetchers[exchangeKey].getMarket();
		const exchange = getExchanges()[exchangeKey];
		if (Date.now() - marketFetchers[exchangeKey].getTimestamp() < maxAge) {
			result[exchangeKey] = {
				market,
				exchange,
			}
		}
	});
	return result;
};

const getMarket = () => {
	const exchangeMarkets = fetchExchangeMarkets();

	const market = {};
	Object.keys(exchangeMarkets).forEach(emKey => {
		const em = exchangeMarkets[emKey];
		const { exchange } = em;
		Object.keys(em.market).forEach(empKey => {
			const emp = em.market[empKey];
			const ID = emp.b + "/" + emp.q;
			if(!market[ID]) {
				market[ID] = {
					b: emp.b,
					q: emp.q,
					m: {
						[exchange.ID]: {
							...emp.m,
							exchangeID: exchange.ID
						}
					},
				};
			} else {
				market[ID].m[exchange.ID] = {
					...emp.m,
					exchangeID: exchange.ID
				};
			}
		})
	});

	const exchangesInMarket = [];
	Object.keys(exchangeMarkets).forEach(exchangeID => {
		if (exchangeMarkets[exchangeID].market) exchangesInMarket.push(getExchanges()[exchangeID])
	});

	const lastUpdate = _.reduce(marketFetchers, (latest, mf, mfKey) => {
		return mf.getTimestamp() > latest.timestamp ? ({ exchangeID: mfKey, timestamp: mf.getTimestamp() }) : latest;
	}, { exchangeID: null, timestamp: 0 });
	console.log(lastUpdate);

	return {
		market: rebaseMarket(market, "DAI"),
		exchanges: exchangesInMarket,
		lastUpdate: lastUpdate,
	};
};

const initializeFetchers = () => Object.keys(marketFetchers).forEach(mfKey => marketFetchers[mfKey].initialize());

module.exports = {
	fetchExchangeMarkets,
	getMarket,
	initializeFetchers
};