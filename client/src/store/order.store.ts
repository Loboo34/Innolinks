import { create } from "zustand";
import {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  changeOrderStatus,
  getUserOrders,
  fetchPending,
  fetchApproved,
  fetchUserApproved,
  fetchUserPending
} from "../services/order";

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


interface OrdersStore {
  orders: Order[];
  loading: boolean;
  error: string | null;
  fetchOrders: () => Promise<void>;
  makeOrder: (newOrder: Omit<Order, "orderNumber">) => Promise<Order | null>;
  update: (
    orderNumber: string,
    updatedOrder: Order
  ) => Promise<Order | null>;
  delete: (orderNumber: string) => Promise<boolean>;
  changeStatus: (orderNumber: string, status: string) => Promise<boolean>;
  getOrdersUser: (userId: number) => Promise<Order[] | undefined>;
  getPending: () => Promise<Order[] | undefined>;
 // getUserOrders: (userId: number) => Promise<Order[] | undefined>;
  getApproved: () => Promise<Order[] | undefined>;
  userApproved: (userId: number) => Promise<Order[] | undefined>;
  userPending: (userId: number) => Promise<Order[] | undefined>;
}

const useOrdersStore = create<OrdersStore>((set) => ({
  orders: [],
  loading: false,
  error: null,

  fetchOrders: async () => {
    set({ loading: true, error: null });
    try {
      const orders = await getOrders();
      set({ orders: orders || [], loading: false });
      return;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch orders";
      console.error("Error fetching orders:", error);
      set({ error: errorMessage, loading: false });
    }
  },

  makeOrder: async (newOrder: Omit<Order, "orderNumber">) => {
    set({ loading: true, error: null });
    try {
      const createdOrder = await createOrder(newOrder);
      set((state) => ({
        orders: [...state.orders, createdOrder],
        loading: false,
      }));
      return createdOrder;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to create order";
      console.error("Error creating order:", error);
      set({ error: errorMessage, loading: false });
      return null;
    }
  },

  update: async (orderNumber: string, updatedOrder: Order) => {
    set({ loading: true, error: null });
    try {
      const updated = await updateOrder(orderNumber, updatedOrder);
      set((state) => ({
        orders: state.orders.map((order) =>
          order.orderNumber === orderNumber ? { ...order, ...updated } : order
        ),
        loading: false,
      }));
      return updated;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update order";
      console.error("Error updating order:", error);
      set({ error: errorMessage, loading: false });
      return null;
    }
  },

  delete: async (orderNumber: string) => {
    set({ loading: true, error: null });
    try {
      await deleteOrder(orderNumber);
      set((state) => ({
        orders: state.orders.filter(
          (order) => order.orderNumber !== orderNumber
        ),
        loading: false,
      }));
      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to delete order";
      console.error("Error deleting order:", error);
      set({ error: errorMessage, loading: false });
      return false;
    }
  },

  changeStatus: async (orderNumber: string, status: string) => {
    set({ loading: true, error: null });
    try {
      await changeOrderStatus(orderNumber, status);
      set((state) => ({
        orders: state.orders.map((order) =>
          order.orderNumber === orderNumber ? { ...order, status } : order
        ),
        loading: false,
      }));
      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to change order status";
      console.error("Error changing order status:", error);
      set({ error: errorMessage, loading: false });
      return false;
    }
  },

  getOrdersUser: async (userId: number) => {
    set({ loading: true, error: null });
    try {
      const ordersWithUser = await getUserOrders(userId);
      set({ orders: ordersWithUser || [], loading: false });
      console.log("Fetched orders with user information:", ordersWithUser);
      return ordersWithUser;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to fetch orders with user information";
      console.error("Error fetching orders with user:", error);
      set({ error: errorMessage, loading: false });
      return undefined;
    }
  },

  getPending: async () => {
    set({ loading: true, error: null });
    try {
      const ordersWithStatus = await fetchPending();
      set({ orders: ordersWithStatus || [], loading: false });
      console.log("Fetched orders with status:", ordersWithStatus);
      return ordersWithStatus;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to fetch orders with status";
      console.error("Error fetching orders with status:", error);
      set({ error: errorMessage, loading: false });
      return undefined;
    }
  },

 getApproved: async () => {
   set({ loading: true, error: null });
   try {
     const ordersWithStatus = await fetchApproved();
     set({ orders: ordersWithStatus || [], loading: false });
     console.log("Fetched orders with status:", ordersWithStatus);
     return ordersWithStatus;
   } catch (error) {
     const errorMessage =
       error instanceof Error
         ? error.message
         : "Failed to fetch orders with status";
     console.error("Error fetching orders with status:", error);
     set({ error: errorMessage, loading: false });
     return undefined;
   }
  },

  userApproved: async (userId: number) => {
    set({ loading: true, error: null });
    try {
      const ordersWithStatus = await fetchUserApproved(userId);
      set({ orders: ordersWithStatus || [], loading: false });
      console.log("Fetched orders with status:", ordersWithStatus);
      return ordersWithStatus;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to fetch orders with status";
      console.error("Error fetching orders with status:", error);
      set({ error: errorMessage, loading: false });
      return undefined;
    }
  },

  userPending: async (userId: number) => {
    set({ loading: true, error: null });
    try {
      const ordersWithStatus = await fetchUserPending(userId);
      set({ orders: ordersWithStatus || [], loading: false });
      console.log("Fetched orders with status:", ordersWithStatus);
      return ordersWithStatus;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to fetch orders with status";
      console.error("Error fetching orders with status:", error);
      set({ error: errorMessage, loading: false });
      return undefined;
    }
  },
}));

export default useOrdersStore;
