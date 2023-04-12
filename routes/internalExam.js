const express = require("express");
const router = express.Router();
const internalExamController = require("../controllers/internalExamController");

// Add a new internal mark
router.post("/", internalExamController.addInternalExam);

// Get all internal marks
router.get("/", internalExamController.getAllInternalExams);

// Get internal marks by student ID and subject ID
router.get("/:student", internalExamController.getInternalExamsByStudent);

router.get(
  "/teacher/:teacher",
  internalExamController.getInternalExamsByTeacher
);

module.exports = router;
