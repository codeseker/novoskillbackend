const express = require("express");
const {
  buyCourse,
  verifyPayment,
  getRazorKey,
} = require("../controller/paymentController");
const { isloggin } = require("../middlewares/auth");
const router = express.Router();

router.route("/buy").post(isloggin, buyCourse);
router.route("/verifypayment").post(isloggin,verifyPayment);
router.route("/razorkey").get(getRazorKey);

module.exports = router;
