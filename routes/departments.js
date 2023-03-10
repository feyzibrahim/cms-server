const express = require("express");

const {
  getDepartments,
  getDepartment,
  createDepartment,
  deleteDepartment,
  updateDepartment,
} = require("../controllers/departmentController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/", getDepartments);

router.get("/:id", getDepartment);

router.post("/", createDepartment);

router.delete("/:id", deleteDepartment);

router.patch("/:id", updateDepartment);

module.exports = router;
