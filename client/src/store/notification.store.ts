import { create } from "zustand";

import {
  getNotifications,
  markAsRead,
  getUserNotifications,
  getUnread,
} from "../services/notifications";

interface Notification {
  id: string;
  message: string;
  status: "unread" | "read";
  createdAt: string;
}

interface NotificationStore {
  notifications: Notification[];
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  fetchUserNotifications: (userId: number) => Promise<void>;
  unread: (userId: number) => Promise<Notification[] | undefined>;
}

const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  fetchNotifications: async () => {
    try {
      const notifications =
        ((await getNotifications()) as Notification[]) || [];
      set({ notifications });
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  },
  markAsRead: async (id: string) => {
    try {
      await markAsRead(id);
      set((state) => ({
        notifications: state.notifications.map((notification) =>
          notification.id === id
            ? { ...notification, status: "read" }
            : notification
        ),
      }));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  },

  fetchUserNotifications: async (userId: number) => {
    try {
      const notifications =
        ((await getUserNotifications(userId)) as Notification[]) || [];
      console.log("Fetched user notifications:", notifications);
      set({ notifications });
    } catch (error) {
      console.error("Error fetching user notifications:", error);
    }
  },

  unread: async (userId: number) => {
    try {
      const unreadNotifications =
        ((await getUnread(userId)) as Notification[]) || [];
      console.log("Fetched unread notifications:", unreadNotifications);
      set({ notifications: unreadNotifications });
      return unreadNotifications;
    } catch (error) {
      console.error("Error fetching unread notifications:", error);
      return undefined;
    }
  },
}));

export default useNotificationStore;
