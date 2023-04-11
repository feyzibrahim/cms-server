const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DepartmentModel = require("../models/departmentModel");
const Semester = require("../models/Semester");

const SubjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: DepartmentModel,
      required: true,
    },
    semester: {
      type: Schema.Types.ObjectId,
      ref: Semester,
      required: true,
    },
  },
  { timestamps: true }
);

// Create Subject model
const Subject = mongoose.model("Subject", SubjectSchema);

module.exports = Subject;
