const socketio = require("socket.io");

const getMarket = require("../model/getMarket");

const getModelUpdated = require("./modelUpdated").getModelUpdated;
const setModelUpdated = require("./modelUpdated").setModelUpdated;

module.exports = (server) => {
	const io = socketio(server);

	io.on("connection", (socket) => {
		socket.emit("marketBroadcast", getMarket());
		setInterval(() => {
			if (getModelUpdated()) {
				socket.emit("marketBroadcast", getMarket());
				setModelUpdated(false);
			}
		}, 1000);
	});
};
