const mongoose = require("mongoose");
const StudentModel = require("./studentModel");
const Subject = require("./Subject");

// Define internal mark schema
const InternalExamSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: StudentModel,
    required: true,
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Subject,
    required: true,
  },
  marks: {
    type: Number,
    required: true,
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
