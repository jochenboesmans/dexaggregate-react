const axios = require("axios");
const isEqual = require("lodash/isEqual");
// const WebSocket = require("ws");

const { getExchanges } = require("../exchanges");
const { setModelNeedsBroadcast } = require("../../websocketbroadcasts/modelNeedsBroadcast");

let market;
let timestamp;
const getMarket = () => market;
const getTimestamp = () => timestamp;

const initialize = async () => {
	await tryUpdateMarket();
	setInterval(async () => {
		await tryUpdateMarket();
	}, 5 * 1000);

};

const tryUpdateMarket = async () => {
	try {
		const receivedMarket = (await axios.post("https://api.idex.market/returnTicker", { json: {} })).data;
		if (receivedMarket) updateMarket(receivedMarket);
	} catch(error) {
		console.log(`Error while trying to fetch market from ${getExchanges().IDEX.name} API: ${error}`);
	}
};

const updateMarket = (receivedMarket) => {
	const newMarket = [];
	Object.keys(receivedMarket).forEach(pKey => {
		const p = receivedMarket[pKey];
		if((parseFloat(p.last) && parseFloat(p.highestBid) && parseFloat(p.lowestAsk)
			&& parseFloat(p.high) && parseFloat(p.low) && parseFloat(p.baseVolume))) {
			newMarket.push({
				b: pKey.split("_")[0],
				q: pKey.split("_")[1],
				m: {
					l: parseFloat(p.last),
					b: parseFloat(p.highestBid),
					a: parseFloat(p.lowestAsk),
					v: parseFloat(p.baseVolume),
				}
			});
		}
	});
	if (newMarket && !isEqual(newMarket, market)) {
		market = newMarket;
		timestamp = Date.now();
		setModelNeedsBroadcast(true);
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
	initialize,
	getMarket,
	getTimestamp
};