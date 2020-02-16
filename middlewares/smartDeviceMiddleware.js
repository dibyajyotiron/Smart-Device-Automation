const { SmartDevice } = require("../models/smartDevice");
const { verifyID } = require("../utils/lib");

module.exports = {
    async validateDevice(req, res, next) {
        let correctIdFormat = verifyID(req.params.id);
        if (typeof correctIdFormat !== "boolean") return res.status(422).json({ error: true, message: correctIdFormat });
        const smartDevice = await SmartDevice.findOne({ _id: req.params.id, _user: req.user._id, active: true });
        if (!smartDevice) return res.status(404).json({ error: true, message: "Smart Device doesn't exist!" });
        res.locals.smartDevice = smartDevice;
        next();
    },
};
