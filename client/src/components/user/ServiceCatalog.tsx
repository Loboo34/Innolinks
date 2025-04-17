import React, { useEffect, useState } from "react";
import {
  Search,
  ShoppingCart,
  Globe,
  Code2,
  Smartphone,
  Palette,
  Megaphone,
  Headphones,
  ArrowRight,
  Star,
} from "lucide-react";

interface ServiceCatalogProps {
  onOrderService: (service: Service) => void;
}

interface Service {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
  isActive: boolean;
  rating: number;
  reviewCount: number;
  features: string[];
}

const ServiceCatalog: React.FC<ServiceCatalogProps> = ({ onOrderService }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showServiceDetails, setShowServiceDetails] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [services, setServices] = useState<Service[]>([]);

  // Fetch services from API on mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/services/");
        if (!response.ok) {
          throw new Error("Error fetching services");
        }
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

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

  const handleViewService = (service: Service) => {
    setSelectedService(service);
    setShowServiceDetails(true);
  };

  const handleCloseDetails = () => {
    setShowServiceDetails(false);
    setSelectedService(null);
  };

  // Fetch a single service by id (if needed)
  const fetchService = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/services/${id}`);
      if (!response.ok) throw new Error("Error fetching service");
      const data = await response.json();
      setSelectedService(data);
      setShowServiceDetails(true);
    } catch (error) {
      console.error("Error fetching service:", error);
    }
  };

  const handleOrderNow = (service: Service) => {
    onOrderService(service);
    setShowServiceDetails(false);
  };

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: "all", name: "All Services" },
    { id: "web", name: "Web Development" },
    { id: "software", name: "Software Development" },
    { id: "mobile", name: "Mobile Apps" },
    { id: "design", name: "UI/UX Design" },
    { id: "marketing", name: "Digital Marketing" },
    { id: "consulting", name: "IT Consultancy" },
  ];

  // Render stars for ratings
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className="h-4 w-4 fill-yellow-400 text-yellow-400"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="relative">
          <Star className="h-4 w-4 text-gray-300" />
          <Star
            className="absolute top-0 left-0 h-4 w-4 fill-yellow-400 text-yellow-400 overflow-hidden"
            style={{ clipPath: "inset(0 50% 0 0)" }}
          />
        </span>
      );
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }

    return stars;
  };

  // Optionally refetch service details if needed on change
  useEffect(() => {
    if (selectedService) {
      // If you need to refresh details, uncomment:
      // fetchService(selectedService.id);
    }
  }, [selectedService]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Browse Services</h2>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#106EBE] focus:border-[#106EBE]"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <div className="flex flex-wrap justify-center gap-2 w-full md:w-auto">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? "bg-[#106EBE] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center mb-2">
                <h3 className="text-xl font-bold text-gray-900 ml-3">
                  {service.name}
                </h3>
              </div>
              <div className="flex items-center mb-4">
                <div className="flex">{renderStars(service.rating)}</div>
                <span className="ml-2 text-sm text-gray-600">
                  ({service.rating}) {service.reviewCount} reviews
                </span>
              </div>
              <p className="text-gray-600 mb-6 line-clamp-3">
                {service.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-[#106EBE] font-bold text-xl">
                  ${service.price}
                </span>
                <button
                  onClick={() => handleViewService(service)}
                  className="px-4 py-2 bg-[#106EBE] text-white rounded-lg hover:bg-[#0FFCBE] hover:text-gray-900 transition-colors flex items-center"
                >
                  View Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Service Details Modal */}
      {showServiceDetails && selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <div className="h-64 overflow-hidden">
                <img
                  src={selectedService.image}
                  alt={selectedService.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={handleCloseDetails}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
              >
                <svg
                  className="h-6 w-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-8">
              <div className="flex items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900 ml-3">
                  {selectedService.name}
                </h2>
              </div>
              <div className="flex items-center mb-6">
                <div className="flex">
                  {renderStars(selectedService.rating)}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  ({selectedService.rating}) {selectedService.reviewCount}{" "}
                  reviews
                </span>
              </div>
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Description
                </h3>
                <p className="text-gray-600">{selectedService.description}</p>
              </div>
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  What's Included
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Uncomment and map over features if available */}
                  {/* {selectedService.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))} */}
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-50 p-6 rounded-lg">
                <div className="mb-4 sm:mb-0">
                  <span className="text-gray-600 block mb-1">Price</span>
                  <span className="text-3xl font-bold text-[#106EBE]">
                    ${selectedService.price}
                  </span>
                </div>
                <button
                  onClick={() => handleOrderNow(selectedService)}
                  className="w-full sm:w-auto px-8 py-3 bg-[#106EBE] text-white rounded-lg hover:bg-[#0FFCBE] hover:text-gray-900 transition-colors flex items-center justify-center"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceCatalog;
