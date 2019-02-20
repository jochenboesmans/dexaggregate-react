const socketio = require("socket.io");

const { getMarket } = require("../model/market");
const { getModelNeedsBroadcast, setModelNeedsBroadcast } = require("./modelNeedsBroadcast");

const initialize = (server) => {
	const io = socketio(server);

	io.on("connection", (socket) => {
		socket.emit("marketBroadcast", getMarket());
	});

	setInterval(() => {
		if(getModelNeedsBroadcast()) {
			io.emit("marketBroadcast", getMarket());
			setModelNeedsBroadcast(false);
		}
	}, 1000);
};

module.exports = { initialize };
