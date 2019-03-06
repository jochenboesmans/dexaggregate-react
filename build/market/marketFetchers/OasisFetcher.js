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

var pairs = [{
  base: "MKR",
  quote: "ETH"
}, {
  base: "ETH",
  quote: "DAI"
}, {
  base: "MKR",
  quote: "DAI"
}];

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
            })), 15 * 1000);

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
    var newMarket, filterDefined;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return Promise.all(pairs.map(
            /*#__PURE__*/
            function () {
              var _ref4 = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee3(pair) {
                var m;
                return _regenerator.default.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return axios.get("http://api.oasisdex.com/v1/markets/".concat(pair.base, "/").concat(pair.quote));

                      case 2:
                        m = _context3.sent.data.data;
                        return _context3.abrupt("return", filterMeaningfulValues(m, pair));

                      case 4:
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
            newMarket = _context4.sent;
            filterDefined = newMarket.filter(function (p) {
              return p;
            });

            if (filterDefined && !isEqual(filterDefined, market)) {
              market = filterDefined;
              timestamp = Date.now();
              setMarketNeedsUpdate(true);
            }

            _context4.next = 11;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](0);
            console.log("Error while trying to fetch pairs from ".concat(getExchanges().OASIS.name, " API: ").concat(_context4.t0.message));

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

var filterMeaningfulValues = function filterMeaningfulValues(m, pair) {
  if (m && parseFloat(m.price) && parseFloat(m.bid) && parseFloat(m.ask) && parseFloat(m.vol)) {
    return {
      b: pair.quote,
      q: pair.base,
      m: {
        l: parseFloat(m.last),
        b: parseFloat(m.bid),
        a: parseFloat(m.ask),
        v: parseFloat(m.vol) * parseFloat(m.price)
      }
    };
  }
};

module.exports = {
  initialize: initialize,
  getMarket: getMarket,
  getTimestamp: getTimestamp
};