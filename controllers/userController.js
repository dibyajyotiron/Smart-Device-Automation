const bcrypt = require("bcryptjs");
const url = require("url");
const { User } = require("../models/user");

module.exports = {
    async loginOrRegisterUser(req, res) {
        const routePathArr = url.parse(req.url).pathname.split("/");
        const route = routePathArr.includes("login") ? "login" : "register";
        let { name, email, username, password } = req.body;
        if (!password) return res.status(422).json({ error: true, message: "Password is needed!" });

        let user = res.locals.user;

        if (!user && route === "login") return res.status(404).json({ error: true, message: "User is not registered!" });
        if (user && route === "login") {
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) return res.status(400).json({ error: true, message: "Invalid password!" });
            const token = user.generateAuthToken();
            return res.header("x-auth-token", token).json({
                success: true,
                message: "Logged in successfully logged in!",
            });
        }
        if (user && route === "register") return res.status(404).json({ error: true, message: "User with this email/username is already registered!" });

        // now it's time to register new user
        user = new User({ name, email, username, password });
        await user.save(req.body);
        const token = user.generateAuthToken();
        ({ name, email, username } = user);
        return res.header("x-auth-token", token).json({ name, email, username });
    },
};
