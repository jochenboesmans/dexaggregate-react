const _ = require("lodash");

const rebaseMarket = (market, rebaseSymbol) => {
	let rateMemo = {};
	let vwsaMemo = {};

	const rebaseRate = (baseSymbol, rate) => {
		if (baseSymbol === rebaseSymbol) {
			return rate;
		} else if (rateMemo[rebaseSymbol + "/" + baseSymbol + "=" + rate]) {
			return rateMemo[rebaseSymbol + "/" + baseSymbol + "=" + rate];
		} else {
			const rebasePair = market[rebaseSymbol + "/" + baseSymbol];
			if (rebasePair) {
				const rebasedRate = rate * volumeWeightedSpreadAverage(rebasePair);
				rateMemo[rebaseSymbol + "/" + baseSymbol + "=" + rate] = rebasedRate;
				return rebasedRate;
			} else {
				const possibleRebases = _.reduce(market, (result, l2p) => {
					if (l2p.b === rebaseSymbol) {
						const l1p = _.find(market, l1p => l1p.b === l2p.q && l1p.q === baseSymbol);
						if (l1p) {
							result.push({
								l1p: l1p,
								l2p: l2p,
							})
						}
					}
					return result;
				}, []);

				if (possibleRebases.length > 0) {
					const sums = _.reduce(possibleRebases, (result, pr) => {
						const p1vol = _.reduce(pr.l1p.m, (sum, emd) => sum + emd.v, 0);
						const p2vol = _.reduce(pr.l2p.m, (sum, emd) => sum + emd.v, 0);
						const volume2 = rebaseRate(pr.l2p.b, p2vol);
						const volume1 = rebaseRate(pr.l1p.b, p1vol);
						const rebasedRate = rebaseRate(pr.l1p.b, rate * volumeWeightedSpreadAverage(pr.l1p));
						result.volumeWeightedSum += (volume2 + volume1) * rebasedRate;
						result.combinedVolume += (volume2 + volume1);
						return result;
					}, { volumeWeightedSum: 0, combinedVolume: 0 });

					const volumeWeightedAverageRate = sums.volumeWeightedSum / sums.combinedVolume;
					rateMemo[rebaseSymbol + "/" + baseSymbol + "=" + rate] = volumeWeightedAverageRate;
					return volumeWeightedAverageRate;
				} else {
					// TODO: Maybe add reverse rebasing (requoting?)
					return 0;
				}
			}
		}
	};

	const volumeWeightedSpreadAverage = (pair) => {
		if (vwsaMemo[pair.b + "/" + pair.q]) return vwsaMemo[pair.b + "/" + pair.q];
		const combinedVolume = _.reduce(pair.m, (result, emd) => result + emd.v, 0);
		const weightedSumOfCurrentBids = _.reduce(pair.m, (result, emd) => result + (emd.v * emd.b), 0);
		const weightedSumOfCurrentAsks = _.reduce(pair.m, (result, emd) => result + (emd.v * emd.a), 0);
		const volumeWeightedBidAverage = weightedSumOfCurrentBids / combinedVolume;
		const volumeWeightedAskAverage = weightedSumOfCurrentAsks / combinedVolume;
		const result = (volumeWeightedBidAverage + volumeWeightedAskAverage) / 2;
		vwsaMemo[pair.b + "/" + pair.q] = result;
		return result;
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

