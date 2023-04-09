const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AttendanceSchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "studentmodels",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
    min: 1,
    max: 6,
  },
  period: {
    type: String,
    enum: ["Period 1", "Period 2", "Period 3", "Period 4", "Period 5"],
    required: true,
  },
  status: {
    type: String,
    enum: ["present", "absent", "late"],
    default: "absent",
  },
});

const Attendance = mongoose.model("AttendanceModel", AttendanceSchema);

module.exports = Attendance;
