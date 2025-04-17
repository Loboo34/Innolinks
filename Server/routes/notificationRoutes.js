const express = require("express");
const router = express.Router();

const {
  getUserAllNotifications,
  getUnreadUserNotifications,
  markNotificationAsRead,
  createUserNotification,
} = require("../controllers/notificationController");

router.get("/:userId", getUserAllNotifications);

router.get("/unread/:userId", getUnreadUserNotifications);

router.put("/read/:notificationId", markNotificationAsRead);

router.post("/", createUserNotification);

module.exports = router;
