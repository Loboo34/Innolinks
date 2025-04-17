const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createNotification = async ({ userId, type, message }) => {
  try {
    const notification = await prisma.notification.create({
      data: {
        userId,
        type,
        message,
      },
    });
    return notification;
  } catch (error) {
    console.error(error, "error creating notification");
  }
};

const getUserNotifications = async (userId) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        userId: parseInt(userId),
      },
    });
    return notifications;
  } catch (error) {
    console.error(error, "error fetching notifications");
    return [];
  }
};

const markAsRead = async (notificationId) => {
  try {
    const notification = await prisma.notification.update({
      where: {
        id: parseInt(notificationId),
      },
      data: {
        status: "read",
      },
    });
    return notification;
  } catch (error) {
    console.error(error, "error marking notification as read");
  }
};


const getUnreadNotifications = async (userId) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        userId: parseInt(userId),
        status: "unread",
      },
    });
    return notifications;
  } catch (error) {
    console.error(error, "error fetching notifications");
    return []; 
  }
};

module.exports = {
  createNotification,
  getUserNotifications,
  markAsRead,
  getUnreadNotifications,
};
