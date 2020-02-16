const { Room } = require("../models/room");
const url = require("url");

module.exports = {
    async createOrUpdateRoom(req, res) {
        const { name } = req.body;
        const urlArr = url.parse(req.url).pathname.split("/");
        let room;
        if (urlArr.includes("create")) room = new Room();
        else room = res.locals.room;
        room.name = name || room.name;
        await room.save();
        return res.json({ success: true, message: `${name} added!` });
    },
};
