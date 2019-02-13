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
	let market = [];

	const exchangeMarkets = fetchExchangeMarkets();

	_.forEach(exchangeMarkets, em => {
		_.forEach(em.market, emp => {
			const { exchange } = emp.market_data;
			const pairAlreadyInMarket = _.find(market, mp =>
				(mp.quote_symbol === emp.quote_symbol && mp.base_symbol === emp.base_symbol));

			if(pairAlreadyInMarket && !_.find(pairAlreadyInMarket.market_data, emd => emd.exchange === exchange)) {
				pairAlreadyInMarket.market_data.push(emp.market_data);
			} else {
				market.push({
					base_symbol: emp.base_symbol,
					quote_symbol: emp.quote_symbol,
					market_data: [emp.market_data],
				});
			}
		});
	});

	const rebasedMarket = rebaseMarket(market);

	const exchangesInMarket = _.map(Object.keys(exchangeMarkets), emKey => getExchanges()[emKey]);

	return {
		market: rebasedMarket, exchanges: exchangesInMarket, timestamp: Date.now(),
	};
};

const initializeFetchers = async () => {
	const Web3 = require("web3");
	const projectID = `3623107a49ce48a9b3687ec820e8a222`;
	const web3 = new Web3(`wss://mainnet.infura.io/ws/v3/${projectID}`);

	_.forEach(Object.keys(marketFetchers), mfKey => {
		marketFetchers[mfKey].initialize(web3);
	});
};

module.exports = { fetchExchangeMarkets, getMarket, initializeFetchers };