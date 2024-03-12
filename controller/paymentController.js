require("dotenv").config();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../model/paymentModel");
const User = require("../model/userModel");

const buyCourse = async (req, res) => {
  try {
    if (req.user.role === "admin") {
      return res
        .status(400)
        .json({ message: "Adming Cannot buy course", success: false });
    }

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_API_KEY,
      key_secret: process.env.RAZORPAY_API_SECRET,
    });

    // console.log(req.body.price, typeof(req.body.price));
    const amount = req.body.price * 100;
    const options = {
      amount,
      currency: "INR",
    };

    const order = await instance.orders.create(options);
    res.json({ order_id: order.id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_signature,
      razorpay_order_id,
      razorpay_payment_id,
      courseId,
    } = req.body;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id, "utf-8")
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;
    if (!isAuthentic) {
      return res.json({ success: false, msg: "Payment Failed" });
    }
    await Payment.create({
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    });

    const user = await User.findById(req.user._id);
    await user.courses.push({
      courseId,
      status: "active",
    });
    await user.save();
    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getRazorKey = async (req, res) => {
  return res.json({ key: process.env.RAZORPAY_API_KEY });
};

module.exports = {
  buyCourse,
  getRazorKey,
  verifyPayment,
};
