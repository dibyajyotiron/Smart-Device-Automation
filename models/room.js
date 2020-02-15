const mongoose = require("mongoose");
const { Schema } = mongoose;

const roomSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        _user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        _home: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Home",
        },
    },
    { timestamps: true },
);

roomSchema.pre("save", function(next, user) {
    if (this.isNew) this._user = user;
    next();
});

roomSchema.pre("find", function(next) {
    this.populate("_user");
    this.populate("_home");
    next();
});

roomSchema.pre("findOne", function(next) {
    this.populate("_user");
    this.populate("_home");
    next();
});

module.exports.Room = mongoose.model("Room", roomSchema);
