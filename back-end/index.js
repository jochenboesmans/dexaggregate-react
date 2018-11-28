const express = require('express');
const app = express();
const port = 5000;


require('./routes/market')(app);
require('./routes/kyber')(app);
require('./routes/idex')(app);
require('./routes/oasis')(app);
require('./routes/bancor')(app);

app.listen(port, () => `Express server is now listening on port ${port}`);