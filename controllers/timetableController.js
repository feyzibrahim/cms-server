const Timetable = require("../models/timetableModel");

// Get complete schema
exports.getTimetable = async (req, res) => {
  try {
    const { departmentId, year } = req.query;

    const timetable = await Timetable.findOne({
      departmentId: { $regex: departmentId },
      year: { $eq: parseInt(year) },
    });
    if (!timetable) {
      return res.status(404).json({ message: "Timetable not found" });
    }
    return res.json({ timetable });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET /timetable/:day
// Retrieves the timetable for a specific day of the week
exports.getTimetableForDay = async (req, res) => {
  try {
    const { day } = req.params;
    const { departmentId, year } = req.query;

    const timetable = await Timetable.findOne({
      departmentId: { $regex: departmentId },
      year: { $eq: parseInt(year) },
    });

    if (!timetable) {
      return res.status(404).json({ error: "Timetable not found" });
    }
    if (!timetable.days[day]) {
      return res.status(404).json({ error: `Timetable not found for ${day}` });
    }
    return res.json(timetable.days[day]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

// POST /timetable
// Creates a new timetable
exports.createTimetable = async (req, res) => {
  try {
    const timetable = new Timetable(req.body);
    await timetable.save();
    return res.json(timetable);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

// PUT /timetable/:day
// Updates the timetable for a specific day of the week
exports.updateTimetableForDay = async (req, res) => {
  try {
    const { day } = req.params;
    const { departmentId, year } = req.query;

    const timetable = await Timetable.findOne({
      departmentId: { $regex: departmentId },
      year: { $eq: parseInt(year) },
    });
    if (!timetable) {
      return res.status(404).json({ error: "Timetable not found" });
    }
    if (!timetable.days[day]) {
      return res.status(404).json({ error: `Timetable not found for ${day}` });
    }
    Object.assign(timetable.days[day], req.body);
    await timetable.save();
    return res.json(timetable.days[day]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

// DELETE /timetable/:day
// Deletes the timetable for a specific day of the week
exports.deleteTimetableForDay = async (req, res) => {
  try {
    const { day } = req.params;
    const timetable = await Timetable.findOne({});
    if (!timetable) {
      return res.status(404).json({ error: "Timetable not found" });
    }
    if (!timetable.days[day]) {
      return res.status(404).json({ error: `Timetable not found for ${day}` });
    }
    timetable.days[day] = [];
    await timetable.save();
    return res.json({ message: `Timetable for ${day} deleted` });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};
