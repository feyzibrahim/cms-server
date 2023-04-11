const mongoose = require("mongoose");
const Subject = require("./Subject");
const TeacherModel = require("./teacherModel");
const StudentModel = require("./studentModel");
const Semester = require("./Semester");

const AssignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Subject,
      required: true,
    },
    semester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Semester,
      required: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: TeacherModel,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    studentSubmissions: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: StudentModel,
        },
        submissionDate: {
          type: Date,
          required: true,
        },
        grade: {
          type: Number,
          default: null,
        },
      },
    ],
  },
  { timestamps: true }
);

const Assignment = mongoose.model("Assignment", AssignmentSchema);

module.exports = Assignment;
