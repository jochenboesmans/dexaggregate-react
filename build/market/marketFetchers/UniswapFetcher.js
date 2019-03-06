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

var tokens = {
  BAT: {
    symbol: "BAT",
    address: "0x0d8775f648430679a709e98d2b0cb6250d2887ef",
    exchangeAddress: "0x2E642b8D59B45a1D8c5aEf716A84FF44ea665914"
  },
  DAI: {
    symbol: "DAI",
    address: "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359",
    exchangeAddress: "0x09cabEC1eAd1c0Ba254B09efb3EE13841712bE14"
  },
  MKR: {
    symbol: "MKR",
    address: "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
    exchangeAddress: "0x2C4Bd064b998838076fa341A83d007FC2FA50957"
  },
  SPANK: {
    symbol: "SPANK",
    address: "0x42d6622dece394b54999fbd73d108123806f6a18",
    exchangeAddress: "0x4e395304655F0796bc3bc63709DB72173b9DdF98"
  },
  ZRX: {
    symbol: "ZRX",
    address: "0xe41d2489571d322189246dafa5ebde1f4699f498",
    exchangeAddress: "0xaE76c84C9262Cdb9abc0C2c8888e62Db8E22A0bF"
  }
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
  _regenerator.default.mark(function _callee4() {
    var newPairs, newMarket;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return Promise.all(Object.keys(tokens).map(
            /*#__PURE__*/
            function () {
              var _ref4 = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee3(tKey) {
                var t, p;
                return _regenerator.default.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        t = tokens[tKey];
                        _context3.next = 3;
                        return axios.get("https://uniswap-analytics.appspot.com/api/v1/ticker?exchangeAddress=".concat(t.exchangeAddress));

                      case 3:
                        p = _context3.sent.data;

                        if (!p.symbol) {
                          _context3.next = 6;
                          break;
                        }

                        return _context3.abrupt("return", {
                          b: "ETH",
                          q: p.symbol,
                          m: {
                            l: Math.pow(p.lastTradePrice, -1),
                            b: p.invPrice,
                            a: p.invPrice,
                            v: p.tradeVolume / Math.pow(10, 18)
                          }
                        });

                      case 6:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x) {
                return _ref4.apply(this, arguments);
              };
            }()));

          case 3:
            newPairs = _context4.sent;
            newMarket = newPairs.filter(function (el) {
              return el;
            });

            if (newMarket && !isEqual(newMarket, market)) {
              market = newMarket;
              timestamp = Date.now();
              setMarketNeedsUpdate(true);
            }

            _context4.next = 11;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](0);
            console.log("Error while trying to fetch market from ".concat(getExchanges().UNISWAP.name, " API: ").concat(_context4.t0));

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 8]]);
  }));

  return function tryUpdateMarket() {
    return _ref3.apply(this, arguments);
  };
}();

module.exports = {
  initialize: initialize,
  getMarket: getMarket,
  getTimestamp: getTimestamp
};