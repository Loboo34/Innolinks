import React, { useEffect, useState } from "react";
import {
  //Home,
  Users,
  CreditCard,
  Briefcase,
  MessageSquare,
  // BarChart2,
  Bell,
  Settings,
  ChevronDown,
  Menu,
  X,
  Search,
  // Filter,
  User,
  LogOut,
} from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import UserManagement from "./UserManagement";
import PaymentProcessing from "./PaymentProcessing";
import ServiceRequests from "./ServiceRequests";
import ServiceManagement from "./ServiceManagement";
import CommunicationCenter from "./CommunicationCenter";
import OrderManagement from "./OrderManagement";
import Analytics from "./Analytics";
import Notifications from "./Notifications";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";
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

const AdminDashboard = () => {
  const { fetchOrders } = useOrdersStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuthContext();
  const userId = user?.id;
  const { logout } = useLogout();
  const orders = useOrdersStore((state) => state.orders);

  const [users, setUsers] = useState<
    { id: number; name: string; email: string }[]
  >([]);
  const [notifications, setNotifications] = useState<
    { id: number; message: string; status: string; createdAt: string }[]
  >([]);

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:3000/api/users/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await res.json();
    setUsers(data);
    //  console.log(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchNotifications = async () => {
    const res = await fetch(
      `http://localhost:3000/api/notifications/unread/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const data = await res.json();
    console.log("not", data);
    setNotifications(data);
  };

  useEffect(() => {
    if (userId) {
      fetchNotifications();
    }
  }, [userId]); // Fetch notifications when userId changes, e.g., on login or logout

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]); // Fetch orders when the component mounts or when fetchOrders changes

  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeSection) {
      case "users":
        return <UserManagement />;
      case "payments":
        return <PaymentProcessing />;
      case "services":
        return <ServiceRequests />;
      case "serviceManagement":
        return <ServiceManagement />;
      case "communications":
        return <CommunicationCenter />;
      case "orders":
        return <OrderManagement />;
      case "analytics":
        return <Analytics />;
      case "notifications":
        return <Notifications />;
      default:
        return <Overview users={users} orders={orders} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side */}
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {isSidebarOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
              <h1 className="ml-4 text-xl font-bold text-gray-800">
                Admin Dashboard
              </h1>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#106EBE] focus:border-[#106EBE]"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <button
                className="relative p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => {
                  navigate("/notifications");
                }}
              >
                <Bell className="h-6 w-6" />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                    {notifications.length}
                  </span>
                )}
              </button>
              {/* <button className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none">
                <Settings className="h-6 w-6" />
              </button> */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-3 focus:outline-none"
                >
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=48&h=48&q=80"
                    alt="User"
                    className="h-8 w-8 rounded-full"
                  />
                  <div className="hidden md:block text-left">
                    <span className="text-sm font-semibold text-gray-700">
                      {user?.fullName}
                    </span>
                    <span className="block text-xs text-gray-500">
                      {user?.email}
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
                    <a
                      href="#profile"
                      className=" px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <User className="h-4 w-4 mr-3" />
                      Profile
                    </a>
                    <a
                      href="#settings"
                      className=" px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <Settings className="h-4 w-4 mr-3" />
                      Settings
                    </a>
                    <hr className="my-2" />
                    <a
                      href="#logout"
                      className="px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                      onClick={() => {
                        logout();
                        navigate("/");
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Logout
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <AdminSidebar
        isOpen={isSidebarOpen}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* Main Content */}
      <div className={`pt-16 ${isSidebarOpen ? "md:ml-64" : ""}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

// Overview Component
const Overview = ({
  users,
  orders,
}: {
  users: { id: number; name: string; email: string }[];
  orders: Order[];
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Users</h3>
              <p className="text-3xl font-bold text-blue-600">{users.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <CreditCard className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Revenue</h3>
              <p className="text-2xl font-bold text-green-600">Ksh12,345</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <Briefcase className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Orders</h3>
              <p className="text-3xl font-bold text-purple-600">
                {orders.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full">
              <MessageSquare className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">Tickets</h3>
              <p className="text-3xl font-bold text-yellow-600">23</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Activity
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {/* Activity items would go here */}
            <p className="text-gray-600">Activity feed coming soon...</p>
          </div>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Analytics Overview
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {/* Analytics content would go here */}
            <p className="text-gray-600">Analytics dashboard coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
