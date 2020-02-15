const { SmartDevice } = require("../models/smartDevice");
const { Room } = require("../models/room");
const url = require("url");
const { Types } = require("mongoose");
const getDevicesForRoom = async (roomId, userId) => {
    userId = Types.ObjectId(userId);
    roomId = Types.ObjectId(roomId);
    const devices = await SmartDevice.aggregate([
        {
            $match: {
                $and: [{ _room: roomId }, { _user: userId }, { active: true }],
            },
        },
        {
            $project: {
                _room: 0,
                __v: 0,
                _user: 0,
            },
        },
    ]);
    return devices;
};

module.exports = {
    async createOrUpdateDevice(req, res) {
        const { name, ip, deviceType, state, room } = req.body;
        const urlArr = url.parse(req.url).pathname.split("/");
        let smartDevice;
        if (urlArr.includes("create")) smartDevice = new SmartDevice();
        else smartDevice = res.locals.smartDevice;
        smartDevice.name = name || smartDevice.name;
        smartDevice.ip = ip || smartDevice.ip;
        smartDevice.deviceType = deviceType || smartDevice.deviceType;
        smartDevice.state = state || smartDevice.state;
        smartDevice._room = room || smartDevice._room;
        await smartDevice.save(req.user);
        return res.json({ success: true, message: `${name} ${urlArr.includes("create") ? "added" : "updated"}!` });
    },
    async getAllDevicesForARoom(req, res) {
        const { roomId } = req.params;
        const { _id: userId } = req.user;
        const smartDevices = await getDevicesForRoom(roomId, userId);
        return res.json({ success: true, message: smartDevices });
    },
};
