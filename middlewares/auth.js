require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const isloggin = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ msg: "Token is not provided", success: false });
  }
  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decoded;
    req.user = await User.findById(_id);
    next();
  } catch (error) {
    return res.json({ success: false, msg: "Invalid Token" });
  }
};
const isAdmin = (req, res, next) => {
  if (req.user.role == "admin") {
    next();
  } else {
    return res.json({ success: false, msg: "You are not an admin" });
  }
};
module.exports = { isloggin, isAdmin };
