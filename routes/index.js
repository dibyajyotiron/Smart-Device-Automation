const express = require("express");

const users = require("./users");
const rooms = require("./rooms");
const homes = require("./homes");
const smartDevices = require("./smartDevices");

const { internalServerError, notFoundError } = require("../middlewares/error");

module.exports = app => {
    app.use(express.json());
    app.use("/api/v1/users", users);
    app.use("/api/v1/rooms", rooms);
    app.use("/api/v1/homes", homes);
    app.use("/api/v1/smartDevices", smartDevices);
    app.use(notFoundError);
    app.use(internalServerError);
};
