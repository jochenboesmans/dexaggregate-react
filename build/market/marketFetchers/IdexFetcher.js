"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var axios = require("axios");

var isEqual = require("lodash/isEqual"); // const WebSocket = require("ws");


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
            return axios.post("https://api.idex.market/returnTicker", {
              json: {}
            });

          case 3:
            receivedMarket = _context3.sent.data;
            if (receivedMarket) updateMarket(receivedMarket);
            _context3.next = 10;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            console.log("Error while trying to fetch market from ".concat(getExchanges().IDEX.name, " API: ").concat(_context3.t0));

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

    if (parseFloat(p.last) && parseFloat(p.highestBid) && parseFloat(p.lowestAsk) && parseFloat(p.high) && parseFloat(p.low) && parseFloat(p.baseVolume)) {
      newMarket.push({
        b: pKey.split("_")[0],
        q: pKey.split("_")[1],
        m: {
          l: parseFloat(p.last),
          b: parseFloat(p.highestBid),
          a: parseFloat(p.lowestAsk),
          v: parseFloat(p.baseVolume)
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
/* TODO: Implement WebSocket client.
 The current IDEX WebSocket API doesn't currently provide a straight forward way to fetch ticker, volume data directly.
 There'd have to be a maintained copy of the orderbook on this application's side.
 Perhaps best to wait for the upcoming "v2" rollout.

 let retrievedMarket = {};

 const wsURL = "wss://v1.idex.market";
 const ws = new WebSocket(wsURL);
 ws.on("open", async () => {
 ws.send(JSON.stringify(  {
 "method": "handshake",
 "payload": {
 "type": "client",
 "version": "2.0",
 "key": "17paIsICur8sA0OBqG6dH5G1rmrHNMwt4oNk4iX9"
 }
 }));
 ws.onmessage = (message) => {
 const data = JSON.parse(message.data);
 if (data.type === "subscriptions") {
 subscribedChannels = data.channels;
 } else if (data.type === "ticker") {
 retrievedMarket[data.marketId] = data;
 }
 }
 });*/


module.exports = {
  initialize: initialize,
  getMarket: getMarket,
  getTimestamp: getTimestamp
};