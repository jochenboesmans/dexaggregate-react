import io from "socket.io-client";
import { updateMarket } from "../actions";
import { store } from "../index";

const subscribeToSocketBroadcasts = () => {
	const socket = (process.env.NODE_ENV === "production") ? io() : io("localhost:5000");
	socket.on("marketBroadcast", receivedMarket => {
		updateMarket(receivedMarket)(store.dispatch);
		console.log(receivedMarket);
	})
};


export { subscribeToSocketBroadcasts };