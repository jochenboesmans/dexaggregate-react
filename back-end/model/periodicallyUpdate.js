const _ = require("lodash");

const tryUpdateExchangeMarkets = require("./exchangemarkets/tryUpdateExchangeMarkets");

module.exports = () => {
	tryUpdateExchangeMarkets();
	const intervalInSeconds = 30;
	setInterval(async () => {
			await tryUpdateExchangeMarkets();
		}, intervalInSeconds * 1000);

};

/*const updateModel = async () => {
	const exchangeMarkets = await updateExchangeMarkets();
	//tryUpdateGlobalMarket(exchangeMarkets);
};

const updateExchangeMarkets = () => {
	const exchangeMarkets = fetchExchangeMarkets();
	_.for
};*/

/*
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
			if (receivedBancorMarket) {
				market.exchangeMarkets.BANCOR = receivedBancorMarket;
			}
			return receivedBancorMarket;
		case DDEX:
			const receivedDdexMarket = await getDdexMarket();
			if (receivedDdexMarket) {
				market.exchangeMarkets.DDEX = receivedDdexMarket;
			}
			return receivedDdexMarket;
		case IDEX:
			const receivedIdexMarket = await getIdexMarket();
			if (receivedIdexMarket) {
				market.exchangeMarkets.IDEX = receivedIdexMarket;
			}
			return receivedIdexMarket;
		case KYBER:
			const receivedKyberMarket = await getKyberMarket();
			if (receivedKyberMarket) {
				market.exchangeMarkets.KYBER = receivedKyberMarket;
			}
			return receivedKyberMarket;
		case OASIS:
			const receivedOasisMarket = await getOasisMarket();
			if (receivedOasisMarket) {
				market.exchangeMarkets.OASIS = receivedOasisMarket;
			}
			return receivedOasisMarket;
		case PARADEX:
			const receivedParadexMarket = await getParadexMarket();
			if (receivedParadexMarket) {
				market.exchangeMarkets.PARADEX = receivedParadexMarket;
			}
			return receivedParadexMarket;
		default:
			break;
	}
};

const tryUpdateGlobalMarket = (exchangeMarkets) => {
	let exchangeMarketsInList = [];
	_.forEach(exchangeMarkets, exchangeMarket => {
		if (!exchangeMarket) {
			throw new Error("Not all exchange markets were successfully fetched");
		} else {
			exchangeMarketsInList.push(exchangeMarket);
		}
	});

	try {
		let marketInTheMaking = [];

		_.forEach(exchangeMarketsInList, exchangeMarket => {
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
	} catch (error) {
		console.log(error.message);
	}
};*/
