const logger = require("./logger");
const mongoose = require("mongoose");
const config = require("config");

const onConnectionMessage = env => {
    if (env !== "production") logger.info("Connected database: " + `${config.get("mongoURI")}...`.green);
    else logger.info("connected to production environment of mongodb...".blue);
};

module.exports = {
    mongodb: async env => {
        try {
            mongoose.connection.on("connected", () => {
                onConnectionMessage(env);
            });
            mongoose.connection.on("reconnected", () => {
                console.log("Connection Reestablished...");
            });

            mongoose.connection.on("disconnected", async () => {
                console.log("Connection Disconnected");
            });

            mongoose.connection.on("close", () => {
                console.log("Connection Closed");
            });

            mongoose.connection.on("error", error => {
                console.log("ERROR: " + error);
                console.log("Trying to Reconnect...");
            });

            mongoose.connect(config.get("mongoURI"), { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true });
        } catch (error) {
            logger.error(`${error.message}`);
        }
    },
};
