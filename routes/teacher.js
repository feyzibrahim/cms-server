const express = require("express");

const {
  getTeachers,
  getTeacher,
  createTeacher,
  deleteTeacher,
  updateTeacher,
} = require("../controllers/teacherController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/", getTeachers);

router.get("/:id", getTeacher);

router.post("/", createTeacher);

router.delete("/:id", deleteTeacher);

router.patch("/:id", updateTeacher);

module.exports = router;
