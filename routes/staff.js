const express = require("express");

const {
  getStaffs,
  getStaff,
  createStaff,
  deleteStaff,
  updateStaff,
} = require("../controllers/staffController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/", getStaffs);

router.get("/:id", getStaff);

router.post("/", createStaff);

router.delete("/:id", deleteStaff);

router.patch("/:id", updateStaff);

module.exports = router;
