const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
      unique: true
    },

    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    phone: {
      type: String
    },

    department: {
      type: String,
      required: true
    },

    year: {
      type: Number,
      required: true
    },

    cgpa: {
      type: Number,
      required: true
    },

    attendance: {
      type: Number,
      required: true
    },

    internalMarks: {
      type: Number,
      required: true
    },

    assignmentMarks: {
      type: Number,
      required: true
    },

    previousMarks: {
      type: Number,
      required: true
    },

    studyHours: {
      type: Number,
      required: true
    },

    backlogs: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Student",
  studentSchema
);