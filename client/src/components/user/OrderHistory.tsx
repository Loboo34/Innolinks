import  { useEffect, useState } from "react";
import {
  Search,
  Filter,
  Clock,
  // CheckCircle,
  XCircle,
  Download,
  MessageSquare,
  Eye,
  FileText,
  Calendar,
} from "lucide-react";
import { useAuthContext } from "../../hooks/useAuthContext";
import useOrdersStore from "../../store/order.store";

interface Service {
  id: string;
  name: string;
  price: string;
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

const OrderHistory = () => {
  const {getOrdersUser} = useOrdersStore()
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState("all");
  //const [orders, setOrders] = useState<Order[]>([]);
  const orders = useOrdersStore((state) => state.orders); // Access orders from the store
  const { user } = useAuthContext();
  const userId = user ? user.id : "";
  //console.log("id", userId);


  const fetchOrders = async () => {
   
    if (!userId) {
      console.error("User ID is not available");
      return;
    }
    try {
      // Fetch user-specific orders
      if (getOrdersUser   ) {
        const userOrders = await getOrdersUser    (userId);
        if (userOrders) {
          // Update the store's orders with fetched user orders
          useOrdersStore.setState({ orders: userOrders });
        } else {
          console.error("No orders found for the user");
        }
      } else {
        console.error("getOrdersUser     is not defined");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleCancelOrder = async (orderNumber: string) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/orders/delete/${orderNumber}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      console.log(data);
      fetchOrders();
    } catch (error) {
      console.error(error);
    }
  };

  // Mock data for orders
  // const orders = [
  //   {
  //     id: "ORD-2025-001",
  //     service: "Web Development",
  //     description: "E-commerce website with payment integration",
  //     status: "in_progress",
  //    createdAt: "2025-03-15",
  //     deadline: "2025-04-15",
  //     lastUpdate: "2025-03-20",
  //     price: 1299.99,
  //     progress: 65
  //   },
  //   {
  //     id: "ORD-2025-002",
  //     service: "Mobile App Development",
  //     description: "iOS fitness tracking application",
  //     status: "pending",
  //    createdAt: "2025-03-14",
  //     deadline: "2025-04-10",
  //     lastUpdate: "2025-03-14",
  //     price: 1899.99,
  //     progress: 0
  //   },
  //   {
  //     id: "ORD-2025-003",
  //     service: "UI/UX Design",
  //     description: "Website redesign and branding",
  //     status: "completed",
  //    createdAt: "2025-03-10",
  //     deadline: "2025-03-25",
  //     lastUpdate: "2025-03-25",
  //     price: 799.99,
  //     progress: 100
  //   },
  //   {
  //     id: "ORD-2025-004",
  //     service: "Digital Marketing",
  //     description: "SEO optimization and content strategy",
  //     status: "cancelled",
  //    createdAt: "2025-03-05",
  //     deadline: "2025-04-05",
  //     lastUpdate: "2025-03-07",
  //     price: 599.99,
  //     progress: 0
  //   }
  // ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatStatus = (status: string) => {
    return status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Filter orders based on search term, status, and date range
  const filteredOrders = orders.filter((order: Order) => {
    // Filter by search term
    const matchesSearch =
      (order.orderNumber && order.orderNumber.includes(searchTerm)) ||
      (order.service &&
        order.service.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (order.description &&
        order.description.toLowerCase().includes(searchTerm.toLowerCase()));

    // Filter by status
    const matchesStatus =
      selectedStatus === "all" || order.status === selectedStatus;

    // Filter by date range (simplified for demo)
    let matchesDateRange = true;
    if (dateRange !== "all") {
      const createdAt = new Date(order.createdAt);
      const now = new Date();

      if (dateRange === "month") {
        const monthAgo = new Date();
        monthAgo.setMonth(now.getMonth() - 1);
        matchesDateRange = createdAt >= monthAgo;
      } else if (dateRange === "week") {
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        matchesDateRange = createdAt >= weekAgo;
      }
    }

    return matchesSearch && matchesStatus && matchesDateRange;
  });

  useEffect(() => {
    fetchOrders();
  }, [userId]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Order History</h2>
        <button className="bg-[#106EBE] hover:bg-[#0FFCBE] text-white hover:text-gray-900 px-4 py-2 rounded-lg transition-colors duration-300 flex items-center space-x-2">
          <Download className="h-5 w-5" />
          <span>Export Orders</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
        {/* Search */}
        <div className="relative w-full sm:w-96">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#106EBE] focus:border-[#106EBE]"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4 w-full sm:w-auto">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#106EBE] focus:border-[#106EBE]"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#106EBE] focus:border-[#106EBE]"
          >
            <option value="all">All Time</option>
            <option value="month">Last Month</option>
            <option value="week">Last Week</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            <Filter className="h-5 w-5" />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Progress
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dates
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr key={order.orderNumber} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">
                    {order.orderNumber}
                  </div>
                  <div className="text-sm text-gray-500">
                    {order.service.name}
                  </div>
                  <div className="text-sm text-gray-500 truncate max-w-xs">
                    {order.description}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {formatStatus(order.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-[#106EBE] h-2.5 rounded-full"
                      style={{ width: `${order.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">
                    {order.progress}%
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>
                        Ordered:{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span>
                        Due: {new Date(order.deadline).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${order.service.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button
                      className="p-1 hover:bg-blue-100 rounded"
                      title="View Details"
                    >
                      <Eye className="h-5 w-5 text-blue-600" />
                    </button>
                    <button
                      className="p-1 hover:bg-purple-100 rounded"
                      title="Message Support"
                    >
                      <MessageSquare className="h-5 w-5 text-purple-600" />
                    </button>
                    {order.status === "completed" && (
                      <button
                        className="p-1 hover:bg-green-100 rounded"
                        title="Download Files"
                      >
                        <FileText className="h-5 w-5 text-green-600" />
                      </button>
                    )}
                    {order.status === "pending" && (
                      <button
                        className="p-1 hover:bg-red-100 rounded"
                        title="Cancel Order"
                        onClick={() => handleCancelOrder(order.orderNumber)}
                      >
                        <XCircle className="h-5 w-5 text-red-600" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">
            Showing {filteredOrders.length} of {orders.length} orders
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 rounded border border-gray-300 text-sm hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1 rounded bg-[#106EBE] text-white text-sm">
            1
          </button>
          <button className="px-3 py-1 rounded border border-gray-300 text-sm hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
