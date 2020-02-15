require("dotenv");
const winston = require("./services/logger");
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const env = process.env.NODE_ENV || "development";

require("colors");
require("express-async-errors");
require("./services/cors")(app);
require("./services/db").mongodb(env);
require("./services/morgan")(app);

require("./routes/index")(app);

module.exports = app.listen(port, () => winston.info(`Server started on ${port}...`));
