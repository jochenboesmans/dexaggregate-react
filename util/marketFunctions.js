const _ = require("lodash");

const rebaseMarket = (market, marketRebaseSymbol) => {

	let simpleRateMemo = {};
	const simpleRebaseRate = (rebaseSymbol, baseSymbol, rate) => {
		if (baseSymbol === rebaseSymbol) {
			return rate;
		} else if (simpleRateMemo[rebaseSymbol + "/" + baseSymbol + ":" + rate]) {
			return simpleRateMemo[rebaseSymbol + "/" + baseSymbol + ":" + rate];
		} else {
			const rebasePair = market[rebaseSymbol + "/" + baseSymbol];
			if (rebasePair) {
				const rebasedRate = rate * volumeWeightedSpreadAverage(rebaseSymbol, baseSymbol);
				simpleRateMemo[rebaseSymbol + "/" + baseSymbol + ":" + rate] = rebasedRate;
				return rebasedRate;
			} else {
				return 0;
			}
		}
	};

	let rateMemo = {};
	const rebaseRate = (rebaseSymbol, baseSymbol, quoteSymbol, rate) => {
		if (baseSymbol === rebaseSymbol) {
			return rate;
		} else if (rateMemo[rebaseSymbol + "/" + baseSymbol + ":" + rate]) {
			return rateMemo[rebaseSymbol + "/" + baseSymbol + ":" + rate];
		} else {
			// TODO: rename p1
			const originalPair = market[baseSymbol + "/" + quoteSymbol];
			const immediateRebasePair = market[rebaseSymbol + "/" + baseSymbol];

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

			let sums = { volumeWeightedSum: 0, combinedVolume: 0 };
			possibleRebases.forEach(pr => {
				const p1vol = _.reduce(originalPair.m, (sum, emd) => sum + emd.v, 0);
				const rebasedp1vol = simpleRebaseRate(pr.l1p.b, baseSymbol, p1vol);
				const p2vol = _.reduce(pr.l1p.m, (sum, emd) => sum + emd.v, 0);
				const rebasedp2vol = simpleRebaseRate(pr.l2p.b, pr.l1p.b, p2vol);
				const p3vol = _.reduce(pr.l2p.m, (sum, emd) => sum + emd.v, 0);
				// this doesn't really need to be rebased as it's based in the rebaseSymbol
				const rebasedp3vol = simpleRebaseRate(rebaseSymbol, pr.l2p.b, p3vol);

				const rebasedPathVolume = rebasedp1vol + rebasedp2vol + rebasedp3vol;

				const p0RebasedRate = simpleRebaseRate(pr.l1p.b, baseSymbol, rate);
				const rebasedRate = simpleRebaseRate(pr.l2p.b, pr.l1p.b, p0RebasedRate);
				
				sums.volumeWeightedSum += rebasedPathVolume * rebasedRate;
				sums.combinedVolume += rebasedPathVolume;
			});

			if (immediateRebasePair) {
				const p1vol = _.reduce(originalPair.m, (sum, emd) => sum + emd.v, 0);
				const rebasedp1vol = simpleRebaseRate(immediateRebasePair.b, originalPair.b, p1vol);
				const p2vol = _.reduce(immediateRebasePair.m, (sum, emd) => sum + emd.v, 0);
				// this doesn't really need to be rebased as it's based in the rebaseSymbol
				const rebasedp2vol = simpleRebaseRate(rebaseSymbol, immediateRebasePair.b, p2vol);

				const rebasedPathVolume = rebasedp1vol + rebasedp2vol;

				const rebasedRate = simpleRebaseRate(immediateRebasePair.b, originalPair.b, rate);

				sums.volumeWeightedSum += rebasedPathVolume * rebasedRate;
				sums.combinedVolume += rebasedPathVolume;
			}

			const volumeWeightedAverageRate = sums.volumeWeightedSum / sums.combinedVolume;
			rateMemo[rebaseSymbol + "/" + baseSymbol + ":" + rate] = volumeWeightedAverageRate;
			return volumeWeightedAverageRate;
		}
	};

	let vwsaMemo = {};
	const volumeWeightedSpreadAverage = (baseSymbol, quoteSymbol) => {
		if (vwsaMemo[baseSymbol + "/" + quoteSymbol]) return vwsaMemo[baseSymbol + "/" + quoteSymbol];
		const pair = market[baseSymbol + "/" + quoteSymbol];
		const combinedVolume = _.reduce(pair.m, (result, emd) => result + emd.v, 0);
		const weightedSumOfCurrentBids = _.reduce(pair.m, (result, emd) => result + (emd.v * emd.b), 0);
		const weightedSumOfCurrentAsks = _.reduce(pair.m, (result, emd) => result + (emd.v * emd.a), 0);
		const volumeWeightedBidAverage = weightedSumOfCurrentBids / combinedVolume;
		const volumeWeightedAskAverage = weightedSumOfCurrentAsks / combinedVolume;
		const vwsa = (volumeWeightedBidAverage + volumeWeightedAskAverage) / 2;
		vwsaMemo[baseSymbol + "/" + quoteSymbol] = vwsa;
		return vwsa;
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
					last_traded_dai: rebaseRate(marketRebaseSymbol, pair.b, pair.q, emd.l),
					current_bid_dai: rebaseRate(marketRebaseSymbol, pair.b, pair.q, emd.b),
					current_ask_dai: rebaseRate(marketRebaseSymbol, pair.b, pair.q, emd.a),
					volume_dai: rebaseRate(marketRebaseSymbol, pair.b, pair.q, emd.v),
				});
				return result;
			}, {}),
		};
		return marketResult;
	}, {});
};

module.exports = { rebaseMarket };

