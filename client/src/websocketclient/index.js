import io from "socket.io-client";
import {updateMarket} from "../actions";
import {store} from "../index";
import config from "../config";

import axios from "axios";

export const subscribeToSocketBroadcasts = async () => {
	/*const socket = io(`${config.baseURL}:${config.serverPort}`);
	socket.on("marketBroadcast", receivedMarket => {
		updateMarket(receivedMarket)(store.dispatch);
		console.log(receivedMarket);
	});*/
	updateMarket((await axios.get("/api/market")).data)(store.dispatch);
	setInterval(async () => {
		const result = (await axios.get("/api/market")).data;
		console.log(result);
		updateMarket((await axios.get("/api/market")).data)(store.dispatch)
	}, 1 * 1000
	)
};
