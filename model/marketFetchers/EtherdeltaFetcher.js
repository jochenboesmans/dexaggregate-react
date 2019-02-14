const _ = require("lodash");

const { setModelNeedsBroadcast } = require("../../websocketbroadcasts/modelNeedsBroadcast");

let market;

const initialize = () => {
	const io = require("socket.io-client");
	const socketURL = "https://socket.etherdelta.com";
	const socket = io.connect(socketURL, { transports: ["websocket"] });
	socket.emit("getMarket", "{}");
	socket.on("market", (receivedMarket) => {
		market = _.reduce(Object.keys(receivedMarket["returnTicker"]), (result, pairName) => {
			const pair = receivedMarket["returnTicker"][pairName];
			if(pair && pair.last && pair.bid && pair.ask && pair.baseVolume) {
				result.push({
					            b: pairName.split("_")[0],
					            q: pairName.split("_")[1],
					            m: {
						            l: pair.last,
						            b: pair.bid,
						            a: pair.ask,
						            v: pair.baseVolume,
					            }
				            });
			}
			return result;
		}, []);
		setModelNeedsBroadcast(true);
	});
};

const getMarket = () => market;

module.exports = { initialize, getMarket };