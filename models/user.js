const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const jwt = require("jsonwebtoken");
const { Home } = require("./home");
const { Room } = require("./room");
const config = require("config");

const userSchema = new Schema(
    {
        username: {
            type: String,
            trim: true,
            unique: true,
        },
        name: String,
        email: {
            type: String,
        },
        active: Boolean,
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

userSchema.pre("save", async function(next) {
    if (this.isNew) {
        const roomNames = ["Dining", "Bedroom", "Hall", "Kitchen"];
        const home = "Home - 1"; // default home.
        const roomsArr = [];
        let newRoom;
        const newHome = await Home.create({
            name: home,
            _user: this._id,
        });
        for (const room of roomNames) {
            newRoom = {
                name: room,
                _user: this._id,
                _home: newHome,
            };
            roomsArr.push(newRoom);
        }
        // if password starts with '$', it means password is hashed as bcrypt is used and $ is the separator!
        // Ideally, new doc password should not start with $ since joi is matching the pattern.
        if (!this.password.startsWith("$")) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
        await Room.insertMany(roomsArr);
    }
    next();
});

userSchema.methods.generateAuthToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            name: this.name,
            username: this.username,
            email: this.email,
        },
        config.get("secretOrKey"),
    );
};

module.exports.User = mongoose.model("User", userSchema);
