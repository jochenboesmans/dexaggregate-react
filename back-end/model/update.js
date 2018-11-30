const _ = require("lodash");

const market = require("./market");

const BANCOR = market.exchanges.BANCOR;
const DDEX = market.exchanges.DDEX;
const IDEX = market.exchanges.IDEX;
const KYBER = market.exchanges.KYBER;
const OASIS = market.exchanges.OASIS;
const PARADEX = market.exchanges.PARADEX;

const getBancorMarket = require("./exchangemarkets/getBancorMarket");
const getDdexMarket = require("./exchangemarkets/getDdexMarket");
const getIdexMarket = require("./exchangemarkets/getIdexMarket");
const getKyberMarket = require("./exchangemarkets/getKyberMarket");
const getOasisMarket = require("./exchangemarkets/getOasisMarket");
const getParadexMarket = require("./exchangemarkets/getParadexMarket");

module.exports = async () => {
	console.log("update");
	const exchangeMarkets = await updateExchangeMarkets();
	updateGlobalMarket(exchangeMarkets);
};

const updateExchangeMarkets = async () => {
	const exchangeMarketsInPromises = _.map(market.exchanges, async exchange => {
		return (await updateExchangeMarket(exchange));
	});
	return (await Promise.all(exchangeMarketsInPromises));
};

const updateExchangeMarket = async (exchange) => {
	switch (exchange) {
		case BANCOR:
			const receivedBancorMarket = await getBancorMarket();
			market.exchangeMarkets.BANCOR = receivedBancorMarket;
			return receivedBancorMarket;
		case DDEX:
			const receivedDdexMarket = await getDdexMarket();
			market.exchangeMarkets.DDEX = receivedDdexMarket;
			return receivedDdexMarket;
		case IDEX:
			const receivedIdexMarket = await getIdexMarket();
			market.exchangeMarkets.IDEX = receivedIdexMarket;
			return receivedIdexMarket;
		case KYBER:
			const receivedKyberMarket = await getKyberMarket();
			market.exchangeMarkets.KYBER = receivedKyberMarket;
			return receivedKyberMarket;
		case OASIS:
			const receivedOasisMarket = await getOasisMarket();
			market.exchangeMarkets.OASIS = receivedOasisMarket;
			return receivedOasisMarket;
		case PARADEX:
			const receivedParadexMarket = await getParadexMarket();
			market.exchangeMarkets.PARADEX = receivedParadexMarket;
			return receivedParadexMarket;
		default:
			break;
	}
};

const updateGlobalMarket = (exchangeMarkets) => joinExchangeMarkets(gatherExchangeMarkets(exchangeMarkets));

/**
 * @returns A collection of market data from every exchange
 */
const gatherExchangeMarkets = (exchangeMarkets) => {
	const exchangeMarketsInList = _.map(exchangeMarkets, exchangeMarket => {
		return exchangeMarket;
	});
	return _.filter(exchangeMarketsInList, em => em);
};

/**
 * @returns Array array of token pairs with market data from every exchange
 */
const joinExchangeMarkets = (exchangeMarkets) => {
	let marketInTheMaking = [];

	_.forEach(exchangeMarkets, exchangeMarket => {
		_.forEach(exchangeMarket, exchangeMarketPair => {

			const matchingPair = _.find(marketInTheMaking, p => (p.quote_symbol === exchangeMarketPair.quote_symbol &&
				p.base_symbol === exchangeMarketPair.base_symbol));
			if (matchingPair) {
				matchingPair.market_data.push(exchangeMarketPair.market_data);
			} else {
				let newPair = {
					base_symbol: exchangeMarketPair.base_symbol,
					quote_symbol: exchangeMarketPair.quote_symbol,
					market_data: [exchangeMarketPair.market_data]
				};
				marketInTheMaking.push(newPair);
			}
		})
	});
	market.globalMarket = marketInTheMaking;
};