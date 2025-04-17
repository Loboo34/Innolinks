import axios from "axios";

const URL = import.meta.env.VITE_BACKEND_URL;

if (!URL) {
  throw new Error(
    "VUE_APP_API_URL is not defined in the environment variables."
  );
}


interface Order {
  orderNumber: string;
  description: string;
  status: string;
  createdAt: string;
  deadline: string;
  lastUpdate: string;
  progress: number;
  submittedDate: string;
  priority: string;
  updatedAt: string;
  user: {
    id: number;
    fullName: string;
    email: string;
  };
  service: {
    id: string;
    name: string;
    price: string;
  };
}

export const getOrders = async (): Promise<Order[]> => {
  try {
    const response = await axios.get(`${URL}/orders/`);
    return response.data as Order[];
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Unable to fetch orders. Please try again later.");
  }
};

export const getOrder = async (orderNumber: string): Promise<Order> => {
  try {
    const response = await axios.get(`${URL}/orders/${orderNumber}`);
    return response.data as Order;
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    throw new Error("Unable to fetch the order. Please try again later.");
  }
};

export const getOrdersWithUser = async (): Promise<Order[] | undefined> => {
  try {
    const response = await axios.get(`${URL}/orders/something`);

    return response.data as Order[];
  } catch (error) {
    console.error("Error fetching orders for user:", error);
    return undefined;
  }
};

export const getUserOrders = async (userId: number): Promise<Order[]> => {
  try {
    const response = await axios.get(`${URL}/orders/user/${userId}`);
    return response.data as Order[];
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw new Error("Unable to fetch user orders. Please try again later.");
  }
};

export const createOrder = async (
  newOrder: Omit<Order, "orderNumber">
): Promise<Order> => {
  try {
    const response = await axios.post(`${URL}/orders/create`, newOrder);
    return response.data as Order;
  } catch (error) {
    console.error("Error creating order:", error);
    throw new Error("Unable to create the order. Please try again later.");
  }
};

export const updateOrder = async (
  orderNumber: string,
  updatedOrder: Order
): Promise<Order> => {
  try {
    const response = await axios.put<Order>(
      `${URL}/orders/update/${orderNumber}`,
      updatedOrder
    );
    return response.data as Order;
  } catch (error) {
    console.error("Error updating order:", error);
    throw new Error("Unable to update the order. Please try again later.");
  }
};

export const deleteOrder = async (orderNumber: string): Promise<void> => {
  try {
    await axios.delete(`${URL}/orders/delete/${orderNumber}`);
  } catch (error) {
    console.error("Error deleting order:", error);
    throw new Error("Unable to delete the order. Please try again later.");
  }
};

export const changeOrderStatus = async (
  orderNumber: string,
  status: string
): Promise<{ message: string }> => {
  try {
    const response = await axios.put(`${URL}/orders/status/${orderNumber}`, {
      status,
    });
    return response.data as { message: string };
  } catch (error) {
    console.error("Error changing order status:", error);
    throw new Error(
      "Unable to change the order status. Please try again later."
    );
  }
};

export const fetchPending = async (): Promise<Order[]> => {
  try {
    const response = await fetch(`${URL}/orders/status/pending`);
    console.log(URL, 'dhfyfhiahuscisucsjocisuicjwiywoejihdehivhdcohjhgh');

    const data = await response.json();
    return data as Order[];
  } catch (error) {
    console.error("Error fetching orders by status:", error);
    throw new Error(
      "Unable to fetch orders with the specified status. Please try again later."
    );
  }
};

export const fetchApproved = async (): Promise<Order[]> => {
  try {
    console.log(URL);

    const response = await axios.get(`${URL}/orders/status/approved`);
    return response.data as Order[];
  } catch (error) {
    console.error("Error fetching approved orders:", error);
    throw new Error("Unable to fetch approved orders. Please try again later.");
  }
};

export const fetchUserApproved = async (userId: number): Promise<Order[]> => {
  try {
    const response = await axios.get(`${URL}/orders/${userId}/approved`);
    return response.data as Order[];
  } catch (error) {
    console.error("Error fetching user approved orders:", error);
    throw new Error(
      "Unable to fetch user approved orders. Please try again later."
    );
  }
}
export const fetchUserPending = async (userId: number): Promise<Order[]> => {
  try {
    const response = await axios.get(`${URL}/orders/user/${userId}/pending`);
    return response.data as Order[];
  } catch (error) {
    console.error("Error fetching user pending orders:", error);
    throw new Error(
      "Unable to fetch user pending orders. Please try again later."
    );
  }
}