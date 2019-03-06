"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var axios = require("axios");

var WebSocket = require("ws");

var _require = require("../updateNotifier"),
    setMarketNeedsUpdate = _require.setMarketNeedsUpdate;

var market = {};
var timestamp;

var getMarket = function getMarket() {
  return market;
};

var getTimestamp = function getTimestamp() {
  return timestamp;
};

var fetch =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee() {
    var fetch;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return axios.get("https://api.ddex.io/v3/markets/tickers");

          case 2:
            fetch = _context.sent.data.data.tickers;
            fetch.forEach(function (pair) {
              return potentiallyAddToMarket(pair);
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function fetch() {
    return _ref.apply(this, arguments);
  };
}();

var initialize =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2() {
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return fetch();

          case 2:
            _context2.next = 4;
            return initializeWSConnection();

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function initialize() {
    return _ref2.apply(this, arguments);
  };
}();

var initializeWSConnection =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3() {
    var wsURL, ws, askForTickers;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            wsURL = "wss://ws.ddex.io/v3";
            ws = new WebSocket(wsURL);
            _context3.t0 = JSON;
            _context3.next = 5;
            return axios.get("https://api.ddex.io/v3/markets");

          case 5:
            _context3.t1 = function (m) {
              return m.id;
            };

            _context3.t2 = _context3.sent.data.data.markets.map(_context3.t1);
            _context3.t3 = {
              "name": "ticker",
              "marketIds": _context3.t2
            };
            _context3.t4 = [_context3.t3];
            _context3.t5 = {
              "type": "subscribe",
              "channels": _context3.t4
            };
            askForTickers = _context3.t0.stringify.call(_context3.t0, _context3.t5);
            setTimeout(function () {
              return ws.send(askForTickers);
            }, 2.5 * 1000);

            ws.onmessage = function (response) {
              var data = JSON.parse(response.data);

              if (data.type === "ticker") {
                potentiallyAddToMarket(data);
              }
            };

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function initializeWSConnection() {
    return _ref3.apply(this, arguments);
  };
}();

var potentiallyAddToMarket = function potentiallyAddToMarket(pair) {
  var l = parseFloat(pair.price);
  var b = parseFloat(pair.bid);
  var a = parseFloat(pair.ask);
  var v = parseFloat(pair.volume) * pair.price;

  if (pair.marketId && l && b && a && v) {
    market[pair.marketId] = {
      b: pair.marketId.split("-")[1],
      q: pair.marketId.split("-")[0],
      m: {
        l: l,
        b: b,
        a: a,
        v: v
      }
    };
    timestamp = Date.now();
    setMarketNeedsUpdate(true);
  }
};

module.exports = {
  initialize: initialize,
  getMarket: getMarket,
  getTimestamp: getTimestamp
};