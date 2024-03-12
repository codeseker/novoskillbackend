const express = require("express");
const {
  updateProfile,
  login,
  signup,
  getProfile,
  deleteProfile,
  profilePic,
} = require("../controller/userController");
const { isloggin } = require("../middlewares/auth");

const router = express.Router();
router.route("/login").post(login);
router.route("/signup").post(signup);
router.route("/getProfile").post(isloggin, getProfile);
router.route("/updateProfile").put(isloggin, updateProfile);
router.route("/deleteProfile").delete(isloggin, deleteProfile);
router.route("/profilePic").post(isloggin, profilePic);

module.exports = router;
