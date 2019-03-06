"use strict";

var modelNeedsBroadcast = false;

var getModelNeedsBroadcast = function getModelNeedsBroadcast() {
  return modelNeedsBroadcast;
},
    setModelNeedsBroadcast = function setModelNeedsBroadcast(boolean) {
  return modelNeedsBroadcast = boolean;
};

module.exports = {
  getModelNeedsBroadcast: getModelNeedsBroadcast,
  setModelNeedsBroadcast: setModelNeedsBroadcast
};