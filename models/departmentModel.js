const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  sem: {
    type: Number,
  },
  year: {
    type: Number,
  },
  user_id: {
    type: String,
    required: true,
  },
});

const departmentSchema = new Schema(
  {
    department_name: {
      type: String,
      required: true,
    },
    year_count: {
      type: Number,
      required: true,
    },
    hod: {
      type: String,
    },
    teacher_count: {
      type: Number,
    },
    students_count: {
      type: String,
    },
    subjects: [subjectSchema],
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("departmentModel", departmentSchema);
