const express = require("express");

const {
  getManagements,
  getManagement,
  createManagement,
  deleteManagement,
  updateManagement,
} = require("../controllers/managementController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/", getManagements);

router.get("/:id", getManagement);

router.post("/", createManagement);

router.delete("/:id", deleteManagement);

router.patch("/:id", updateManagement);

module.exports = router;
