import axios from "axios";
const APi = import.meta.env.VITE_BACKEND_URL;

export const getNotifications = async () => {
 try{
    const response = await axios.get(`${APi}/notifications/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.status !== 200) {
      throw new Error("Failed to fetch notifications. Please try again.");
    }
    if (!response.data) {
      throw new Error("No data returned from the server.");
    }
    return response.data;
 }
    catch (error) {
        console.error(error, "Error fetching notifications");
    }}

export const markAsRead = async (notificationId: string) => {
    try {
        const response = await axios.put(`${APi}/notifications/read/${notificationId}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        });
        if (response.status !== 200) {
            throw new Error("Failed to mark notification as read. Please try again.");
        }
        if (!response.data) {
            throw new Error("No data returned from the server.");
        }
        return response.data;
    } catch (error) {
        console.error(error, "Error marking notification as read");
    }
};

export const getUserNotifications = async (userId: number) => {
    try {
        const response = await axios.get(`${APi}/notifications/${userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        if (response.status !== 200) {
            throw new Error("Failed to fetch user notifications. Please try again.");
        }
        if (!response.data) {
            throw new Error("No data returned from the server.");
        }
        return response.data;
    } catch (error) {
        console.error(error, "Error fetching user notifications");
    }
}

export const getUnread = async (userId: number) => {
    try {
        const response = await axios.get(`${APi}/notifications/unread/${userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        if (response.status !== 200) {
            throw new Error("Failed to fetch unread notifications. Please try again.");
        }
        if (!response.data) {
            throw new Error("No data returned from the server.");
        }
        return response.data;
    } catch (error) {
        console.error(error, "Error fetching unread notifications");
    }
}