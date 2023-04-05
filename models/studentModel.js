const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    student_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    registrationNumber: {
      type: String,
    },
    gender: {
      type: String,
    },
    department: {
      type: String,
    },
    department_id: {
      type: String,
    },
    year: {
      type: Number,
    },
    mobileNumber: {
      type: Number,
    },
    dob: {
      type: Date,
    },
    joiningDate: {
      type: Date,
    },
    qualification: {
      type: String,
    },
    previous_institute: {
      type: String,
    },
    previous_grade: {
      type: String,
    },
    maritalStatus: {
      type: String,
    },
    parents: {
      father_name: {
        type: String,
      },
      father_contact: {
        type: Number,
      },
      mother_name: {
        type: String,
      },
      mother_contact: {
        type: Number,
      },
    },
    address: {
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      pin: {
        type: String,
      },
      country: {
        type: String,
      },
    },
    isActive: {
      type: Boolean,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("studentModel", studentSchema);
