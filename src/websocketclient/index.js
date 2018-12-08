import io from "socket.io-client";
import {updateMarket} from "../actions";
import {store} from "../index";
import config from "../config";

export const subscribeToSocketBroadcasts = () => {
	const socket = io(`${config.baseURL}:${config.serverPort}`);
	socket.on("marketBroadcast", receivedMarket => {
		updateMarket(receivedMarket)(store.dispatch);
		console.log(receivedMarket);
	});
};
