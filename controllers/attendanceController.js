const Attendance = require("../models/attendanceModel");

// Get all attendance records
exports.getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find();
    res.status(200).json(attendance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get attendance record by ID
exports.getAttendanceById = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id);
    if (!attendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }
    res.status(200).json(attendance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new attendance record
exports.createAttendance = async (req, res) => {
  const attendance = new Attendance({
    studentId: req.body.studentId,
    date: req.body.date,
    semester: req.body.semester,
    period: req.body.period,
    status: req.body.status,
  });

  try {
    const newAttendance = await attendance.save();
    res.status(201).json(newAttendance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an attendance record
exports.updateAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id);
    if (!attendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    attendance.studentId = req.body.studentId || attendance.studentId;
    attendance.date = req.body.date || attendance.date;
    attendance.semester = req.body.semester || attendance.semester;
    attendance.period = req.body.period || attendance.period;
    attendance.status = req.body.status || attendance.status;

    const updatedAttendance = await attendance.save();
    res.status(200).json(updatedAttendance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an attendance record
exports.deleteAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id);
    if (!attendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    await attendance.remove();
    res.status(200).json({ message: "Attendance record deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create multiple attendance records
exports.createMultipleAttendance = async (req, res) => {
  const attendanceArr = req.body;

  try {
    // Use insertMany to create all records at once
    const newAttendance = await Attendance.insertMany(attendanceArr);
    res.status(201).json(newAttendance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get attendance statistics for a particular student and semester
exports.getAttendanceStatistics = async (req, res) => {
  const { studentId, semester } = req.params;

  try {
    // Get all attendance records for the specified student and semester
    const attendance = await Attendance.find({ studentId, semester });

    // Group attendance records by date
    const attendanceByDate = {};
    attendance.forEach((a) => {
      const dateStr = a.date.toDateString();
      if (!attendanceByDate[dateStr]) {
        attendanceByDate[dateStr] = [];
      }
      attendanceByDate[dateStr].push(a);
    });

    // Calculate the total number of working days and the number of days the student was present
    let workingDays = 0;
    let presentDays = 0;
    for (const dateStr in attendanceByDate) {
      const dailyAttendance = attendanceByDate[dateStr];
      const presentInDailyAttendance = dailyAttendance.some(
        (a) => a.status === "present"
      );
      if (presentInDailyAttendance) {
        presentDays++;
      }
      workingDays++;
    }

    res.json({ workingDays, presentDays });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
