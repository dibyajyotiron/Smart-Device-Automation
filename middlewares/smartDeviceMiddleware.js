const { SmartDevice } = require("../models/smartDevice");
module.exports = {
    async validateDevice(req, res, next) {
        const smartDevice = await SmartDevice.findOne({ _id: req.params.id, _user: req.user._id, active: true });
        if (!smartDevice) return res.status(404).json({ error: true, message: "Smart Device doesn't exist!" });
        res.locals.smartDevice = smartDevice;
        next();
    },
};
