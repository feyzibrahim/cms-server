const express = require("express");

const {
  getColleges,
  getCollege,
  createCollege,
  deleteCollege,
  updateCollege,
} = require("../controllers/collegeController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/", getColleges);

router.get("/:id", getCollege);

router.post("/", createCollege);

router.delete("/:id", deleteCollege);

router.patch("/:id", updateCollege);

module.exports = router;
