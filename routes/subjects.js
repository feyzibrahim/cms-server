const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/subjectController");

// Create a new subject
router.post("/", subjectController.createSubject);

// Get all subjects
router.get("/", subjectController.getSubjects);

// Get a subject by ID
router.get("/:id", subjectController.getSubjectById);

// Update a subject by ID
router.put("/:id", subjectController.updateSubject);

// Delete a subject by ID
router.delete("/:id", subjectController.deleteSubject);

// Get all subjects for a specific semester
router.get("/semester/:semesterId", subjectController.getSubjectsBySemester);

module.exports = router;
