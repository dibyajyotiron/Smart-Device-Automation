const router = require("express").Router();
const { validateReqBody } = require("../middlewares/generic");
const { validateRoom, getRoomsGroupedByHome } = require("../middlewares/roomMiddleware");
const { auth } = require("../middlewares/userMiddleware");
const { validateRoomSchema } = require("../models/joiSchema");
const { createOrUpdateRoom } = require("../controllers/roomController");

router.use(auth);
router.get("/", getRoomsGroupedByHome);
router.post("/create", validateReqBody(validateRoomSchema), createOrUpdateRoom);
router.put("/update/:id", validateReqBody(validateRoomSchema), validateRoom, createOrUpdateRoom);
module.exports = router;
