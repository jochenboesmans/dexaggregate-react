const _ = require("lodash");
const io = require("socket.io-client");

const socketURL = "https://socket.etherdelta.com";

const { ETHERDELTA } = require("../../exchanges");

const socket = io.connect(socketURL, { transports: ['websocket'] });
socket.emit("getMarket", "{}");
socket.on("market", (market) => {
	receivedMarket = market;
});

let receivedMarket = {};

module.exports = async () => {
	try {
		if (receivedMarket["returnTicker"]) {
			return _.map(Object.keys(receivedMarket["returnTicker"]), pairName => ({
				base_symbol: pairName.split("_")[0], quote_symbol: pairName.split("_")[1], market_data: {
					exchange: ETHERDELTA,
					last_traded: receivedMarket["returnTicker"][pairName].last,
					current_bid: receivedMarket["returnTicker"][pairName].bid,
					current_ask: receivedMarket["returnTicker"][pairName].ask,
					past_24h_high: null,
					past_24h_low: null,
					volume: receivedMarket["returnTicker"][pairName].baseVolume,
				}
			}))
		}
	} catch(error) {
		console.log(`Error while trying to fetch market from ${ETHERDELTA.name} API: ${error}`);
	}
};