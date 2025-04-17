import React, { useState } from 'react';
import { Calendar, Clock, AlertCircle, Send } from 'lucide-react';
//import { useAuthContext } from '../../hooks/useAuthContext';

interface Service {
  id: string;
  name: string;
  price: number;
}


interface OrderData {
  projectName: string;
  projectDescription: string;
  budget: number;
  additionalRequirements: string;
  attachments: File[];
  serviceId: string;
  deadline?: string;
 // userId: number;
//  name: string;
 // price: number;
 // orderDate: string;
  //status: string;
}

interface OrderFormProps {
  service: Service;
//  user: User;
  onClose: () => void;
  onSubmit: (orderData: OrderData) => Promise<void>;
}

const OrderForm: React.FC<OrderFormProps> = ({ service, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    projectName: "",
    projectDescription: "",
    budget: service.price,
    additionalRequirements: "",
    deadline: "",
    
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.projectName.trim()) {
      newErrors.projectName = 'Project name is required';
    }
    
    if (!formData.projectDescription.trim()) {
      newErrors.projectDescription = 'Project projectDescription is required';
    }
    
   
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = (e: React.FormEvent) => {
   e.preventDefault();

   if (validateForm()) {
     onSubmit({
       ...formData,
       attachments: [], 
       serviceId: service.id,
      // userId: user.id,
      // name: service.name,
       //price: service.price,
      // orderDate: new Date().toISOString(),
       //status: "pending",
     });
   }
   console.log("form:",formData);
   console.log("service:",service);
 };


  // Calculate minimum date for deadline (today)
 const today = new Date();
   const minDate = today.toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-[#106EBE] text-white p-6 rounded-t-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Order Service</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="mt-2">You are ordering: {service.name}</p>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Project Name */}
          <div>
            <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">
              Project Name *
            </label>
            <input
              type="text"
              id="projectName"
              value={formData.projectName}
              onChange={(e) => setFormData({...formData, projectName: e.target.value})}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#106EBE] focus:border-[#106EBE] ${
                errors.projectName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., Company Website Redesign"
            />
            {errors.projectName && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.projectName}
              </p>
            )}
          </div>
          
          {/* Project projectDescription */}
          <div>
            <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700 mb-1">
              Project Description *
            </label>
            <textarea
              id="description"
              value={formData.projectDescription}
              onChange={(e) => setFormData({...formData, projectDescription: e.target.value})}
              rows={4}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#106EBE] focus:border-[#106EBE] ${
                errors.projectDescription ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Describe your project requirements in detail..."
            />
            {errors.projectDescription && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.projectDescription}
              </p>
            )}
          </div>
          
          {/* Deadline and Budget */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Deadline */}
            <div>
              <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
                Deadline *
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="deadline"
                  min={minDate}
                  value={formData.deadline}
                  onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                  className={`w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-[#106EBE] focus:border-[#106EBE] ${
                    errors.deadline ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              {errors.deadline && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.deadline}
                </p>
              )}
            </div> 
            
            {/* Budget */}
            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                Budget (USD)
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="budget"
                  value={formData.budget}
                  onChange={(e) => setFormData({...formData, budget: parseFloat(e.target.value)})}
                  min={service.price}
                  step="0.01"
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#106EBE] focus:border-[#106EBE]"
                />
                <span className="absolute left-3 top-2.5 text-gray-400">$</span>
              </div>
              <p className="mt-1 text-xs text-gray-500 flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Base price: ${service.price}
              </p>
            </div>
          </div>
          
          {/* Additional Requirements */}
          <div>
            <label htmlFor="additionalRequirements" className="block text-sm font-medium text-gray-700 mb-1">
              Additional Requirements
            </label>
            <textarea
              id="additionalRequirements"
              value={formData.additionalRequirements}
              onChange={(e) => setFormData({...formData, additionalRequirements: e.target.value})}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#106EBE] focus:border-[#106EBE]"
              placeholder="Any additional information or specific requirements..."
            />
          </div>
          
          {/* Attachments - Note: This would need backend integration for actual file uploads */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Attachments
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                multiple
                className="hidden"
                id="file-upload"
                onChange={(e) => console.log('File selected:', e.target.files)}
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="mt-1 text-sm text-gray-600">
                  <span className="font-medium text-[#106EBE]">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, PDF up to 10MB
                </p>
              </label>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Service:</span>
                <span className="font-medium">{service.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Base Price:</span>
                <span className="font-medium">${service.price}</span>
              </div>
              <div className="border-t border-gray-200 my-2 pt-2 flex justify-between">
                <span className="text-gray-800 font-medium">Total:</span>
                <span className="text-[#106EBE] font-bold">${formData.budget}</span>
              </div>
            </div>
          </div>
          
          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#106EBE] text-white rounded-lg hover:bg-[#0FFCBE] hover:text-gray-900 transition-colors flex items-center"
            >
              <Send className="mr-2 h-5 w-5" />
              Submit Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;