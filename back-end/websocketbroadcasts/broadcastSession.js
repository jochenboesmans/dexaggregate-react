const socketio = require("socket.io");

const getMarket = require("../model/getMarket");
const exchanges = require("../model/exchanges");

const getModelUpdated = require("./modelUpdated").getModelUpdated;
const setModelUpdated = require("./modelUpdated").setModelUpdated;

module.exports = (server) => {
	const io = socketio(server);

	io.on("connection", (socket) => {
		socket.emit("marketBroadcast", getMarket());
		socket.emit("exchangeBroadcast", exchanges);

		setInterval(() => {
			if (getModelUpdated()) {
				socket.emit("marketBroadcast", getMarket());
				socket.emit("exchangeBroadcast", exchanges);
				setModelUpdated(false);
			}
		}, 1000);
	});
};
