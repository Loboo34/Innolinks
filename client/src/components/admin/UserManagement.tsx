import React, { useEffect, useState } from 'react';
import { 
  Search, 
  Filter,
  MoreVertical,
  Check,
  X,
  Flag,
  Eye,
  Lock,
  Unlock,
  AlertTriangle
} from 'lucide-react';


interface User {
  id: number;
  fullName: string;
  email: string;
  accountStatus: string;
  createdAt: string;
  lastLogin: string;
  type: string;
  isFlagged: boolean;
}

const UserManagement = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [users, setUsers] = useState<User[]>([]);

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
    console.log(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // const users = [
  //   {
  //     id: 1,
  //     name: "Sarah Johnson",
  //     email: "sarah.j@example.com",
  //     status: "pending",
  //     registeredDate: "2025-03-15",
  //     lastLogin: "2025-03-15 14:30",
  //     type: "client",
  //     isFlagged: false
  //   },
  //   {
  //     id: 2,
  //     name: "Michael Chen",
  //     email: "m.chen@example.com",
  //     status: "active",
  //     registeredDate: "2025-03-14",
  //     lastLogin: "2025-03-15 16:45",
  //     type: "client",
  //     isFlagged: true
  //   },
  //   {
  //     id: 3,
  //     name: "Emma Wilson",
  //     email: "emma.w@example.com",
  //     status: "suspended",
  //     registeredDate: "2025-03-13",
  //     lastLogin: "2025-03-14 09:15",
  //     type: "client",
  //     isFlagged: false
  //   }
  // ];
const handleChangeStatus = async (id: number, status: string) => {
    const res = await fetch(`http://localhost:3000/api/users/status/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ accountStatus: status }),
    });
    const data = await res.json();
    console.log(data);
    fetchUsers();
  }




  const getStatusColor = (accountStatus: string) => {
    switch (accountStatus) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'flagged':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        <button className="bg-[#106EBE] hover:bg-[#0FFCBE] text-white hover:text-gray-900 px-4 py-2 rounded-lg transition-colors duration-300">
          Export Users
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
        {/* Search */}
        <div className="relative w-full sm:w-96">
          <input
            type="text"
            placeholder="Search users..."
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
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            <Filter className="h-5 w-5" />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Registered Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Login
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users?.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={`https://ui-avatars.com/api/?name=${user.fullName}&background=random`}
                        alt=""
                      />
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">
                          {user.fullName}
                        </div>
                        {user.isFlagged && (
                          <AlertTriangle className="ml-2 h-4 w-4 text-red-500" />
                        )}
                      </div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.accountStatus)}`}>
                    {user.accountStatus ? user.accountStatus.charAt(0).toUpperCase() + user.accountStatus.slice(1) : ''}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(user.createdAt).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(user.lastLogin).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button className="p-1 hover:bg-gray-100 rounded" title="View Profile">
                      <Eye className="h-5 w-5 text-gray-600" />
                    </button>
                    {user.accountStatus === 'pending' && (
                      <>
                        <button className="p-1 hover:bg-green-100 rounded" title="Approve" onClick={() => handleChangeStatus(user.id, 'active')}>
                          <Check className="h-5 w-5 text-green-600" />
                        </button>
                        <button className="p-1 hover:bg-red-100 rounded" title="Reject" onClick={() => handleChangeStatus(user.id, 'rejected')}>
                          <X className="h-5 w-5 text-red-600" />
                        </button>
                      </>
                    )}
                    {user.accountStatus === 'active' && (
                      <button className="p-1 hover:bg-red-100 rounded" title="Suspend" onClick={() => handleChangeStatus(user.id, 'suspended')}>
                        <Lock className="h-5 w-5 text-red-600" />
                      </button>
                    )}
                    {user.accountStatus === 'suspended' && (
                      <button className="p-1 hover:bg-green-100 rounded" title="Reactivate" onClick={() => handleChangeStatus(user.id, 'active')}>
                        <Unlock className="h-5 w-5 text-green-600" />
                      </button>
                    )}
                    <button className="p-1 hover:bg-yellow-100 rounded" title="Flag Account" onClick={() => handleChangeStatus(user.id, 'flagged')}>
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

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">
            Showing 1 to 10 of 97 results
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

export default UserManagement;