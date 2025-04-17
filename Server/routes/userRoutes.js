const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUser,
  registerUser,
  loginUser,
  getUserProfile,
  userStatus,
  getNotifications,
} = require("../controllers/userController");
const authMiddleware = require("../utils/AuthMiddleWare");

router.get("/", authMiddleware, getUsers);

router.get("/:id", getUser);

router.post("/register", registerUser);

router.post("/login", loginUser);

//router.post("/auth/google", googleLogin);

router.get("/profile/:id", authMiddleware, getUserProfile);

router.put("/status/:id", authMiddleware, userStatus);

router.get("/notifications/:id", authMiddleware, getNotifications);

module.exports = router;
