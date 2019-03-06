"use strict";

var exchanges = {
  DDEX: {
    name: "Ddex",
    ID: "DDEX"
  },

  /*
  ETHERDELTA: {
  name: "Ether Delta",
  ID: "ETHERDELTA"
  },*/
  IDEX: {
    name: "Idex",
    ID: "IDEX"
  },
  KYBER: {
    name: "Kyber Network",
    ID: "KYBER"
  },
  RADAR: {
    name: "Radar Relay",
    ID: "RADAR"
  },
  TOKENSTORE: {
    name: "Token Store",
    ID: "TOKENSTORE"
  },
  UNISWAP: {
    name: "Uniswap",
    ID: "UNISWAP"
  },
  PARADEX: {
    name: "Paradex",
    ID: "PARADEX"
  },
  OASIS: {
    name: "Oasis Dex",
    ID: "OASIS"
  }
};

var getExchanges = function getExchanges() {
  return exchanges;
};

module.exports = {
  getExchanges: getExchanges
};