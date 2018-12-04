const app = require('express')();
const apiServer = require("http").createServer(app);
const wsServer = require("http").createServer(app);
const apiPort = 5000;
const wsPort = 7000;

require("./routes/exchanges")(app);
require("./routes/market")(app);

require("./websocketbroadcasts/broadcastSession")(wsServer);

require("./model/periodicallyUpdate")();

apiServer.listen(apiPort, () => `API server is now listening on port ${apiPort}`);
wsServer.listen(wsPort, () =>  `WS server is now listening on port ${wsPort}`);