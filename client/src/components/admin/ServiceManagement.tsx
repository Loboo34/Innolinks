import { useEffect, useState } from "react";
import {
  Search,
  Filter,
  Edit,
  Trash2,
  Plus,
  Globe,
  Code2,
  Smartphone,
  Palette,
  Megaphone,
  Headphones,
  AlertTriangle,
  //Check,
  X,
} from "lucide-react";
import useServicesStore from "../../store/services.store";
interface Service {
  id: number;
  name: string;
  description: string;
  category: string;
  price: string;
  image?: string;
  icon?: string;
  isActive?: boolean;
}
const ServiceManagement = () => {
  const { fetchServices, createService, updateService, deleteService } = useServicesStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentService, setCurrentService] = useState<Service>();
  const services = useServicesStore((state) => state.services);

  // Form state for add/edit
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "web",
    price: "",
    image: "",
    icon: "Globe",
    isActive: true,
  });

  // // Mock data for services
  // const [services, setServices] = useState([
  //   {
  //     id: 1,
  //     title: "Web Development",
  //     description: "Custom, responsive websites that engage visitors and drive conversions. From corporate sites to e-commerce platforms, we build it all.",
  //     category: "web",
  //     price: 1299.99,
  //     image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
  //     icon: "Globe",
  //     isActive: true
  //   },
  //   {
  //     id: 2,
  //     title: "Software Development",
  //     description: "Scalable, secure, and efficient software solutions tailored to your business needs. From enterprise applications to cloud solutions.",
  //     category: "software",
  //     price: 2499.99,
  //     image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000",
  //     icon: "Code2",
  //     isActive: true
  //   },
  //   {
  //     id: 3,
  //     title: "Mobile App Development",
  //     description: "Native and cross-platform mobile applications that provide seamless user experiences across all devices.",
  //     category: "mobile",
  //     price: 1899.99,
  //     image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1000",
  //     icon: "Smartphone",
  //     isActive: true
  //   },
  //   {
  //     id: 4,
  //     title: "UI/UX Design",
  //     description: "User-centered design that combines aesthetics with functionality to create intuitive and engaging digital experiences.",
  //     category: "design",
  //     price: 799.99,
  //     image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1000",
  //     icon: "Palette",
  //     isActive: true
  //   },
  //   {
  //     id: 5,
  //     title: "Digital Marketing",
  //     description: "Strategic digital marketing solutions that boost your online presence and drive sustainable business growth.",
  //     category: "marketing",
  //     price: 599.99,
  //     image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&q=80&w=1000",
  //     icon: "Megaphone",
  //     isActive: true
  //   },
  //   {
  //     id: 6,
  //     title: "IT Consultancy",
  //     description: "Expert guidance and strategic planning to help you leverage technology for maximum business impact.",
  //     category: "consulting",
  //     price: 899.99,
  //     image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=1000",
  //     icon: "Headphones",
  //     isActive: true
  //   }
  // ]);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Globe":
        return <Globe className="h-6 w-6 text-[#106EBE]" />;
      case "Code2":
        return <Code2 className="h-6 w-6 text-[#106EBE]" />;
      case "Smartphone":
        return <Smartphone className="h-6 w-6 text-[#106EBE]" />;
      case "Palette":
        return <Palette className="h-6 w-6 text-[#106EBE]" />;
      case "Megaphone":
        return <Megaphone className="h-6 w-6 text-[#106EBE]" />;
      case "Headphones":
        return <Headphones className="h-6 w-6 text-[#106EBE]" />;
      default:
        return <Globe className="h-6 w-6 text-[#106EBE]" />;
    }
  };

  const handleAddService = () => {
    setShowAddModal(true);
  };

  const submitAddService = async () => {
    try {
      await createService(formData);
      setShowAddModal(false);
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  const handleEditService = async (service: Service) => {
    setCurrentService(service);
    const editFormData = await fetch(
      "http://localhost:3000/api/services/" + service.id
    );
    const editService = await editFormData.json();
    setFormData({
      name: editService.name,
      description: editService.description,
      category: editService.category,
      price: editService.price,
      image: editService.image,
      icon: formData.icon, // Retain the current icon value
      isActive: formData.isActive, // Retain the current isActive value
    });
    console.log(editService);
    // setFormData({

    setShowEditModal(true);
  };

  const handleDeleteService = (service: Service) => {
    setCurrentService(service);
    setShowDeleteModal(true);
  };

  const submitEditService = async () => {
    if (!currentService) return;
try{
   await updateService(currentService.id, {
     ...currentService,
     ...formData,
   });
   setShowEditModal(false);
} catch (error) {
      console.error("Error updating service:", error);
    }
  };

  const confirmDeleteService = async () => {
    if (!currentService) return;
    try {
      await deleteService(currentService.id);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting service:", error);
    }
    setCurrentService(undefined);
    
  };

  const filteredServices = Array.isArray(services)
    ? services.filter(
        (service) =>
          service.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          service.category?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Service Management</h2>
        <button
          onClick={handleAddService}
          className="bg-[#106EBE] hover:bg-[#0FFCBE] text-white hover:text-gray-900 px-4 py-2 rounded-lg transition-colors duration-300 flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
        {/* Search */}
        <div className="relative w-full sm:w-96">
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#106EBE] focus:border-[#106EBE]"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4 w-full sm:w-auto">
          <select className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#106EBE] focus:border-[#106EBE]">
            <option value="all">All Categories</option>
            <option value="web">Web Development</option>
            <option value="software">Software Development</option>
            <option value="mobile">Mobile Development</option>
            <option value="design">UI/UX Design</option>
            <option value="marketing">Digital Marketing</option>
            <option value="consulting">IT Consultancy</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            <Filter className="h-5 w-5" />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="h-48 overflow-hidden relative">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover"
              />
              {!service.isActive && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm font-semibold">
                    Inactive
                  </span>
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  {getIconComponent(service.icon)}
                  <h3 className="text-xl font-bold text-gray-900 ml-3">
                    {service.name}
                  </h3>
                </div>
                <span className="text-[#106EBE] font-semibold">
                  ${Number(service.price).toFixed(2)}
                </span>
              </div>
              <p className="text-gray-600 mb-6 line-clamp-3">
                {service.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                  {service.category
                    ? service.category.charAt(0).toUpperCase() +
                      service.category.slice(1)
                    : ""}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditService(service)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                    title="Edit Service"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteService(service)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                    title="Delete Service"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Service Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Add New Service
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service Title
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#106EBE] focus:border-[#106EBE]"
                  placeholder="e.g., Web Development"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#106EBE] focus:border-[#106EBE]"
                  placeholder="Describe the service..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#106EBE] focus:border-[#106EBE]"
                  >
                    <option value="web">Web Development</option>
                    <option value="software">Software Development</option>
                    <option value="mobile">Mobile Development</option>
                    <option value="design">UI/UX Design</option>
                    <option value="marketing">Digital Marketing</option>
                    <option value="consulting">IT Consultancy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#106EBE] focus:border-[#106EBE]"
                    placeholder="e.g., 1299.99"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#106EBE] focus:border-[#106EBE]"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Icon
                </label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData({...formData, icon: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#106EBE] focus:border-[#106EBE]"
                >
                  <option value="Globe">Web (Globe)</option>
                  <option value="Code2">Code</option>
                  <option value="Smartphone">Mobile</option>
                  <option value="Palette">Design</option>
                  <option value="Megaphone">Marketing</option>
                  <option value="Headphones">Support</option>
                </select>
              </div> */}

              {/* <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                  className="h-4 w-4 text-[#106EBE] focus:ring-[#106EBE] border-gray-300 rounded"
                />
                <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                  Active (available for users to order)
                </label>
              </div> */}
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={submitAddService}
                className="px-4 py-2 bg-[#106EBE] text-white rounded-lg hover:bg-[#0FFCBE] hover:text-gray-900"
              >
                Add Service
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Service Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Edit Service
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service Title
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#106EBE] focus:border-[#106EBE]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#106EBE] focus:border-[#106EBE]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#106EBE] focus:border-[#106EBE]"
                  >
                    <option value="web">Web Development</option>
                    <option value="software">Software Development</option>
                    <option value="mobile">Mobile Development</option>
                    <option value="design">UI/UX Design</option>
                    <option value="marketing">Digital Marketing</option>
                    <option value="consulting">IT Consultancy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#106EBE] focus:border-[#106EBE]"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#106EBE] focus:border-[#106EBE]"
                />
              </div>
              {/*               
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Icon
                </label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData({...formData, icon: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#106EBE] focus:border-[#106EBE]"
                >
                  <option value="Globe">Web (Globe)</option>
                  <option value="Code2">Code</option>
                  <option value="Smartphone">Mobile</option>
                  <option value="Palette">Design</option>
                  <option value="Megaphone">Marketing</option>
                  <option value="Headphones">Support</option>
                </select>
              </div>
               */}
              {/*                
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActiveEdit"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                  className="h-4 w-4 text-[#106EBE] focus:ring-[#106EBE] border-gray-300 rounded"
                />
                <label htmlFor="isActiveEdit" className="ml-2 block text-sm text-gray-900">
                  Active (available for users to order)
                </label>
              </div> */}
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={submitEditService}
                className="px-4 py-2 bg-[#106EBE] text-white rounded-lg hover:bg-[#0FFCBE] hover:text-gray-900"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && currentService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-red-100 p-3 rounded-full">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
              Delete Service
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to delete "{currentService.name}"? This
              action cannot be undone.
            </p>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center"
              >
                <X className="h-5 w-5 mr-2" />
                Cancel
              </button>
              <button
                onClick={confirmDeleteService}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center"
              >
                <Trash2 className="h-5 w-5 mr-2" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceManagement;
