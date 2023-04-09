const express = require("express");
const router = express.Router();
const timetableController = require("../controllers/timetableController");

// GET /timetable/:day
router.get("/:day", timetableController.getTimetableForDay);

// POST /timetable
router.post("/", timetableController.createTimetable);

// PUT /timetable/:day
router.put("/:day", timetableController.updateTimetableForDay);

// DELETE /timetable/:day
router.delete("/:day", timetableController.deleteTimetableForDay);

module.exports = router;
