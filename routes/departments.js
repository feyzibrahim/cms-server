const express = require("express");

const {
  getDepartments,
  getDepartment,
  createDepartment,
  deleteDepartment,
  updateDepartment,
  createSubject,
  getSubjects,
  updateSubject,
  deleteSubject,
} = require("../controllers/departmentController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/", getDepartments);
router.get("/:id", getDepartment);
router.post("/", createDepartment);
router.delete("/:id", deleteDepartment);
router.patch("/:id", updateDepartment);

router.get("/:id/subjects", getSubjects);
router.post("/:id/subjects", createSubject);
router.delete("/:id/subjects/:subId", deleteSubject);
router.patch("/:id/subjects/:subId", updateSubject);

module.exports = router;
