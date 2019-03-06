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
            return axios.get("https://api.kyber.network/market");

          case 3:
            receivedMarket = _context3.sent.data.data;
            if (receivedMarket) updateMarket(receivedMarket);
            _context3.next = 10;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            console.log("Error while trying to fetch market from ".concat(getExchanges().KYBER.name, " API: ").concat(_context3.t0));

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
  receivedMarket.forEach(function (pair) {
    if (pair.base_symbol && pair.quote_symbol && pair.last_traded && pair.current_bid && pair.current_ask && pair.eth_24h_volume) {
      newMarket.push({
        b: pair.base_symbol,
        q: pair.quote_symbol,
        m: {
          l: pair.last_traded,
          b: pair.current_bid,
          a: pair.current_ask,
          v: pair.eth_24h_volume
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