const Course = require("../model/courseModel");
const User = require("../model/userModel");
const cloudinary = require("cloudinary").v2;

const createCourse = async (req, res) => {
  try {
    const { createrName, category, description, title, _id, price } = req.body;
    const poster = req.files.poster;
    if (!createrName || !category || !poster || !description || !title) {
      return res
        .status(400)
        .json({ message: "Please Provide proper Information", success: false });
    }

    const posterUrl = await cloudinary.uploader.upload(poster.tempFilePath, {
      use_filename: true,
    });
    const createdCourse = await Course.create({
      createrName,
      category,
      poster: posterUrl.secure_url,
      description,
      title,
      createdBy: _id,
      price,
    });
    res.status(200).json({
      createdCourse,
      success: true,
      message: "Course Created Successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

const addLectures = async (req, res) => {
  try {
    const { description, title, _id } = req.body;
    const video = req.files.video;
    if (!video || !description || !title || !_id) {
      return res
        .status(400)

        .json({ message: "Please Provide proper Information", success: false });
    }
    const video_url = await cloudinary.uploader.upload(video.tempFilePath, {
      resource_type: "video",
    });
    const updatedCourse = await Course.findOneAndUpdate(
      { _id },
      {
        $push: {
          lectures: {
            title,
            description,
            video: video_url.secure_url,
          },
        },
      },
      {
        new: true,
      }
    );
    if (!updatedCourse) {
      return res
        .status(404)
        .json({ message: "Course Not Found", success: false });
    }
    return res.status(200).json({ course: updatedCourse, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

// all courses created by the admin
const getAllCoursesByAdmin = async (req, res) => {
  try {
    if (!req.body._id) {
      return res
        .status(400)
        .json({ message: "Please Provide proper Information", success: false });
    }
    const courses = await Course.find({ createdBy: req.body._id });
    return res.status(200).json({ courses, success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

// all courses by anyone
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    return res.status(200).json({ courses, success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

// all courses by categories
const getCoursesCategories = async (req, res) => {
  try {
    const category = req.query.category;
    const regex = new RegExp(category, "i");
    const courses = await Course.find({ category: { $regex: regex } });

    return res.status(200).json({ courses, success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

const getSingleCourse = async (req, res) => {
  try {
    const _id = req.query.id;
    if (!_id) {
      return res
        .status(400)
        .json({ message: "Please provide courseId", success: false });
    }
    const singleCourse = await Course.findById(_id);
    return res.status(200).json({ course: singleCourse, success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id) {
      return res
        .status(400)
        .json({ message: "Please provide courseId", success: false });
    }
    const deletedcourse = await Course.findByIdAndDelete(_id);
    if (!deletedcourse) {
      return res
        .status(404)
        .json({ message: "Course Not Found", success: false });
    }
    return res.status(200).json({ deletedcourse, success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

const deleteLect = async (req, res) => {
  try {
    const { _id, lect_id } = req.body;
    if (!_id || !lect_id) {
      return res
        .status(400)
        .json({ message: "Please Provide proper Information", success: false });
    }
    const updatedCourse = await Course.findOneAndUpdate(
      { _id },
      {
        $pull: {
          lectures: {
            _id: lect_id,
          },
        },
      },
      {
        new: true,
      }
    );
    if (!updatedCourse) {
      return res
        .status(404)
        .json({ message: "Course Not Found", success: false });
    }
    return res.status(200).json({ course: updatedCourse, success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

// courses which are bought by an user
const getBoughtCourses = async (req, res) => {
  try {
    // user id
    const { _id } = req.body;
    if (!_id) {
      return res
        .status(400)
        .json({ message: "Please Provide proper id", success: false });
    }

    const user = await User.findById(_id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    const courseIds = user.courses.map((course) => course.courseId);
    const courses = await Course.find({ _id: { $in: courseIds } });
    return res.status(200).json({ courses, success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

module.exports = {
  createCourse,
  addLectures,
  getAllCoursesByAdmin,
  getSingleCourse,
  deleteCourse,
  deleteLect,
  getAllCourses,
  getCoursesCategories,
  getBoughtCourses,
};
