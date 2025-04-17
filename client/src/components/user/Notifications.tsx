import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import useNotificationStore from "../../store/notification.store";

interface Notification {
  id: string;
  message: string;
  status: "unread" | "read";
  createdAt: string;
}

const Notifications = () => {
  const { fetchUserNotifications } = useNotificationStore();
  const notifications = useNotificationStore((state) => state.notifications);

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

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Notifs</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-2">
          {notifications.map((notification: Notification) => (
            <li
              key={notification.id}
              className={`p-2 border rounded-md ${
                notification.status === "unread" ? "bg-blue-100" : "bg-gray-100"
              }`}
            >
              <p>{notification.message}</p>
              <span className="text-sm text-gray-500">
                {notification.createdAt}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
