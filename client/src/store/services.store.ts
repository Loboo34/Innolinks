import { create } from "zustand";
import {
  getServices,
  updateService,
  createService,
  deleteService,
} from "../services/services";

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

interface ServicesStore {
  services: Service[];
  fetchServices: () => Promise<void>;
  createService: (newService: Omit<Service, "id">) => Promise<void>;
  updateService: (id: number, updatedService: Service) => Promise<void>;
  deleteService: (id: number) => Promise<void>;
}

const useServicesStore = create<ServicesStore>((set) => ({
  services: [],
  fetchServices: async () => {
    try {
      const services = await getServices();
      set({ services: services || [] });
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  },

  createService: async (newService: Omit<Service, "id">) => {
    try {
      const createdService = await createService({
        ...newService,
        icon: newService.icon || "default-icon",
        isActive: newService.isActive ?? true,
      });
      set((state) => ({
        services: [...state.services, createdService],
      }));
    } catch (error) {
      console.error("Error creating service:", error);
    }
  },

  updateService: async (id: number, updatedService: Service) => {
    try {
      const updated = await updateService(id, updatedService);
      set((state) => ({
        services: state.services.map((service) =>
          service.id === id ? { ...service, ...updated } : service
        ),
      }));
    } catch (error) {
      console.error("Error updating service:", error);
    }
  },

  deleteService: async (id: number) => {
    try {
      await deleteService(id);
      set((state) => ({
        services: state.services.filter((s) => s.id !== id),
      }));
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  },
}));

export default useServicesStore;
//export type { Service };
