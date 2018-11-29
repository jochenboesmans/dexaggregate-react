const express = require('express');
const app = express();
const port = 5000;

const update = require("./model/update");

update();
/**
 * Update model every 60 seconds
 */
setInterval(update, 30 * 1000);

require("./routes/exchangeRoutes")(app);
require("./routes/marketRoutes")(app);

app.listen(port, () => `Express server is now listening on port ${port}`);