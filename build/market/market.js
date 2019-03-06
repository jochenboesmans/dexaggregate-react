"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var orderBy = require("lodash/orderBy");

var reduce = require("lodash/reduce");

var _require = require("./exchanges"),
    getExchanges = _require.getExchanges;

var _require2 = require("../util-where_the_magic_happens/rebasing"),
    rebaseMarket = _require2.rebaseMarket;

var _require3 = require("../websocketbroadcasts/updateNotifier"),
    setModelNeedsBroadcast = _require3.setModelNeedsBroadcast;

var _require4 = require("./updateNotifier"),
    getMarketNeedsUpdate = _require4.getMarketNeedsUpdate,
    setMarketNeedsUpdate = _require4.setMarketNeedsUpdate;

var marketFetchers = {
  DDEX: require("./marketFetchers/DdexFetcher"),

  /*ETHERDELTA: require("./marketFetchers/EtherdeltaFetcher"),*/
  IDEX: require("./marketFetchers/IdexFetcher"),
  KYBER: require("./marketFetchers/KyberFetcher"),
  RADAR: require("./marketFetchers/RadarFetcher"),
  TOKENSTORE: require("./marketFetchers/TokenstoreFetcher"),
  UNISWAP: require("./marketFetchers/UniswapFetcher"),
  PARADEX: require("./marketFetchers/ParadexFetcher"),
  OASIS: require("./marketFetchers/OasisFetcher")
};
var assembledMarket;

var getMarket = function getMarket() {
  return assembledMarket;
};

var getExchangeMarkets = function getExchangeMarkets() {
  var maxAge = 30 * 60 * 1000;
  var result = {};
  Object.keys(getExchanges()).forEach(function (exchangeKey) {
    var market = marketFetchers[exchangeKey].getMarket();
    var exchange = getExchanges()[exchangeKey];

    if (Date.now() - marketFetchers[exchangeKey].getTimestamp() < maxAge) {
      result[exchangeKey] = {
        market: market,
        exchange: exchange
      };
    }
  });
  return result;
};

var assembleMarket = function assembleMarket() {
  var exchangeMarkets = getExchangeMarkets();
  var market = {};
  Object.keys(exchangeMarkets).forEach(function (emKey) {
    var em = exchangeMarkets[emKey];
    var exchange = em.exchange;
    Object.keys(em.market).forEach(function (empKey) {
      var emp = em.market[empKey];
      var ID = emp.b + "/" + emp.q;

      if (!market[ID]) {
        market[ID] = {
          b: emp.b,
          q: emp.q,
          m: (0, _defineProperty2.default)({}, exchange.ID, (0, _objectSpread2.default)({}, emp.m, {
            exchangeID: exchange.ID
          }))
        };
      } else {
        market[ID].m[exchange.ID] = (0, _objectSpread2.default)({}, emp.m, {
          exchangeID: exchange.ID
        });
      }
    });
  });
  var exchangesInMarket = [];
  Object.keys(exchangeMarkets).forEach(function (exchangeID) {
    if (exchangeMarkets[exchangeID].market) exchangesInMarket.push(getExchanges()[exchangeID]);
  });
  var lastUpdate = reduce(marketFetchers, function (latest, mf, mfKey) {
    return mf.getTimestamp() > latest.timestamp ? {
      exchangeID: mfKey,
      timestamp: mf.getTimestamp()
    } : latest;
  }, {
    exchangeID: null,
    timestamp: 0
  });
  console.log(lastUpdate);
  var rebasedMarket = rebaseMarket(market, "DAI");
  var orderedMarket = orderBy(rebasedMarket, [function (p) {
    return reduce(p.m, function (sum, emd) {
      return sum + emd.v;
    }, 0);
  }], ["desc"]);
  assembledMarket = {
    market: orderedMarket,
    exchanges: exchangesInMarket,
    lastUpdate: lastUpdate
  };
  setMarketNeedsUpdate(false);
  setModelNeedsBroadcast(true);
};

var initialize = function initialize() {
  initializeFetchers();
  setInterval(function () {
    if (getMarketNeedsUpdate()) assembleMarket();
  }, 2 * 1000);
};

var initializeFetchers = function initializeFetchers() {
  return Object.keys(marketFetchers).forEach(function (mfKey) {
    return marketFetchers[mfKey].initialize();
  });
};

module.exports = {
  getExchangeMarkets: getExchangeMarkets,
  getMarket: getMarket,
  initialize: initialize,
  setMarketNeedsUpdate: setMarketNeedsUpdate
};