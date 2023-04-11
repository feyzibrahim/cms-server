const express = require("express");
const router = express.Router();
const semesterController = require("../controllers/semesterController");
const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth);

router.get("/", semesterController.getSemestersByDepartment);

router.post("/", semesterController.createSemester);

router.put("/:id", semesterController.updateSemesterById);

router.delete("/:id", semesterController.deleteSemesterById);

module.exports = router;
