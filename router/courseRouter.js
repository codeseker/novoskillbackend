const express = require("express");
const {
  createCourse,
  addLectures,
  getAllCourses,
  getSingleCourse,
  deleteCourse,
  deleteLect,
  getCourseLectures,
  getAllCoursesByAdmin,
  getCoursesCategories,
  getBoughtCourses,
} = require("../controller/courseController");
const { isloggin, isAdmin } = require("../middlewares/auth");
const router = express.Router();

// only by admin if logged in
router.route("/createCourse").post(isloggin,isAdmin,createCourse);

// only by admin if logged in
router.route("/addLectures").put(isloggin,isAdmin,addLectures);

// by user and admin if logged in
router.route("/getAllCourses").post(isloggin,getAllCoursesByAdmin);

// all courses
router.route("/allCourses").get(isloggin,getAllCourses);

// by user and admin if logged in
router.route("/getCourse").get(isloggin, getSingleCourse);

// get courses according to categories
router.route("/course").get(isloggin, getCoursesCategories);

// only by admin if logged in
router.route("/deleteCourse").delete(isloggin,isAdmin,deleteCourse);

// only by admin if logged in
router.route("/deleteLecture").delete(isloggin,isAdmin,deleteLect);

// bought courses
router.route("/mycourses").post(isloggin, getBoughtCourses);


module.exports = router;
