const _ = require("lodash");

const { getExchanges } = require("../exchanges");
const { setModelNeedsBroadcast } = require("../../websocketbroadcasts/modelNeedsBroadcast");

let receivedMarket = {};

const initialize = () => {
	initializeWSConnection();
};

const initializeWSConnection = () => {
	const io = require("socket.io-client");
	const socketURL = "https://socket.etherdelta.com";
	const socket = io.connect(socketURL, { transports: ["websocket"] });
	socket.emit("getMarket", "{}");
	socket.on("market", (market) => {
		receivedMarket = market;
		setModelNeedsBroadcast(true);
	});
};

const getMarket = () => {
	if(receivedMarket["returnTicker"]) {
		return _.reduce(Object.keys(receivedMarket["returnTicker"]), (result, pairName) => {
			const pair = receivedMarket["returnTicker"][pairName];
			if(pair && pair.last && pair.bid && pair.ask && pair.baseVolume) {
				result.push({
					            base_symbol: pairName.split("_")[0],
					            quote_symbol: pairName.split("_")[1],
					            market_data: {
						            exchange: getExchanges().ETHERDELTA,
						            last_traded: pair.last,
						            current_bid: pair.bid,
						            current_ask: pair.ask,
						            volume: pair.baseVolume,
					            }
				            });
			}
			return result;
		}, []);
	}
};

module.exports = { initialize, getMarket };