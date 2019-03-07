import io from "socket.io-client";

import { updateMarket } from "../actions";

const subscribeToSocketBroadcasts = (dispatch) => {
	const socket = (process.env.NODE_ENV === "production") ? io() : io(`localhost:${process.env.SERVER_PORT || 5000}`);
	socket.on("marketBroadcast", receivedMarket => {
		updateMarket(receivedMarket)(dispatch);
	});
	return socket;
};

const unsubscribeFromSocketBroadcasts = (dispatch, socket) => {
	socket.removeAllListeners("marketBroadcast");
	updateMarket(null)(dispatch);
};

export { subscribeToSocketBroadcasts, unsubscribeFromSocketBroadcasts };