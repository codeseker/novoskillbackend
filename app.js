require("dotenv").config();
const express = require("express");
const cloudinary = require("cloudinary").v2;
const app = express();
const connectDB = require("./db/db");
const cors = require("cors");
const expressFileUpload = require("express-fileupload");
const PORT = 8000 || process.env.PORT;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
app.use(expressFileUpload({ useTempFiles: true }));
app.use(express.json());
app.use(cors());

const userRouter = require("./router/userRoutes");
const courseRouter = require("./router/courseRouter");
const paymentRouter = require("./router/paymentRouter");
const otherRouter = require("./router/otherRouter");

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1", courseRouter);
app.use("/api/v1/contact", otherRouter);

const start = async () => {
  await connectDB(process.env.MONGO_URL);
  app.listen(PORT, () => {
    console.log("Server started......");
  });
};

start();
