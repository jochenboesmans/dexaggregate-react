const socketio = require("socket.io");

const { getMarket } = require("../market/market");
const { getModelNeedsBroadcast,
	setModelNeedsBroadcast } = require("./updateNotifier");

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
	}, 100);
};

module.exports = { initialize };
