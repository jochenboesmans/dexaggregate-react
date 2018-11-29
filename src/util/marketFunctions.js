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

//TODO: Add deep rebasing with some shortest path algo
export const rebaseRate = (market, baseSymbol, quoteSymbol, rebaseSymbol, rate) => {
	if (volumeWeightedLastTraded(market, rebaseSymbol, baseSymbol)) {
		return rate * volumeWeightedLastTraded(market, rebaseSymbol, baseSymbol);
	}
	return rate;

};

export const rebaseLastPrice = (market, baseSymbol, quoteSymbol, rebaseSymbol) => {
	return rebaseRate(market, baseSymbol, quoteSymbol, rebaseSymbol, volumeWeightedLastTraded(market, baseSymbol, quoteSymbol));
};

export const rebaseHighestCurrentBid = (market, baseSymbol, quoteSymbol, rebaseSymbol) => {
	return rebaseRate(market, baseSymbol, quoteSymbol, rebaseSymbol, highestCurrentBid(market, baseSymbol, quoteSymbol));
};

export const rebaseLowestCurrentAsk = (market, baseSymbol, quoteSymbol, rebaseSymbol) => {
	return rebaseRate(market, baseSymbol, quoteSymbol, rebaseSymbol, lowestCurrentAsk(market, baseSymbol, quoteSymbol));
};

export const rebaseCombinedVolume = (market, baseSymbol, quoteSymbol, rebaseSymbol) => {
	return rebaseRate(market, baseSymbol, quoteSymbol, rebaseSymbol, combinedVolume(market, baseSymbol, quoteSymbol));
};

const findPair = (market, baseSymbol, quoteSymbol) => {
	return _.find(market, p => p.quote_symbol === quoteSymbol && p.base_symbol === baseSymbol);
};

