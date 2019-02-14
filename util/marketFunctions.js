const _ = require("lodash");

const rebaseMarket = (market, rebaseSymbol) => {
	const rebaseRate = (baseSymbol, rate) => {
		if (baseSymbol === rebaseSymbol) {
			return rate;
		} else {
			// TODO: could use some deep rebasing here.
			const rebasePair = market[rebaseSymbol + "/" + baseSymbol];
			if(rebasePair) {
				return rate * volumeWeightedSpreadAverage(rebasePair);
			} else {
				return 0;
			}
		}
	};

	const volumeWeightedSpreadAverage = (pair) => {
		const combinedVolume = _.reduce(pair.m, (result, emd) => result + emd.v, 0);
		const weightedSumOfCurrentBids = _.reduce(pair.m, (result, emd) => result + (emd.v * emd.b), 0);
		const weightedSumOfCurrentAsks = _.reduce(pair.m, (result, emd) => result + (emd.v * emd.a), 0);
		const volumeWeightedBidAverage = weightedSumOfCurrentBids / combinedVolume;
		const volumeWeightedAskAverage = weightedSumOfCurrentAsks / combinedVolume;
		return (volumeWeightedBidAverage + volumeWeightedAskAverage) / 2;
	};

	return _.reduce(Object.keys(market), (marketResult, pairKey) => {
		const pair = market[pairKey];
		marketResult[pairKey] = {
			base_symbol: pair.b,
			quote_symbol: pair.q,
			market_data: _.reduce(Object.keys(pair.m), (result, exchangeID) => {
				const emd = pair.m[exchangeID];
				result[exchangeID] = ({
					exchangeID: exchangeID,
					last_traded_dai: rebaseRate(pair.b, emd.l),
					current_bid_dai: rebaseRate(pair.b, emd.b),
					current_ask_dai: rebaseRate(pair.b, emd.a),
					volume_dai: rebaseRate(pair.b, emd.v),
				});
				return result;
			}, {}),
		};
		return marketResult;
	}, {});
};

module.exports = { rebaseMarket };

