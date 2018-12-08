const socketio = require("socket.io");

const getMarket = require("../model/getMarket");

const {getModelNeedsBroadcast, setModelNeedsBroadcast} = require("./modelNeedsBroadcast");

module.exports = (server) => {
	const io = socketio(server);

	io.on("connection", (socket) => {
		console.log("Client connected");
		socket.emit("marketBroadcast", getMarket());
		socket.on("disconnect", () => console.log("Client disconnected"));
	});

	setInterval(() => {
		if (getModelNeedsBroadcast()) {
			io.emit("marketBroadcast", getMarket());
			setModelNeedsBroadcast(false);
		}

	}, 1000);
};
