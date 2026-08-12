const axios = require("axios");
const Prediction = require("../models/Prediction");

const predictPerformance = async (req, res) => {
  try {
    const {
      studentId,
      studentName,
      attendance,
      internalMarks,
      assignmentMarks,
      previousMarks,
      studyHours,
      backlogs
    } = req.body;

    console.log("Received prediction data:");
    console.log(req.body);

    // Send data to ML service
    const response = await axios.post(
      "http://127.0.0.1:5001/predict",
      {
        attendance,
        internal_marks: internalMarks,
        assignment_marks: assignmentMarks,
        previous_marks: previousMarks,
        study_hours: studyHours,
        backlogs
      }
    );

    const prediction = response.data.prediction;

    console.log("ML Prediction:", prediction);

    // Save prediction to MongoDB
    const savedPrediction = await Prediction.create({
      studentId,
      studentName,
      attendance,
      internalMarks,
      assignmentMarks,
      previousMarks,
      studyHours,
      backlogs,
      prediction
    });

    console.log("Prediction saved successfully!");
    console.log(savedPrediction);

    res.status(200).json({
      success: true,
      prediction: prediction,
      data: savedPrediction
    });

  } catch (error) {

    console.error("Prediction Error:");

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


const getPredictionHistory = async (req, res) => {
  try {

    const predictions = await Prediction
      .find()
      .sort({ createdAt: -1 });

    console.log(
      "Prediction history:",
      predictions
    );

    res.status(200).json(predictions);

  } catch (error) {

    console.error(
      "History Error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


module.exports = {
  predictPerformance,
  getPredictionHistory
};