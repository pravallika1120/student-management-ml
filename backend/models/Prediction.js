const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true
    },

    studentName: {
      type: String,
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
    },

    prediction: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Prediction = mongoose.model(
  "Prediction",
  predictionSchema
);

module.exports = Prediction;