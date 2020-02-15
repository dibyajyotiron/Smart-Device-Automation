const mongoose = require("mongoose");
const { Schema } = mongoose;

const homeSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        _user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true },
);

homeSchema.pre("save", function(next, user) {
    if (this.isNew) this._user = user;
    next();
});

homeSchema.pre("find", function(next) {
    this.populate("_user");
    next();
});

homeSchema.pre("findOne", function(next) {
    this.populate("_user");
    next();
});

module.exports.Home = mongoose.model("Home", homeSchema);
