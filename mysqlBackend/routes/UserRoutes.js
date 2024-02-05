const express = require("express");
const multer = require("multer");
const path = require("path");
const { fileURLToPath } = require("url");
const { dirname } = require("path");
const {
  AdminRegister,
  adminLoginUser,
  getUserViaId,
  manageUsers,
  updateAdminPassword,
  updatePassword,
  updateProfilePicture,
  updateUsers,
  verifyOtp,
} = require("../controllers/authController.js");
const {
  addToWishlist,
  addtocartBack,
  getCartItems,
  getWishlistItems,
  BoughtCourses,
  verifyPayment,
  updateStatus,
  deleteCart,
  PurchasedCourseViaUser,
} = require("../controllers/ItemController.js");

const router = express.Router();

router.get("/usersList", manageUsers);

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
router.put(
  "/update-users/:id",
  proupload.single("profilePicture"),
  updateUsers
);
router.get("/getUserViaId/:id", getUserViaId);
router.post("/addToWishlist/:userId/:productId", addToWishlist);
router.get("/getWishlistItems/:userId", getWishlistItems);
// router.post("/addtocart/:userId/:productId", addtocartBack);
router.get("/getCartItems/:userId", getCartItems);
router.post("/AdminRegister", AdminRegister);
router.post("/adminLoginUser", adminLoginUser);
// router.post("/sendOtpAdmin", sendOtpAdmin);
router.post("/verifyOtp", verifyOtp);
router.put("/updateAdminPassword", updateAdminPassword);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "profilePicture/");
  },
  filename: function (req, file, cb) {
    const fileName =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  },
});

const upload = multer({ storage });

router.put(
  "/update-profile-picture/:userId",
  upload.single("profilePicture"),
  updateProfilePicture
);

router.post("/BoughtCourses/:userId/:courseId", BoughtCourses);
router.put("/verify-payment", verifyPayment);
router.put("/update-order/:orderId", updateStatus);
router.delete("/deleteCartItems/:userId", deleteCart);
router.get("/PurchasedCourseViaUser/:id", PurchasedCourseViaUser);

module.exports = router;
