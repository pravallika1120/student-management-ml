import { useState } from "react";
import axios from "axios";

function PredictionForm({ onPredictionComplete }) {

  const [formData, setFormData] = useState({
    cgpa: "",
    attendance: "",
    internalMarks: "",
    assignmentMarks: "",
    previousMarks: "",
    studyHours: "",
    backlogs: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.cgpa ||
      !formData.attendance ||
      !formData.internalMarks ||
      !formData.assignmentMarks ||
      !formData.previousMarks ||
      !formData.studyHours ||
      formData.backlogs === ""
    ) {
      alert("Please fill all fields");
      return;
    }


    try {

      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/prediction",
        {
          cgpa: Number(formData.cgpa),
          attendance: Number(formData.attendance),
          internalMarks: Number(formData.internalMarks),
          assignmentMarks: Number(formData.assignmentMarks),
          previousMarks: Number(formData.previousMarks),
          studyHours: Number(formData.studyHours),
          backlogs: Number(formData.backlogs)
        }
      );


      console.log(
        "Prediction Response:",
        response.data
      );


      if (onPredictionComplete) {
        onPredictionComplete(response.data);
      }


    } catch (error) {

      console.log(
        "Prediction Error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Prediction failed"
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <div
      className="card shadow p-4"
      style={{
        backgroundColor: "#242424",
        border: "1px solid #3a3a3a",
        borderRadius: "12px"
      }}
    >

      <h4
        className="text-center mb-4"
        style={{
          color: "#ffffff"
        }}
      >
        Student Performance Prediction
      </h4>


      <form onSubmit={handleSubmit}>

        <div className="row">

          {/* CGPA */}

          <div className="col-md-6 mb-3">

            <label className="form-label text-white">
              CGPA
            </label>

            <input
              type="number"
              name="cgpa"
              className="form-control"
              placeholder="Enter CGPA"
              min="0"
              max="10"
              step="0.01"
              value={formData.cgpa}
              onChange={handleChange}
              required
            />

          </div>


          {/* Attendance */}

          <div className="col-md-6 mb-3">

            <label className="form-label text-white">
              Attendance (%)
            </label>

            <input
              type="number"
              name="attendance"
              className="form-control"
              placeholder="Enter attendance"
              min="0"
              max="100"
              value={formData.attendance}
              onChange={handleChange}
              required
            />

          </div>


          {/* Internal Marks */}

          <div className="col-md-6 mb-3">

            <label className="form-label text-white">
              Internal Marks
            </label>

            <input
              type="number"
              name="internalMarks"
              className="form-control"
              placeholder="Enter internal marks"
              min="0"
              max="100"
              value={formData.internalMarks}
              onChange={handleChange}
              required
            />

          </div>


          {/* Assignment Marks */}

          <div className="col-md-6 mb-3">

            <label className="form-label text-white">
              Assignment Marks
            </label>

            <input
              type="number"
              name="assignmentMarks"
              className="form-control"
              placeholder="Enter assignment marks"
              min="0"
              max="100"
              value={formData.assignmentMarks}
              onChange={handleChange}
              required
            />

          </div>


          {/* Previous Marks */}

          <div className="col-md-6 mb-3">

            <label className="form-label text-white">
              Previous Marks
            </label>

            <input
              type="number"
              name="previousMarks"
              className="form-control"
              placeholder="Enter previous marks"
              min="0"
              max="100"
              value={formData.previousMarks}
              onChange={handleChange}
              required
            />

          </div>


          {/* Study Hours */}

          <div className="col-md-6 mb-3">

            <label className="form-label text-white">
              Study Hours / Day
            </label>

            <input
              type="number"
              name="studyHours"
              className="form-control"
              placeholder="Enter study hours"
              min="0"
              max="24"
              step="0.5"
              value={formData.studyHours}
              onChange={handleChange}
              required
            />

          </div>


          {/* Backlogs */}

          <div className="col-md-6 mb-3">

            <label className="form-label text-white">
              Backlogs
            </label>

            <input
              type="number"
              name="backlogs"
              className="form-control"
              placeholder="Enter number of backlogs"
              min="0"
              value={formData.backlogs}
              onChange={handleChange}
              required
            />

          </div>

        </div>


        <button
          type="submit"
          className="btn btn-primary w-100 mt-3"
          disabled={loading}
        >
          {loading
            ? "Predicting..."
            : "Predict Performance"}
        </button>

      </form>

    </div>
  );
}

export default PredictionForm;