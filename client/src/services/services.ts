import axios from "axios";

const URL = import.meta.env.VITE_BACKEND_URL;

interface Service {
  id: number;
  name: string;
  description: string;
  category: string;
  price: string;
  image?: string;
  icon: string;
  isActive: boolean;
}

export const getServices = async (): Promise<Service[]> => {
  try {
    const response = await axios.get(`${URL}/services/`);
    return response.data as Service[];
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

export const getServiceById = async (id: number): Promise<Service> => {
  try {
    const response = await axios.get(`${URL}/services/${id}`);
    return response.data as Service;
  } catch (error) {
    console.error("Error fetching service by ID:", error);
    throw error;
  }
};

export const createService = async (
  newService: Omit<Service, "id">
): Promise<Service> => {
  try {
    const response = await axios.post(`${URL}/services/create`, newService);
    if (response.status !== 201) {
      throw new Error("Failed to create service. Please try again.");
    }
    if (!response.data) {
      throw new Error("No data returned from the server.");
    }
    return response.data as Service;
  } catch (error) {
    console.error("Error creating service:", error);
    throw error;
  }
};

export const updateService = async (
    id: number,
    updatedService: Service
    ): Promise<Service> => {
    try {
        const response = await axios.put<Service>(`${URL}/services/update/${id}`, updatedService);
        if (response.status !== 200) {
            throw new Error("Failed to update service. Please try again.");
        }
        if (!response.data || typeof response.data !== 'object') {
            throw new Error("Invalid data returned from the server.");
        }
        return response.data;
    } catch (error) {
        console.error("Error updating service:", error);
        throw error;
    }
};

export const deleteService = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${URL}/services/delete/${id}`);
  } catch (error) {
    console.error("Error deleting service:", error);
    throw error;
  }
};
