const express = require("express");
const app = express();
const server = require("http").createServer(app);

const config = require("./config");

// TODO: Maybe use this in production
if (process.env.NODE_ENV === "production") {
	// Make Express serve front-end assets in react build
	app.use(express.static('client/build'));


	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

require("./routes/exchanges")(app);
require("./routes/market")(app);

require("./websocketbroadcasts/broadcastSession")(server);

require("./model/periodicallyUpdate")();

server.listen(config.serverPort, () => `Server is now listening on port ${config.serverPort}`);