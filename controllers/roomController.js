const { Room } = require("../models/room");
const url = require("url");

const createDefaultRooms = async user => {
    const roomNames = ["Home", "Bedroom", "Hall", "Kitchen"];
    const roomsPromise = [];
    let newRoom;
    for (const room of roomNames) {
        newRoom = new Room({
            name: room,
            user,
        });
        roomsPromise.push(newRoom);
    }
    await Promise.all(roomsPromise);
    return "Default rooms added!";
};

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
    async getAllRooms(req, res) {},
};
