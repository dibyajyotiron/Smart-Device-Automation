const { Types } = require("mongoose");
const { Room } = require("../models/room");
const { Home } = require("../models/home");
const { verifyID } = require("../utils/lib");
async function roomsGroupedByHome(userObj) {
    const rooms = await Room.aggregate([
        {
            $match: { _user: Types.ObjectId(userObj._id) },
        },
    ]);
    const homes = await Home.find({ _user: userObj._id });
    const roomsByHome = {};
    for (const room of rooms) {
        if (!roomsByHome[room._home]) roomsByHome[room._home] = [];
        roomsByHome[room._home].push(room);
    }
    for (const home of homes) {
        roomsByHome[home._id] = roomsByHome[home._id] || {};
    }

    return roomsByHome;
}
module.exports = {
    async validateRoom(req, res, next) {
        let correctIdFormat = verifyID(req.params.id);
        if (typeof correctIdFormat !== "boolean") return res.status(422).json({ error: true, message: correctIdFormat });
        const room = await Room.findOne({ _id: req.params.id, _user: req.user._id });
        if (!room) return res.status(404).json({ error: true, message: "Room doesn't exist!" });
        res.locals.room = room;
        next();
    },
    async getRoomsGroupedByHome(req, res, next) {
        const rooms = await roomsGroupedByHome(req.user);
        console.log(req.user);
        return res.json({ success: true, message: rooms });
    },
};
