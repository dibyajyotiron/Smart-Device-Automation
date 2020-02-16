const { Home } = require("../models/home");
const { verifyID } = require("../utils/lib");
module.exports = {
    async validateHome(req, res, next) {
        let correctIdFormat = verifyID(req.params.id);
        if (typeof correctIdFormat !== "boolean") return res.status(422).json({ error: true, message: correctIdFormat });
        const home = await Home.findOne({ _id: req.params.id, _user: req.user._id }).select({ _user: 0 });
        if (!home) return res.status(404).json({ error: true, message: "Home doesn't exist!" });
        res.locals.home = home;
        next();
    },
};
