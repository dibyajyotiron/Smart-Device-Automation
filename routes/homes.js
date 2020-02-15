const router = require("express").Router();
const { validateReqBody } = require("../middlewares/generic");
const { validateHome } = require("../middlewares/homeMiddleware");
const { auth } = require("../middlewares/userMiddleware");
const { validateHomeSchema } = require("../models/joiSchema");
const { createOrUpdateHome, getHomeDetails } = require("../controllers/homeController");

router.use(auth);
// router.get("/", getRoomsGroupedByHome);
router.post("/create", validateReqBody(validateHomeSchema), createOrUpdateHome);
router.put("/update/:id", validateReqBody(validateHomeSchema), validateHome, createOrUpdateHome);

router.get("/:id", validateHome, getHomeDetails);
module.exports = router;
