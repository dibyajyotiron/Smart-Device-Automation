const express = require("express");
const router = express.Router();
const { validateReqBody } = require("../middlewares/generic");
const { validateUser, isAllowed } = require("../middlewares/userMiddleware");
const { validateUserSchema } = require("../models/joiSchema");
const { loginOrRegisterUser } = require("../controllers/userController");

// @route    POST api/v1/users
// @desc     Register user
// @access   Public
router.post("/register", validateReqBody(validateUserSchema), validateUser, loginOrRegisterUser);
router.post("/login", validateUser, loginOrRegisterUser);
module.exports = router;
