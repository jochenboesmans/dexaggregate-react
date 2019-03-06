/*
const _ = require("lodash");

const { setModelNeedsBroadcast } = require("../../websocketbroadcasts/modelNeedsBroadcast");

let market;
let timestamp;
const getMarket = () => market;
const getTimestamp = () => timestamp;

const initialize = () => {
	const io = require("socket.io-client");
	const socketURL = "https://socket.etherdelta.com";
	const forkURL = "https://api.forkdelta.com";
	const socket = io.connect(socketURL, { transports: ["websocket"] });
	const forkSocket = io.connect(forkURL, { transports: ["websocket"] });
	forkSocket.on("connect", () => {
		console.log("connected");
		forkSocket.emit("getMarket", {});
	});
	socket.emit("getMarket", {});
	socket.on("market", (receivedMarket) => {
		updateMarket(receivedMarket);
		console.log(Object.keys(receivedMarket["returnTicker"]).slice(0,5));
	});
	forkSocket.on("market", (receivedMarket) => {
		console.log(Object.keys(receivedMarket["returnTicker"]).slice(0,5));
	});
};

const updateMarket = (receivedMarket) => {
	market = _.reduce(receivedMarket["returnTicker"], (result, pair, pairName) => {
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
	timestamp = Date.now();
	setModelNeedsBroadcast(true);
};

module.exports = {
	initialize,
	getMarket,
	getTimestamp
};*/
"use strict";