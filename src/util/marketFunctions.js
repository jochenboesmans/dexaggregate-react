import _ from "lodash";

export const highestCurrentBid = (market, baseSymbol, quoteSymbol) => {
	const pair = findPair(market, baseSymbol, quoteSymbol);
	return pair ? _.maxBy(pair.market_data, exchange => exchange.current_bid).current_bid : 0;
};

export const lowestCurrentAsk = (market, baseSymbol, quoteSymbol) => {
	const pair = findPair(market, baseSymbol, quoteSymbol);
	return pair ? _.minBy(pair.market_data, exchange => exchange.current_ask).current_ask : 0;
};

export const combinedVolume = (market, baseSymbol, quoteSymbol) => {
	const pair = findPair(market, baseSymbol, quoteSymbol);
	return pair ?  _.sumBy(pair.market_data, exchange => exchange.volume) : 0;
};

export const volumeWeightedLastTraded = (market, baseSymbol, quoteSymbol) => {
	const pair = findPair(market, baseSymbol, quoteSymbol);
	if (pair && combinedVolume(market, baseSymbol, quoteSymbol)) {
		const weightedSumOfLastTradedValues = _.sumBy(pair.market_data, exchange => exchange.volume * exchange.last_traded);
		return weightedSumOfLastTradedValues / combinedVolume(market, baseSymbol, quoteSymbol);
	} else {
		return 0;
	}

};

export const requoteRate = (market, quoteSymbol, requoteSymbol, rate) => {
	const pairTwo = findPair(market, quoteSymbol, requoteSymbol);
	const testPair = findPair(market, "ETH", "DAI");

	const volWeight = volumeWeightedLastTraded(market, testPair.base_symbol, testPair.quote_symbol);
	console.log(volWeight);
	const newRate = 1/volWeight;
	return rate * newRate;
};

const findPair = (market, baseSymbol, quoteSymbol) => {
	return _.find(market, p => p.quote_symbol === quoteSymbol && p.base_symbol === baseSymbol);
};

