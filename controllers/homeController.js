const { Home } = require("../models/home");
const { Room } = require("../models/room");
const url = require("url");

const fetchHomeWithRooms = async home => {
    const rooms = await Room.aggregate([
        { $match: { _home: home._id } },
        {
            $project: {
                _id: "$_id",
                name: "$name",
            },
        },
    ]);

    home.rooms = rooms;
    return home;
};

module.exports = {
    async createOrUpdateHome(req, res) {
        const { name } = req.body;
        const urlArr = url.parse(req.url).pathname.split("/");
        let home;
        if (urlArr.includes("create")) home = new Home();
        else home = res.locals.home;
        home.name = name || home.name;
        await home.save(req.user);
        return res.json({ success: true, message: `${name} ${urlArr.includes("create") ? "created" : "updated"}!` });
    },
    async getHomeDetails(req, res) {
        const home = res.locals.home.toObject();
        const homeWithRooms = await fetchHomeWithRooms(home);
        return res.json({ success: true, message: homeWithRooms });
    },
};
