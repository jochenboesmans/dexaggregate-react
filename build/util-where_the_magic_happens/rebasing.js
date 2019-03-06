"use strict";

var reduce = require("lodash/reduce");

var rebaseMarket = function rebaseMarket(market, marketRebaseSymbol) {
  /* One level rebase. */
  var simpleRateMemo = {};

  var simpleRebaseRate = function simpleRebaseRate(rebaseSymbol, baseSymbol, rate) {
    if (baseSymbol === rebaseSymbol) {
      return rate;
    } else if (simpleRateMemo[rebaseSymbol + "/" + baseSymbol + ":" + rate]) {
      return simpleRateMemo[rebaseSymbol + "/" + baseSymbol + ":" + rate];
    } else {
      var rebasePair = market[rebaseSymbol + "/" + baseSymbol];
      var rebasedRate = rebasePair ? rate * volumeWeightedSpreadAverage(rebaseSymbol, baseSymbol) : 0;
      simpleRateMemo[rebaseSymbol + "/" + baseSymbol + ":" + rate] = rebasedRate;
      return rebasedRate;
    }
  };
  /* Calculate sum of volume across different exchanges. */


  var emdVolumeMemo = {};

  var getEMDVolume = function getEMDVolume(pair) {
    if (emdVolumeMemo[pair.b + "/" + pair.q]) return emdVolumeMemo[pair.b + "/" + pair.q];
    var emdVolume = reduce(pair.m, function (sum, emd) {
      return sum + emd.v;
    }, 0);
    emdVolumeMemo[pair.b + "/" + pair.q] = emdVolume;
    return emdVolume;
  };
  /* Deep rebase. */


  var rateMemo = {};

  var rebaseRate = function rebaseRate(rebaseSymbol, baseSymbol, quoteSymbol, rate) {
    if (baseSymbol === rebaseSymbol) {
      return rate;
    } else if (rateMemo[rebaseSymbol + "/" + baseSymbol + ":" + rate]) {
      return rateMemo[rebaseSymbol + "/" + baseSymbol + ":" + rate];
    } else {
      var originalPair = market[baseSymbol + "/" + quoteSymbol];
      var immediateRebasePair = market[rebaseSymbol + "/" + baseSymbol];
      /* Find level 2 rebases consisting of 2 pairs that form a path from baseSymbol to rebaseSymbol. */

      var possibleL2Rebases = [];
      Object.keys(market).forEach(function (p2Key) {
        var p2 = market[p2Key];

        if (p2.b === rebaseSymbol) {
          var matchingP1 = null;
          Object.keys(market).forEach(function (p1Key) {
            var p1 = market[p1Key];
            if (baseSymbol === p1.q && p1.b === p2.q) matchingP1 = p1;
          });
          if (matchingP1) possibleL2Rebases.push({
            p1: matchingP1,
            p2: p2
          });
        }
      });
      /* Calculate a volume-weighted average rate based on all possible rebases. */

      var sums = {
        volumeWeightedSum: 0,
        combinedVolume: 0
      };
      possibleL2Rebases.forEach(function (pr) {
        var phase1Volume = getEMDVolume(originalPair);
        var rebasedPhase1Volume = simpleRebaseRate(pr.p1.b, baseSymbol, phase1Volume);
        var phase2Volume = getEMDVolume(pr.p1);
        var rebasedPhase2Volume = simpleRebaseRate(pr.p2.b, pr.p1.b, phase2Volume);
        var phase3Volume = getEMDVolume(pr.p2); // this doesn't really need to be rebased as it's based in the rebaseSymbol

        var rebasedPhase3Volume = simpleRebaseRate(rebaseSymbol, pr.p2.b, phase3Volume);
        var rebasedPathVolume = rebasedPhase1Volume + rebasedPhase2Volume + rebasedPhase3Volume;
        var rebasedPhase1Rate = simpleRebaseRate(pr.p1.b, baseSymbol, rate);
        var rebasedPhase2Rate = simpleRebaseRate(pr.p2.b, pr.p1.b, rebasedPhase1Rate);
        sums.volumeWeightedSum += rebasedPathVolume * rebasedPhase2Rate;
        sums.combinedVolume += rebasedPathVolume;
      });

      if (immediateRebasePair) {
        var phase1Volume = getEMDVolume(originalPair);
        var rebasedPhase1Volume = simpleRebaseRate(immediateRebasePair.b, originalPair.b, phase1Volume);
        var phase2Volume = getEMDVolume(immediateRebasePair); // this doesn't really need to be rebased as it's based in the rebaseSymbol

        var rebasedPhase2Volume = simpleRebaseRate(rebaseSymbol, immediateRebasePair.b, phase2Volume);
        var rebasedPathVolume = rebasedPhase1Volume + rebasedPhase2Volume;
        var rebasedRate = simpleRebaseRate(immediateRebasePair.b, originalPair.b, rate);
        sums.volumeWeightedSum += rebasedPathVolume * rebasedRate;
        sums.combinedVolume += rebasedPathVolume;
      }

      var volumeWeightedAverageRate = sums.volumeWeightedSum / sums.combinedVolume;
      rateMemo[rebaseSymbol + "/" + baseSymbol + ":" + rate] = volumeWeightedAverageRate;
      return volumeWeightedAverageRate;
    }
  };
  /* Calculate the average of a volume-weighted spread of a pair. */


  var vwsaMemo = {};

  var volumeWeightedSpreadAverage = function volumeWeightedSpreadAverage(baseSymbol, quoteSymbol) {
    if (vwsaMemo[baseSymbol + "/" + quoteSymbol]) return vwsaMemo[baseSymbol + "/" + quoteSymbol];
    var pair = market[baseSymbol + "/" + quoteSymbol];
    var combinedVolume = getEMDVolume(pair);
    var weightedSumOfCurrentBids = reduce(pair.m, function (result, emd) {
      return result + emd.v * emd.b;
    }, 0);
    var weightedSumOfCurrentAsks = reduce(pair.m, function (result, emd) {
      return result + emd.v * emd.a;
    }, 0);
    var volumeWeightedBidAverage = weightedSumOfCurrentBids / combinedVolume;
    var volumeWeightedAskAverage = weightedSumOfCurrentAsks / combinedVolume;
    var vwsa = (volumeWeightedBidAverage + volumeWeightedAskAverage) / 2;
    vwsaMemo[baseSymbol + "/" + quoteSymbol] = vwsa;
    return vwsa;
  };
  /* Deeply rebase all market data of a pair. */


  var rebaseMarketData = function rebaseMarketData(p) {
    var result = {};
    Object.keys(p.m).forEach(function (exchangeID) {
      var emd = p.m[exchangeID];
      var rl = rebaseRate(marketRebaseSymbol, p.b, p.q, emd.l);
      var rb = rebaseRate(marketRebaseSymbol, p.b, p.q, emd.b);
      var ra = rebaseRate(marketRebaseSymbol, p.b, p.q, emd.a);
      var rv = rebaseRate(marketRebaseSymbol, p.b, p.q, emd.v);

      if (rl && rb && ra && rv) {
        result[exchangeID] = {
          e: exchangeID,
          l: rl,
          b: rb,
          a: ra,
          v: rv
        };
      }
    });
    return result;
  };
  /* Deeply rebase the whole market. */


  var rebasedMarket = {};
  Object.keys(market).forEach(function (pKey) {
    var p = market[pKey];
    var rmd = rebaseMarketData(p);

    if (Object.keys(rmd).length > 0) {
      rebasedMarket[pKey] = {
        b: p.b,
        q: p.q,
        m: rmd
      };
    }
  });
  return rebasedMarket;
};

module.exports = {
  rebaseMarket: rebaseMarket
};