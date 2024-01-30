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
  sendOtpAdmin,
  updateAdminPassword,
  updatePassword,
  updateProfilePicture,
  updateUsers,
  verifyOtp,
  deleteUser,
} = require("../controllers/authController.js");
const {
  addToWishlist,
  addtocartBack,
  getCartItems,
  getWishlistItems,
  LeaderBoardData,
} = require("../controllers/ItemController.js");

const router = express.Router();

router.get("/usersList", manageUsers);
router.put("/users/:id", updateUsers);
router.get("/getUserViaId/:id", getUserViaId);
router.post("/addToWishlist/:userId/:productId", addToWishlist);
router.get("/getWishlistItems/:userId", getWishlistItems);
router.post("/addtocart/:userId/:productId", addtocartBack);
router.get("/getCartItems/:userId", getCartItems);
router.post("/AdminRegister", AdminRegister);
router.post("/adminLoginUser", adminLoginUser);
router.post("/sendOtpAdmin", sendOtpAdmin);
router.post("/verifyOtp", verifyOtp);
router.put("/updateAdminPassword", updateAdminPassword);
router.delete("/deleteUser/:userId", deleteUser);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "profilePicture/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.put(
  "/update-profile-picture/:userId",
  upload.single("profilePicture"),
  updateProfilePicture
);
router.get("/LeaderBoardData", LeaderBoardData);

module.exports = router;
