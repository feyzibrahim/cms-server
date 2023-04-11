const express = require("express");
const router = express.Router();
const internalExamController = require("../controllers/internalExamController");

// Add a new internal mark
router.post("/", internalExamController.addInternalExam);

// Get all internal marks
router.get("/", internalExamController.getAllInternalExams);

// Get internal marks by student ID and subject ID
router.get("/:studentId", internalExamController.getInternalExamsByStudent);

module.exports = router;
