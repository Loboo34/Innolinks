import React from 'react';
import { 
  Home,
  Users, 
  CreditCard, 
  Briefcase, 
  MessageSquare, 
  ShoppingCart, 
  BarChart2, 
  Bell,
  Settings
} from 'lucide-react';

interface AdminSidebarProps {
  isOpen: boolean;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  isOpen, 
  activeSection, 
  onSectionChange 
}) => {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'payments', label: 'Payment Processing', icon: CreditCard },
    { id: 'services', label: 'Service Requests', icon: Briefcase },
    { id: 'serviceManagement', label: 'Manage Services', icon: Settings },
    { id: 'communications', label: 'Communication', icon: MessageSquare },
    { id: 'orders', label: 'Order Management', icon: ShoppingCart },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-white shadow-lg overflow-y-auto">
      <div className="p-4">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeSection === item.id
                  ? 'bg-[#106EBE] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;