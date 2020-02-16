const router = require("express").Router();
const { validateReqBody } = require("../middlewares/generic");
const { validateDevice } = require("../middlewares/smartDeviceMiddleware");
const { auth } = require("../middlewares/userMiddleware");
const { validateDeviceSchema } = require("../models/joiSchema");
const { createOrUpdateDevice, getAllDevicesForARoom, deleteDevice, updateDeviceDetails, updateDeviceStatus } = require("../controllers/smartDeviceController");

router.use(auth);
router.get("/:roomId", getAllDevicesForARoom);
router.post("/create", validateReqBody(validateDeviceSchema), createOrUpdateDevice);
router.put("/update/:id", validateDevice, updateDeviceDetails);
router.put("/update/:id/status", validateDevice, updateDeviceStatus);
router.delete("/:id", validateDevice, deleteDevice);

module.exports = router;
