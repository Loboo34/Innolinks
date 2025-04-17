

const {
   createNotification,
   getUserNotifications,
   markAsRead,
   getUnreadNotifications,
} = require("../utils/notificationServices");


const getUserAllNotifications = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const notifications = await getUserNotifications(userId);
    res.json(notifications);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getUnreadUserNotifications = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const notifications = await getUnreadNotifications(userId);
    res.json(notifications);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};


const markNotificationAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;

    if (!notificationId) {
      return res.status(400).json({ error: "Notification ID is required" });
    }

    const notification = await markAsRead(notificationId);

    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    res.json(notification);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};


const createUserNotification = async (req, res) => {
  try {
    const { userId, type, message } = req.body;

    if (!userId || !type || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const notification = await createNotification({ userId, type, message });

    if (!notification) {
      return res.status(500).json({ error: "Failed to create notification" });
    }

    res.status(201).json(notification);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getUserAllNotifications,
  getUnreadUserNotifications,
  markNotificationAsRead,
  createUserNotification,
  // getNotifications,
  // getNotification,
  // getUnread,
  // createNotification,
  // markRead,
  // getUser
};
