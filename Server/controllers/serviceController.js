const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Fetch all services
const getServices = async (req, res) => {
  const services = await prisma.service.findMany();
  res.json(services);
};

// Fetch a single service
const getService = async (req, res) => {
  const { id } = req.params;
  const service = await prisma.service.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  res.json(service);
};

const createService = async (req, res) => {
  try {
    const { name, image, category, description, price } = req.body;
    if (!name || !description || !price) {
      return res.status(400).json({ error: "Please fill all fields" });
    }

    const service = await prisma.service.create({
      data: {
        name,
        image,
        category,
        description,
        price,
      },
    });
    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({ error: "Error creating service" });
  }
};

//update service
const updateService = async (req, res) => {
  try{
    const { id } = req.params;
    
    const { name, image, category, description, price } = req.body;
  

    const service = await prisma.service.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        image,
        category,
        description,
        price,
      },
    });
    res.json(service);
  } catch (error) {
    res.status(400).json({ error: `Error updating service ${error}` });
  }
};

//delete service
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Please provide service id" });
    }
    const service = await prisma.service.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    //console.log(service);

    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    // Delete related records in Order table
    await prisma.order.deleteMany({
      where: {
        serviceId: parseInt(id),
      },
    });

    const deletes = await prisma.service.delete({
      where: {
        id: parseInt(id),
      },
    });

    //console.info(service, deletes);
    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: `Error deleting service ${error}` });
  }
};

module.exports = {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
};
