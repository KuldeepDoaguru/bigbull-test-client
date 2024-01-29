const express = require("express");
const multer = require("multer");
const path = require("path");
const { fileURLToPath } = require("url");
const { dirname } = require("path");
const {
  loginController,
  profilePictureView,
  registerController,
  sendOtp,
  updatePassword,
  updateProfilePicture,
  contactRequest,
} = require("../controllers/authController.js");
const {
  addCourseVideos,
  addToCart,
  coursePage,
  createCourse,
  deleteCourse,
  editCourse,
  getAllCourses,
  // thumbnail,
  videoListViaCourseId,
  addChapters,
  getAllChaptersViaCourse,
  getAllVideosViaCourseIdChapterId,
  downloadQuestionSheet,
  UploadAnswerSheet,
  CoursePayment,
} = require("../controllers/ItemController.js");

// router object
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "thumbnails/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/add-course", upload.single("thumbnails"), createCourse);

router.put("/editCourse/:courseId", upload.single("thumbnails"), editCourse);
// routing
// REGISTER || METHOD POST

const prostorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "profilePicture/");
  },
  filename: function (req, file, cb) {
    const fileName =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  },
});

const proupload = multer({ storage: prostorage });

router.post("/register", proupload.single("profilePicture"), (req, res) => {
  console.log("File uploaded successfully");
  // Your existing registerController logic
  registerController(req, res);
});

router.post("/login", loginController);
router.post("/sendOtp", sendOtp);
router.post("/updatePassword", updatePassword);
router.post("/add-to-cart", addToCart);
router.get("/getAllCourses", getAllCourses);
// router.get("/thumbnail/:courseId", thumbnail);
router.get("/coursePage/:courseId", coursePage);

router.delete("/deleteCourse/:courseId", deleteCourse);

const Videostorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "videoCourse/"); // Specify the upload directory
  },
  filename: function (req, file, cb) {
    const fileName =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  },
});

const Videoupload = multer({ storage: Videostorage });

router.post(
  "/courses/:courseId/videos",
  Videoupload.single("videoFile"),
  addCourseVideos
);

router.get(`/videoListViaCourseId/:courseId`, videoListViaCourseId);
router.get("/profilePictureView/:userId", profilePictureView);
router.post("/contactInquiry", contactRequest);

const wordStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "videoCourse/"); // Specify the upload directory
  },
  filename: function (req, file, cb) {
    const fileName =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  },
});

const wordUpload = multer({ storage: wordStorage });
router.post(
  "/addChapters/:courseId",
  wordUpload.single("wordFile"),
  addChapters
);
router.get("/getAllChaptersViaCourse/:courseId", getAllChaptersViaCourse);
router.get(
  "/getAllVideosViaCourseIdChapterId/:courseId/:chapterId",
  getAllVideosViaCourseIdChapterId
);

router.get(
  "/downloadQuestionSheet/:courseId/:chapterId",
  downloadQuestionSheet
);

const answerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "answerFolder/"); // Specify the upload directory
  },
  filename: function (req, file, cb) {
    const fileName =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  },
});

const answerUpload = multer({ storage: answerStorage });
router.post(
  "/UploadAnswerSheet/:courseId/:chapterId/:studentId",
  answerUpload.single("ansFile"),
  UploadAnswerSheet
);

router.post("/CoursePayment", CoursePayment);

module.exports = router;
