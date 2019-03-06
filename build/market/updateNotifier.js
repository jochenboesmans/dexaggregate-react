"use strict";

var marketNeedsUpdate = false;

var getMarketNeedsUpdate = function getMarketNeedsUpdate() {
  return marketNeedsUpdate;
},
    setMarketNeedsUpdate = function setMarketNeedsUpdate(boolean) {
  return marketNeedsUpdate = boolean;
};

module.exports = {
  getMarketNeedsUpdate: getMarketNeedsUpdate,
  setMarketNeedsUpdate: setMarketNeedsUpdate
};