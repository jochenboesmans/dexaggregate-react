"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var axios = require("axios");

var isEqual = require("lodash/isEqual");

var _require = require("../exchanges"),
    getExchanges = _require.getExchanges;

var _require2 = require("../updateNotifier"),
    setMarketNeedsUpdate = _require2.setMarketNeedsUpdate;

var market;
var timestamp;

var getMarket = function getMarket() {
  return market;
};

var getTimestamp = function getTimestamp() {
  return timestamp;
};

var initialize =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2() {
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return tryUpdateMarket();

          case 2:
            setInterval(
            /*#__PURE__*/
            (0, _asyncToGenerator2.default)(
            /*#__PURE__*/
            _regenerator.default.mark(function _callee() {
              return _regenerator.default.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return tryUpdateMarket();

                    case 2:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            })), 5 * 1000);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function initialize() {
    return _ref.apply(this, arguments);
  };
}();

var tryUpdateMarket =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3() {
    var receivedMarket;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return axios.get("https://api.radarrelay.com/v2/markets?include=base,ticker,stats,history");

          case 3:
            receivedMarket = _context3.sent.data;
            updateMarket(receivedMarket);
            _context3.next = 10;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            console.log("Error while trying to fetch market from ".concat(getExchanges().RADAR.name, " API: ").concat(_context3.t0));

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));

  return function tryUpdateMarket() {
    return _ref3.apply(this, arguments);
  };
}();

var updateMarket = function updateMarket(receivedMarket) {
  var newMarket = [];
  Object.keys(receivedMarket).forEach(function (pKey) {
    var p = receivedMarket[pKey];

    if (p.active && p.displayName.split("/")[1] && p.displayName.split("/")[0] && parseFloat(p.ticker.price) && parseFloat(p.ticker.bestBid) && parseFloat(p.ticker.bestAsk) && parseFloat(p.stats.volume24Hour)) {
      newMarket.push({
        b: p.displayName.split("/")[1],
        q: p.displayName.split("/")[0],
        m: {
          l: parseFloat(p.ticker.price),
          b: parseFloat(p.ticker.bestBid),
          a: parseFloat(p.ticker.bestAsk),
          v: parseFloat(p.stats.volume24Hour)
        }
      });
    }
  });

  if (newMarket && !isEqual(newMarket, market)) {
    market = newMarket;
    timestamp = Date.now();
    setMarketNeedsUpdate(true);
  }
};

module.exports = {
  initialize: initialize,
  getMarket: getMarket,
  getTimestamp: getTimestamp
};