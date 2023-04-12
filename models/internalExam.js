const mongoose = require("mongoose");
const StudentModel = require("./studentModel");
const Subject = require("./Subject");
const TeacherModel = require("./teacherModel");
// Define internal mark schema
const InternalExamSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: StudentModel,
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Subject,
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: TeacherModel,
    required: true,
  },
  marks: {
    type: Number,
    required: true,
  },
  maxMarks: {
    type: Number,
  },
  examType: {
    type: String,
    enum: ["Term 1", "Term 2"],
    required: true,
  },
});

// Create model for internal mark schema
const InternalExam = mongoose.model("InternalExam", InternalExamSchema);

module.exports = InternalExam;
