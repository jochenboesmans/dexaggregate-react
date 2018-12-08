const express = require("express");
const app = express();
const apiServer = require("http").createServer(app);
const wsServer = require("http").createServer(app);

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

require("./websocketbroadcasts/broadcastSession")(wsServer);

require("./model/periodicallyUpdate")();

//const apiPort = process.env.PORT || 5000;
const wsPort = process.env.PORT || 3000;

//apiServer.listen(apiPort, () => `API server is now listening on port ${apiPort}`);
wsServer.listen(wsPort, () =>  `WS server is now listening on port ${wsPort}`);