const Attendance = require("../models/attendanceModel");

exports.getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find();
    res.status(200).json(attendance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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

exports.createMultipleAttendance = async (req, res) => {
  const attendanceArr = req.body;

  try {
    const newAttendance = await Attendance.insertMany(attendanceArr);
    res.status(201).json(newAttendance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAttendanceStatistics = async (req, res) => {
  const { studentId, semester } = req.params;

  try {
    const attendance = await Attendance.find({ studentId, semester });
    const attendanceByDate = {};
    attendance.forEach((a) => {
      const dateStr = a.date.toDateString();
      if (!attendanceByDate[dateStr]) {
        attendanceByDate[dateStr] = [];
      }
      attendanceByDate[dateStr].push(a);
    });

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

exports.getDistinctDates = async (req, res) => {
  try {
    const { studentId, semester } = req.params;
    const attendanceRecords = await Attendance.find({ studentId, semester });
    const attendanceByDateAndStatus = attendanceRecords.reduce(
      (acc, record) => {
        const dateStr = record.date.toDateString();
        if (!acc[dateStr]) {
          acc[dateStr] = {
            date: record.date,
            present: 0,
            absent: 0,
            late: 0,
          };
        }
        acc[dateStr][record.status]++;
        return acc;
      },
      {}
    );

    const dates = Object.values(attendanceByDateAndStatus).map(
      ({ date, present }, index) => ({
        index,
        date: date.getTime(),
        present,
      })
    );

    res.status(200).json(dates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAttendanceByDate = async (req, res) => {
  try {
    const { studentId, semester, date } = req.params;
    const searchDate = new Date(date);
    const attendance = await Attendance.find({
      studentId,
      semester,
      date: searchDate,
    });
    res.status(200).json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
