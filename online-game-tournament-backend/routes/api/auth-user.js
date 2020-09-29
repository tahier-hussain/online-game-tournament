const express = require("express");
const router = express.Router();
const authController = require("../../controllers/auth-user");
const auth = require("../../middleware/auth");

router.get("/get", auth, authController.get);

router.post("/reduce-balance", auth, authController.reduceBalance);

router.post("/refund-balance", auth, authController.refundBalance);

module.exports = router;
