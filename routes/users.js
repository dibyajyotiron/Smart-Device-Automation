const express = require("express");
const router = express.Router();
const { validateReqBody } = require("../middlewares/generic");
const { validateUser } = require("../middlewares/userMiddleware");
const { validateUserSchema } = require("../models/joiSchema");
const { loginOrRegisterUser } = require("../controllers/userController");

router.post("/register", validateReqBody(validateUserSchema), validateUser, loginOrRegisterUser);
router.post("/login", validateUser, loginOrRegisterUser);
module.exports = router;
