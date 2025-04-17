const express = require("express");
const router = express.Router();

const {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  status,
  getOrdersWithUsers,
  getOrdersByUser,
 getPending,
  getApproved, getUserApprovedOrders, getUserPendingOrders
} = require("../controllers/orderController");

router.get("/something", getOrdersWithUsers);

router.get("/status/approved", getApproved); 

router.get("/status/pending",getPending);

router.get("/:userId/approved", getUserApprovedOrders);

router.get("/:userId/pending", getUserPendingOrders);



router.get("/", getOrders);

router.get("/:orderNumber", getOrder);

router.post("/create", createOrder);

router.put("/update/:orderNumber", updateOrder);

router.delete("/delete/:orderNumber", deleteOrder);

router.put("/status/:orderNumber", status);

router.get("/user/:userId", getOrdersByUser);



module.exports = router;
