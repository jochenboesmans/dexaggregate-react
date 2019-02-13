const _ = require("lodash");

const rebaseMarket = (market) => {
	 return _.map(market, pair => {
		const base = pair.base_symbol;
		const quote = pair.quote_symbol;
		const transformedMarketData = _.map(pair.market_data, emd => ({
			...emd,
			last_traded_dai: rebaseRate(market, base, quote, "DAI", emd.last_traded),
			current_bid_dai: rebaseRate(market, base, quote, "DAI", emd.current_bid),
			current_ask_dai: rebaseRate(market, base, quote, "DAI", emd.current_ask),
			volume_dai: rebaseRate(market, base, quote, "DAI", emd.volume),
		}));
		return {
			base_symbol: base,
			quote_symbol: quote,
			market_data: transformedMarketData,
		}
	});
};

const combinedVolume = (market, baseSymbol, quoteSymbol) => {
	const pair = findPair(market, baseSymbol, quoteSymbol);
	return pair ? _.sumBy(pair.market_data, exchange => exchange.volume) : 0;
};

const volumeWeightedLastTraded = (market, baseSymbol, quoteSymbol) => {
	const pair = findPair(market, baseSymbol, quoteSymbol);
	if(pair && combinedVolume(market, baseSymbol, quoteSymbol)) {
		const weightedSumOfLastTradedValues = _.sumBy(pair.market_data, exchange => exchange.volume * exchange.last_traded);
		return weightedSumOfLastTradedValues / combinedVolume(market, baseSymbol, quoteSymbol);
	} else {
		return 0;
	}

};

//TODO: Add deep rebasing with some shortest path algo
const rebaseRate = (market, baseSymbol, quoteSymbol, rebaseSymbol, rate) => {
	if(volumeWeightedLastTraded(market, rebaseSymbol, baseSymbol)) {
		return rate * volumeWeightedLastTraded(market, rebaseSymbol, baseSymbol);
	}
	return rate;

};

const findPair = (market, baseSymbol, quoteSymbol) => {
	return _.find(market, p => p.quote_symbol === quoteSymbol && p.base_symbol === baseSymbol);
};

module.exports = { rebaseMarket };

