const { User } = require("../models/user");
const config = require("config");
const jwt = require("jsonwebtoken");

const decodeToken = token => {
    return jwt.verify(token, config.get("secretOrKey"));
};

module.exports = {
    async validateUser(req, res, next) {
        let loginProp;
        const email = req.body.email;
        const username = req.body.username;
        if (!email && !username)
            return res.status(422).json({
                error: true,
                message: "email or username is required!",
            });
        loginProp = email ? "email" : "username";

        let findByQuery;
        findByQuery = loginProp === "email" ? [{ email: email, active: true }] : [{ username: username, active: true }];

        const user = await User.findOne(...findByQuery);
        if (user) res.locals.user = user;
        next();
    },

    async auth(req, res, next) {
        const token = req.header("x-auth-token");
        if (!token)
            return res.status(401).json({
                error: true,
                message: "You've to login to access this route!",
            });

        try {
            const decoded = decodeToken(token);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(400).json({ error: true, message: "Invalid token provided." });
        }
    },

    isAllowed(role) {
        return (req, res, next) => {
            const decodedToken = decodeToken(req.header("x-auth-token"));
            req.user = decodedToken;
            const requiredRole = config.get(role);
            if (requiredRole.includes(req.user.email || req.user.username)) next();
            return res.status(403).json({
                error: true,
                message: "Only admins are allowed to perform this action!",
            });
        };
    },
};
