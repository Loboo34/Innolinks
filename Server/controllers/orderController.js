const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { createNotification } = require("../utils/notificationServices");
const { get } = require("../routes/notificationRoutes");

// Fetch all orders
const getOrders = async (req, res) => {
  const orders = await prisma.order.findMany();
  res.json(orders);
};

// Fetch a single order
const getOrder = async (req, res) => {
  // console.log("params", req.params);
  const { orderNumber } = req.params;

  if (!orderNumber) {
    return res.status(400).json({ error: "orderNumber is required" });
  }

  const order = await prisma.order.findUnique({
    where: {
      orderNumber: orderNumber,
    },
  });

  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  res.json(order);
};

const generateOrderNumber = async () => {
  const lastOrder = await prisma.order.findFirst({
    orderBy: { createdAt: "desc" },
    select: { orderNumber: true },
  });

  let nextNumber = 1;
  if (lastOrder) {
    const match = lastOrder.orderNumber.match(/SR-(\d{4})-(\d{3})/);
    if (match) {
      nextNumber = parseInt(match[2]) + 1;
    }
  }

  return `SR-${new Date().getFullYear()}-${String(nextNumber).padStart(
    3,
    "0"
  )}`;
};

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      serviceId,
      projectName,
      projectDescription,
      budget,
      additionalRequirements,
      attachments,
      deadline,
    } = req.body;

    if (!userId || !budget || !serviceId) {
      return res.status(400).json({ error: "Please fill all fields" });
    }

    const orderNum = await generateOrderNumber();

    const order = await prisma.order.create({
      data: {
        userId,
        projectName,
        projectDescription,
        serviceId,
        orderNumber: orderNum,
        budget,
        additionalRequirements,
        attachments,
        deadline: new Date(deadline),
        status: "pending",
      },
    });

    //create notification
    const admin = await prisma.user.findFirst({
      where: {
        role: "admin",  // Look for admin users who should receive order notifications
      },
      select: { id: true },
    });
    //console.log("adminId", admin);

    if (!admin) {
      console.log("No admin found to notify about the new order");
    }

    await createNotification({
      userId: admin ? admin.id : userId, // If no admin, notify the ordering user
      type: "order_created",
      message: `New order with order number ${orderNum} has been created`,
    });

    res.status(201).json(order);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

//Update an order
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, orderNumber, totalAmount } = req.body;
    const order = await prisma.order.update({
      where: {
        id: parseInt(id),
      },
      data: {
        userId,
        orderNumber,
        totalAmount,
      },
    });

    res.json(order);
  } catch (err) {
    console.log("server error", err);
  }

  const user = await prisma.findFirst({
    where: {
      role: "user"
    },
    select: {
      id: true
    },
  })

  await createNotification({
    userId: parseInt(user),
    type: "order_update",
    message: "Your Order has been updated "
  })
};
// Delete an order
const deleteOrder = async (req, res) => {
  try {
    const { orderNumber } = req.params;
    const order = await prisma.order.delete({
      where: {
        orderNumber: orderNumber,
      },
    });
    res.json({ order, message: "Order deleted successfully" });
  } catch (err) {
    console.log("server error", err);
    res.status(500).json({ error: "Server error" });
  }
};
//change order status
const status = async (req, res) => {
  // console.log("body", req.body);
  try {
    const { orderNumber, status } = req.body;

    if (!orderNumber) {
      return res.status(400).json({ error: "Please provide orderNumber" });
    }

    if (!status) {
      return res.status(400).json({ error: "Please provide status" });
    }

    const order = await prisma.order.update({
      where: {
        orderNumber: orderNumber,
      },
      data: {
        status,
      },
    });

    const user = await prisma.user.findFirst({
      where: {
        role: "user",
      },
      select: { id: true },
    });

     await createNotification({
       userId: parseInt(user),
       type: "order_update",
       message: `Order with order number ${orderNumber} has been ${status}`,
     });

    res.json(order);
  } catch (err) {
    console.log("server error", err);
  }
};

//get order with status of pending
const getPending = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        status: "pending",
      },
      include: {
        user: { select: { id: true, fullName: true } },
        service: { select: { id: true, name: true } },
      },
    });

    res.json(orders);
  } catch (err) {
    console.log("server error", err);
  }
};

//get orders with status approved
const getApproved = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        status: "approved", 
      },
      include: {
        user: { select: { id: true, fullName: true } },
        service: { select: { id: true, name: true } },
      },
    });

    res.json(orders);
  } catch (err) {
    console.log("server error", err);
    res.status(500).json({ error: "Server error" });
  }
};

//orders with users
const getOrdersWithUsers = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: { select: { id: true, fullName: true } },
        service: { select: { id: true, name: true } },
      },
    });

    // console.log("orders", orders);
    res.json(orders);
  } catch (err) {
    console.log("server error", err);
    res.status(500).json({ error: "Server error" });
  }
};

//getUserApprovedOrders
const getUserApprovedOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await prisma.order.findMany({
      where: {
        userId: parseInt(userId),
        status: "approved",
      },
      include: {
        service: { select: { id: true, name: true, price: true } },
      },
    });

    res.json(orders);
  } catch (err) {
    console.log("server error", err);
  }
};

//getUserPendingOrders
const getUserPendingOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await prisma.order.findMany({
      where: {
        userId: parseInt(userId),
        status: "pending",
      },
      include: {
        service: { select: { id: true, name: true, price: true } },
      },
    });

    res.json(orders);
  } catch (err) {
    console.log("server error", err);
  }
};

//change order priority
const priority = async (req, res) => {
  try {
    const { orderId, priority } = req.body;
    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        priority,
      },
    });

    res.json(order);
  } catch (err) {
    console.log("server error", err);
  }
};

//get orders by user
const getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await prisma.order.findMany({
      where: {
        userId: parseInt(userId),
      },
      include: {
        service: { select: { id: true, name: true, price: true } },
      },
    });

    res.json(orders);
  } catch (err) {
    console.log("server error", err);
  }
};

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  status,
  getOrdersWithUsers,
  priority,
  getOrdersByUser,
  getPending,
  getApproved,
  getUserApprovedOrders,
  getUserPendingOrders,
};
