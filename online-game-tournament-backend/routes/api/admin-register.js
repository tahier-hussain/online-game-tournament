const express = require("express");
const router = express.Router();
const AdminRegisterController = require("../../controllers/admin-register");

router.post("/", AdminRegisterController.register);

module.exports = router;
