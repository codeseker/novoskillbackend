const mongoose = require("mongoose");
const courseSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "enter title of course"],
  },
  description: {
    type: String,
    required: [true, "enter description about the course"],
  },
  lectures: [
    {
      title: {
        type: String,
      },
      description: {
        type: String,
      },
      video: {
        type: String,
      },
      notes: {
        type: String,
      },
    },
  ],
  poster: {
    type: String,
    required: [true, "give some poster for course"],
  },
  views: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 1,
  },
  category: {
    type: String,
    required: [true, "enter the category of course"],
  },
  createrName: {
    type: String,
    required: [true, "enter the creaters name"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  price: {
    type: Number,
    required: [true, "Please Enter the price"]
  }
});

module.exports = mongoose.model("course", courseSchema);
