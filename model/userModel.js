const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  // name,
  fullname: {
    type: String,
    required: [true, "please enter your name"],
  },
  // email,
  email: {
    type: String,
    required: [true, "please enter your email id"],
    unique: [true, "ALready user exists"],
  },
  // password,
  password: {
    type: String,
    required: [true, "please enter password."],
  },
  // skills,
  profile_url: {
    type: String,
    default:
      "https://res.cloudinary.com/df7icftww/image/upload/v1710261988/tmp-1-1710261987232_vxh8pe.png",
  },
  skills: [
    {
      type: String,
    },
  ],
  // age,
  age: {
    type: Number,
  },
  // hobbies,
  hobbies: [],
  // contactNo,
  contactNumber: {
    type: String,
    required: [true, "enter your phone number"],
  },
  // role -> admin, user,
  role: {
    type: String,
    default: "user",
  },
  // courses
  courses: [
    {
      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
      status: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});
module.exports = mongoose.model("User", userSchema);
