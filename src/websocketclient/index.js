import io from "socket.io-client";
import {updateMarket} from "../actions";
import {store} from "../index";

export const subscribeToSocketBroadcasts = () => {
  const url = (process.env.NODE_ENV === "production") ? "https://dexaggregate-server.herokuapp.com" : "http://localhost:5000";

  const socket = io(url);
  socket.on("marketBroadcast", receivedMarket => {
    updateMarket(receivedMarket)(store.dispatch);
    console.log(receivedMarket);
  });
};
