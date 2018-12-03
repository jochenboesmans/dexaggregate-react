import io from "socket.io-client";
import {updateMarket, updateExchanges} from "../actions";
import {store} from "../index";

export const subscribeToSocketBroadcasts = () => {
  const socket = io("http://localhost:7000");
  socket.on("marketBroadcast", receivedMarket => {
    updateMarket(receivedMarket)(store.dispatch);
  });
  socket.on("exchangeBroadcast", receivedExchanges => {
    updateExchanges(receivedExchanges)(store.dispatch);
  })
};
