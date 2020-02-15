const logger = require("../services/logger");
module.exports = {
    notFoundError(req, res, next) {
        return res.status(404).json({
            error: true,
            message: "The resource you are looking for is not available",
        });
    },

    internalServerError(error, req, res, next) {
        logger.error(error.message);
        logger.info(`This error occured in: ${req.url}, method: ${req.method}`);
        req.connection.bytesRead && console.log(`Bytes read ${req.connection.bytesRead / 1024} kb`);

        if (error.statusCode && error.statusCode < 500) return res.status(error.statusCode).json({ error: true, message: error.message });
        if (error.name === "ValidationError") return res.status(422).json({ error: true, message: error.message });
        if (error.code === 11000) return res.status(500).json({ error: true, message: "Value already exists!", details: error.keyValue });
        if (error.name === "BulkWriteError") return res.status(422).json({ error: true, message: error.err.errmsg });
        return res.status(500).json({ error: true, message: "Something went wrong!" });
    },
};
