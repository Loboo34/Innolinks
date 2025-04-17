import { useEffect, useState } from "react";
import {
  Search,
  Filter,
  Clock,
  CheckCircle,
  XCircle,
  //AlertTriangle,
  MessageSquare,
  Flag,
  MoreVertical,
  Calendar,
  Download,
} from "lucide-react";
import useOrdersStore from "../../store/order.store";
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

const ServiceRequests = () => {
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  //const [requests, setRequests] = useState<Request[]>([]);
  const { getPending, changeStatus } = useOrdersStore();
  const orders: Order[] = useOrdersStore((state) => state.orders); // Get orders from the store
  // Fetch requests from the server

  useEffect(() => {
    getPending();
  }, [getPending]);

  // const requests = [
  //   {
  //     id: "SR-2025-001",
  //     service: "Web Development",
  //     client: "Sarah Johnson",
  //     email: "sarah.j@example.com",
  //     description: "E-commerce website with payment integration",
  //     status: "pending",
  //     priority: "high",
  //     submittedDate: "2025-03-15 09:30",
  //     deadline: "2025-03-17",
  //     lastUpdated: "2025-03-15 14:30",
  //     assignedTo: "John Developer"
  //   },
  //   {
  //     id: "SR-2025-002",
  //     service: "Mobile App Development",
  //     client: "Michael Chen",
  //     email: "m.chen@example.com",
  //     description: "iOS fitness tracking application",
  //     status: "in_progress",
  //     priority: "medium",
  //     submittedDate: "2025-03-14 15:45",
  //     deadline: "2025-03-20",
  //     lastUpdated: "2025-03-15 11:20",
  //     assignedTo: "Emma Developer"
  //   },
  //   {
  //     id: "SR-2025-003",
  //     service: "UI/UX Design",
  //     client: "Emma Wilson",
  //     email: "emma.w@example.com",
  //     description: "Website redesign and branding",
  //     status: "completed",
  //     priority: "low",
  //     submittedDate: "2025-03-13 11:00",
  //     deadline: "2025-03-16",
  //     lastUpdated: "2025-03-15 09:45",
  //     assignedTo: "Alex Designer"
  //   }
  // ];

  // const orderNumber = requests.map((request) => request.orderNumber);
  // console.log("num",orderNumber);

  const handleChangeStatus = async (
    orderNumber: string,
    status: string
  ): Promise<void> => {
    try {
      const success = await changeStatus(orderNumber, status);
      if (success) {
       
        await getPending();
      }
      else {
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
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-orange-100 text-orange-800";
      case "low":
        return "bg-green-100 text-green-800";
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Service Requests</h2>
        <button className="bg-[#106EBE] hover:bg-[#0FFCBE] text-white hover:text-gray-900 px-4 py-2 rounded-lg transition-colors duration-300 flex items-center space-x-2">
          <Download className="h-5 w-5" />
          <span>Export Requests</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
        {/* Search */}
        <div className="relative w-full sm:w-96">
          <input
            type="text"
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#106EBE] focus:border-[#106EBE]"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4 w-full sm:w-auto">
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#106EBE] focus:border-[#106EBE]"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#106EBE] focus:border-[#106EBE]"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            <Filter className="h-5 w-5" />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Requests Table */}
      {orders.length > 0 ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Request Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timeline
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((request) => (
                <tr key={request.orderNumber} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {request.orderNumber}
                    </div>
                    <div className="text-sm text-gray-500">
                      {request.service?.name || 'No service specified'}
                    </div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">
                      {request.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={`https://ui-avatars.com/api/?name=${request.user?.fullName || 'User'}&background=random`}
                          alt=""
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {request.user?.fullName || 'Unknown User'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {request.user?.email || 'No email'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(
                        request.priority
                      )}`}
                    >
                      {request.priority
                        ? request.priority.charAt(0).toUpperCase() +
                          request.priority.slice(1)
                        : ""}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        request.status
                      )}`}
                    >
                      {formatStatus(request.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>
                          Due: {new Date(request.deadline).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span>
                          Updated:{" "}
                          {new Date(request.updatedAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        className="p-1 hover:bg-blue-100 rounded"
                        title="Message Client"
                      >
                        <MessageSquare className="h-5 w-5 text-blue-600" />
                      </button>
                      {request.status === "pending" && (
                        <>
                          <button
                            className="p-1 hover:bg-green-100 rounded"
                            title="Approve"
                            onClick={() => {
                              handleChangeStatus(
                                request.orderNumber,
                                "approved"
                              );
                            }}
                          >
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          </button>
                          <button
                            className="p-1 hover:bg-red-100 rounded"
                            title="Reject"
                            onClick={() => {
                              handleChangeStatus(
                                request.orderNumber,
                                "rejected"
                              );
                            }}
                          >
                            <XCircle className="h-5 w-5 text-red-600" />
                          </button>
                        </>
                      )}
                      <button
                        className="p-1 hover:bg-yellow-100 rounded"
                        title="Flag Request"
                        onClick={() => {
                          handleChangeStatus(request.orderNumber, "flagged");
                        }}
                      >
                        <Flag className="h-5 w-5 text-yellow-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <MoreVertical className="h-5 w-5 text-gray-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 text-gray-500 text-center">No requests found</div>
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">
            Showing 1 to 10 of 45 results
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

export default ServiceRequests;
