const mongoose = require("mongoose");
const { Schema } = mongoose;

const smartDeviceSchema = new Schema(
    {
        name: { type: String, required: true },
        ip: { type: String, required: true },
        deviceType: { type: String, required: true },
        state: {
            type: String,
            enum: ["on", "off"],
            required: true,
        },
        _user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        _room: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room",
            required: true,
        },
        active: { type: Boolean, default: true },
    },
    { timestamps: true },
);

smartDeviceSchema.pre("save", function(next, user) {
    if (this.isNew) this._user = user;
    next();
});

smartDeviceSchema.pre("find", function(next) {
    this.populate("_user");
    this.populate("_room");

    next();
});

smartDeviceSchema.pre("findOne", function(next) {
    this.populate("_user");
    this.populate("_room");

    next();
});

module.exports.SmartDevice = mongoose.model("SmartDevice", smartDeviceSchema);
