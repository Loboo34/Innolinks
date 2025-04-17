import { useEffect, useState } from "react";
import useNotificationStore from "../../store/notification.store";
import { useAuthContext } from "../../hooks/useAuthContext";
import { FiBell, FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";
import { format } from "date-fns";

interface Notification {
  id: string;
  message: string;
  status: "unread" | "read";
  createdAt: string;
  type?: string;
}

const Notifications = () => {
  const { fetchUserNotifications, notifications, markAsRead } =
    useNotificationStore();
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();
  const userId = user?.id || 0;

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      await fetchUserNotifications(userId);
      setLoading(false);
    };

    fetchNotifications();
  }, [userId, fetchUserNotifications]);

  const markRead = async (id: string) => {
    await markAsRead(id);
    await fetchUserNotifications(userId);
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy 'at' h:mm a");
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <FiBell className="text-indigo-600 text-xl mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
        </div>
        <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm">
          {
            notifications.filter((n: Notification) => n.status === "unread")
              .length
          }{" "}
          unread
        </span>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <>
          {notifications.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <FiBell className="text-4xl mx-auto mb-2" />
              <p>No notifications yet</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {notifications.map((notification: Notification, index) => (
                <motion.li
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md cursor-pointer
                    ${
                      notification.status === "unread"
                        ? "bg-indigo-50 border-l-4 border-l-indigo-500 border-indigo-200"
                        : "bg-gray-50 border-gray-200 opacity-75"
                    }`}
                  onClick={() =>
                    notification.status === "unread" &&
                    markRead(notification.id)
                  }
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p
                        className={`${
                          notification.status === "unread"
                            ? "font-semibold text-indigo-900"
                            : "font-normal text-gray-600"
                        }`}
                      >
                        {notification.message}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {formatDate(notification.createdAt)}
                      </p>
                    </div>
                    {notification.status === "unread" ? (
                      <span className="h-3 w-3 bg-indigo-600 rounded-full mt-1 animate-pulse"></span>
                    ) : (
                      <FiCheckCircle
                        className="text-green-500 mt-1"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      />
                    )}
                  </div>
                </motion.li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default Notifications;
