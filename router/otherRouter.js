const express = require("express");
const { sendMail } = require("../controller/otherController");
const router = express.Router();

router.route("/send").post(sendMail);

module.exports = router;
