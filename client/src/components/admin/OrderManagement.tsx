import { useEffect, useState } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  Check,
  X,
  // AlertTriangle,
} from "lucide-react";
import useOrdersStore from "../../store/order.store";

interface Order {
  orderNumber: string;
  status: string;
  createdAt: string;
  user: {
    id: number;
    fullName: string;
    email: string;
  };
}

const OrderManagement = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  // const [orders, setOrders] = useState<Order[]>([]);
  const { changeStatus, getApproved } =
    useOrdersStore();
  const orders: Order[] = useOrdersStore((state) => state.orders);

  useEffect(() => {
    if (getApproved) {
      getApproved();
    }
  }, [getApproved]);

  const handleChangeStatus = async (orderNumber: string, status: string) => {
    try {
      const success = await changeStatus(orderNumber, status);
      if (success) {
        // Optionally, you can refetch the orders to reflect the updated status
        if (getApproved) {
          await getApproved();
        }
      } else {
        console.error("Failed to change order status");
      }
    } catch (error) {
      console.error("Error changing order status:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "canceled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>
        <button className="bg-[#106EBE] hover:bg-[#0FFCBE] text-white hover:text-gray-900 px-4 py-2 rounded-lg transition-colors duration-300">
          Export Orders
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
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="canceled">Canceled</option>
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
                Order Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders?.map((order) => (
              <tr key={order.orderNumber} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {order.orderNumber}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status
                      ? order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)
                      : ""}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.createdAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {order.user?.fullName || "N/A"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.user?.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    {order.status === "approved" && (
                      <>
                        <button
                          className="p-1 hover:bg-green-100 rounded"
                          title="Complete"
                          onClick={() =>
                            handleChangeStatus(order.orderNumber, "completed")
                          }
                        >
                          <Check className="h-5 w-5 text-green-600" />
                        </button>
                        <button
                          className="p-1 hover:bg-red-100 rounded"
                          title="Cancel"
                          onClick={() =>
                            handleChangeStatus(order.orderNumber, "canceled")
                          }
                        >
                          <X className="h-5 w-5 text-red-600" />
                        </button>
                      </>
                    )}
                    <button className="p-1 hover:bg-green-100 rounded">
                      <MoreVertical className="h-5 w-5 text-gray-600" />
                    </button>
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
            Showing 1 to 10 of {orders.length} results
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
            2
          </button>
          <button className="px-3 py-1 rounded border border-gray-300 text-sm hover:bg-gray-50">
            3
          </button>
          <button className="px-3 py-1 rounded border border-gray-300 text-sm hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
