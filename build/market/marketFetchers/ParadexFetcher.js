"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var axios = require("axios");

var isEqual = require("lodash/isEqual");

var paradexAPIKey = process && process.env && process.env.PARADEX_API_KEY || "GMnkLw8TvmN2SSZp2crgODe0z6NAUgHR";

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
            })), 60 * 1000);

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
  _regenerator.default.mark(function _callee7() {
    var retrieveParadexMarket, retrieveParadexOhlcv, retrieveParadexTicker, lbaAverage, retrievedParadexMarket, paradexMarket, newMarket;
    return _regenerator.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            retrieveParadexMarket =
            /*#__PURE__*/
            function () {
              var _ref4 = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee3() {
                return _regenerator.default.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return axios.get("https://api.paradex.io/consumer/v0/markets", {
                          headers: {
                            "API-KEY": paradexAPIKey
                          }
                        });

                      case 2:
                        return _context3.abrupt("return", _context3.sent.data);

                      case 3:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function retrieveParadexMarket() {
                return _ref4.apply(this, arguments);
              };
            }();

            retrieveParadexOhlcv =
            /*#__PURE__*/
            function () {
              var _ref5 = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee4(m) {
                return _regenerator.default.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.next = 2;
                        return axios.get("https://api.paradex.io/consumer/v0/ohlcv?market=".concat(m.symbol, "&period=1d&amount=1"), {
                          headers: {
                            "API-KEY": paradexAPIKey
                          }
                        });

                      case 2:
                        return _context4.abrupt("return", _context4.sent.data[0]);

                      case 3:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function retrieveParadexOhlcv(_x) {
                return _ref5.apply(this, arguments);
              };
            }();

            retrieveParadexTicker =
            /*#__PURE__*/
            function () {
              var _ref6 = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee5(m) {
                return _regenerator.default.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.next = 2;
                        return axios.get("https://api.paradex.io/consumer/v0/ticker?market=".concat(m.symbol), {
                          headers: {
                            "API-KEY": paradexAPIKey
                          }
                        });

                      case 2:
                        return _context5.abrupt("return", _context5.sent.data);

                      case 3:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5);
              }));

              return function retrieveParadexTicker(_x2) {
                return _ref6.apply(this, arguments);
              };
            }();

            lbaAverage = function lbaAverage(t) {
              return (parseFloat(t.last) + parseFloat(t.ask) + parseFloat(t.bid)) / 3;
            };

            _context7.prev = 4;
            _context7.next = 7;
            return retrieveParadexMarket();

          case 7:
            retrievedParadexMarket = _context7.sent;
            _context7.next = 10;
            return Promise.all(Object.keys(retrievedParadexMarket).map(
            /*#__PURE__*/
            function () {
              var _ref7 = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee6(mKey) {
                var m, o, t;
                return _regenerator.default.wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        m = retrievedParadexMarket[mKey];

                        if (!(m.state === "enabled")) {
                          _context6.next = 11;
                          break;
                        }

                        _context6.next = 4;
                        return retrieveParadexOhlcv(m);

                      case 4:
                        o = _context6.sent;

                        if (!(o.high && o.low && o.volume)) {
                          _context6.next = 11;
                          break;
                        }

                        _context6.next = 8;
                        return retrieveParadexTicker(m);

                      case 8:
                        t = _context6.sent;

                        if (!(t.last && t.bid && t.ask)) {
                          _context6.next = 11;
                          break;
                        }

                        return _context6.abrupt("return", {
                          b: m.quoteToken,
                          q: m.baseToken,
                          m: {
                            l: parseFloat(t.last),
                            b: parseFloat(t.bid),
                            a: parseFloat(t.ask),
                            v: parseFloat(o.volume) * lbaAverage(t)
                          }
                        });

                      case 11:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, _callee6);
              }));

              return function (_x3) {
                return _ref7.apply(this, arguments);
              };
            }()));

          case 10:
            paradexMarket = _context7.sent;
            newMarket = paradexMarket.filter(function (p) {
              return p;
            });

            if (newMarket && !isEqual(newMarket, market)) {
              market = newMarket;
              timestamp = Date.now();
              setMarketNeedsUpdate(true);
            }

            _context7.next = 18;
            break;

          case 15:
            _context7.prev = 15;
            _context7.t0 = _context7["catch"](4);
            console.log("Error while trying to fetch market from ".concat(getExchanges().PARADEX.name, " API: ").concat(_context7.t0));

          case 18:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[4, 15]]);
  }));

  return function tryUpdateMarket() {
    return _ref3.apply(this, arguments);
  };
}(); // TODO: Implement WebSocket client for better performance.

/*const socketURL = "http://api.paradex.io/wsapi/v1";
 const socket = io.connect(socketURL, { transports: ['websocket'] });
 socket.on("open", () => console.log("open"));
 socket.on("connect", () => console.log("connect"));
 socket.on("connection", () => console.log("connection"));
 socket.emit({
 'version': '1.0',
 'type': 'request',
 'target': '/api/v1/tokens',
 'method': 'GET',
 'api_key': paradexAPIKey,
 'id': 1,
 });
 socket.emit({
 'version': '1.0',
 'type': 'request',
 'target': '/api/v1/markets',
 'method': 'GET',
 'api_key': paradexAPIKey,
 'id': 1,
 });
 socket.on("message", (message) => {
 console.log(message);
 });*/


module.exports = {
  initialize: initialize,
  getMarket: getMarket,
  getTimestamp: getTimestamp
};