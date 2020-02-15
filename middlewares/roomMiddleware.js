const { Room } = require("../models/room");
module.exports = {
    async getRoomsGroupedByHome(user) {
        const rooms = await Room.aggregate([
            {
                $match: { user: user._id },
            },
        ]);
        console.log(rooms);
    },
    async validateRoom(req, res, next) {
        const room = await Room.findOne({ _id: req.params.id, _user: req.user._id });
        if (!room) return res.status(404).json({ error: true, message: "Room doesn't exist!" });
        res.locals.room = room;
        next();
    },
};
