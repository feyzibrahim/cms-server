const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Student = require("./studentModel");
const Subject = require("./Subject");
const Semester = require("./Semester");

const internalMarksSchema = new Schema({
  student_id: {
    type: Schema.Types.ObjectId,
    ref: Student,
    required: true,
  },
  subject: {
    type: Schema.Types.ObjectId,
    ref: Subject,
    required: true,
  },
  semester: {
    type: Schema.Types.ObjectId,
    ref: Semester,
    required: true,
  },
  typeOfInternal: {
    type: String,
    required: true,
  },
  marks: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("InternalMarks", internalMarksSchema);
