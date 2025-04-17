const express = require("express");
const router = express.Router();

const {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

router.get("/", getServices);

router.get("/:id", getService);

router.post("/create", createService);

router.put("/update/:id", updateService);

router.delete("/delete/:id", deleteService);

module.exports = router;
