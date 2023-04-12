const mongoose = require("mongoose");
const TeacherModel = require("./teacherModel");

const Schema = mongoose.Schema;

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  code: {
    type: String,
  },
  sem: {
    type: Number,
  },
  year: {
    type: Number,
  },
  user_id: {
    type: String,
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
      type: mongoose.Schema.Types.ObjectId,
      ref: TeacherModel,
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
