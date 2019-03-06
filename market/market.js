const orderBy = require("lodash/orderBy");
const reduce = require("lodash/reduce");

const { getExchanges } = require("./exchanges");
const { rebaseMarket } = require("../util-where_the_magic_happens/rebasing");
const { setModelNeedsBroadcast } = require("../websocketbroadcasts/updateNotifier");
const { getMarketNeedsUpdate, setMarketNeedsUpdate } = require("./updateNotifier");

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

let assembledMarket;
const getMarket = () => assembledMarket;

const getExchangeMarkets = () => {
	const maxAge = 30 * 60 * 1000;
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

const assembleMarket = () => {
	const exchangeMarkets = getExchangeMarkets();

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

	const lastUpdate = reduce(marketFetchers, (latest, mf, mfKey) => {
		return mf.getTimestamp() > latest.timestamp ? ({ exchangeID: mfKey, timestamp: mf.getTimestamp() }) : latest;
	}, { exchangeID: null, timestamp: 0 });
	console.log(lastUpdate);

	const rebasedMarket = rebaseMarket(market, "DAI");
	const orderedMarket = orderBy(rebasedMarket,
		[p => reduce(p.m, (sum, emd) => sum + emd.v, 0)], ["desc"]);

	assembledMarket = {
		market: orderedMarket,
		exchanges: exchangesInMarket,
		lastUpdate: lastUpdate,
	};
	setMarketNeedsUpdate(false);
	setModelNeedsBroadcast(true);
};

const initialize = () => {
	initializeFetchers();
	setInterval(() => { if (getMarketNeedsUpdate()) assembleMarket() }, 2 * 1000);
};
const initializeFetchers = () => Object.keys(marketFetchers).forEach(mfKey => marketFetchers[mfKey].initialize());

module.exports = {
	getExchangeMarkets,
	getMarket,
	initialize,
	setMarketNeedsUpdate,
};