import { useState } from "react";
import axios from "axios";

function Prediction() {
  const [formData, setFormData] = useState({
    studentId: "",
    studentName: "",
    attendance: "",
    internalMarks: "",
    assignmentMarks: "",
    previousMarks: "",
    studyHours: "",
    backlogs: ""
  });

  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Predict student performance
  const handlePredict = async (e) => {
    e.preventDefault();

    setLoading(true);
    setPrediction("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/prediction",
        {
          studentId: formData.studentId,
          studentName: formData.studentName,
          attendance: Number(formData.attendance),
          internalMarks: Number(formData.internalMarks),
          assignmentMarks: Number(formData.assignmentMarks),
          previousMarks: Number(formData.previousMarks),
          studyHours: Number(formData.studyHours),
          backlogs: Number(formData.backlogs)
        }
      );

      console.log("Prediction response:", response.data);

      setPrediction(response.data.prediction);

    } catch (error) {
      console.log("Prediction Error:", error);

      alert(
        error.response?.data?.message ||
        "Prediction failed. Please check the backend and ML service."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 mb-5">

      <div className="row justify-content-center">

        <div className="col-md-7">

          <div className="card shadow p-4">

            <h2 className="text-center mb-4">
              Student Performance Prediction
            </h2>

            <p className="text-center text-muted">
              Enter the student's academic details
            </p>

            <form onSubmit={handlePredict}>

              {/* Student ID */}

              <div className="mb-3">

                <label className="form-label">
                  Student ID
                </label>

                <input
                  type="text"
                  name="studentId"
                  className="form-control"
                  placeholder="Example: STU001"
                  value={formData.studentId}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* Student Name */}

              <div className="mb-3">

                <label className="form-label">
                  Student Name
                </label>

                <input
                  type="text"
                  name="studentName"
                  className="form-control"
                  placeholder="Enter student name"
                  value={formData.studentName}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* Attendance */}

              <div className="mb-3">

                <label className="form-label">
                  Attendance (%)
                </label>

                <input
                  type="number"
                  name="attendance"
                  className="form-control"
                  placeholder="Example: 85"
                  value={formData.attendance}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  required
                />

              </div>

              {/* Internal Marks */}

              <div className="mb-3">

                <label className="form-label">
                  Internal Marks
                </label>

                <input
                  type="number"
                  name="internalMarks"
                  className="form-control"
                  placeholder="Example: 75"
                  value={formData.internalMarks}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  required
                />

              </div>

              {/* Assignment Marks */}

              <div className="mb-3">

                <label className="form-label">
                  Assignment Marks
                </label>

                <input
                  type="number"
                  name="assignmentMarks"
                  className="form-control"
                  placeholder="Example: 80"
                  value={formData.assignmentMarks}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  required
                />

              </div>

              {/* Previous Marks */}

              <div className="mb-3">

                <label className="form-label">
                  Previous Marks
                </label>

                <input
                  type="number"
                  name="previousMarks"
                  className="form-control"
                  placeholder="Example: 72"
                  value={formData.previousMarks}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  required
                />

              </div>

              {/* Study Hours */}

              <div className="mb-3">

                <label className="form-label">
                  Study Hours / Day
                </label>

                <input
                  type="number"
                  name="studyHours"
                  className="form-control"
                  placeholder="Example: 4"
                  value={formData.studyHours}
                  onChange={handleChange}
                  min="0"
                  max="24"
                  step="0.5"
                  required
                />

              </div>

              {/* Backlogs */}

              <div className="mb-3">

                <label className="form-label">
                  Number of Backlogs
                </label>

                <input
                  type="number"
                  name="backlogs"
                  className="form-control"
                  placeholder="Example: 0"
                  value={formData.backlogs}
                  onChange={handleChange}
                  min="0"
                  required
                />

              </div>

              {/* Predict Button */}

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >

                {loading
                  ? "Predicting..."
                  : "Predict Performance"}

              </button>

            </form>

            {/* Prediction Result */}

            {prediction && (

              <div className="alert alert-success text-center mt-4">

                <h4>
                  Prediction Result
                </h4>

                <h2 className="mt-3">
                  {prediction}
                </h2>

                <p className="mb-0">
                  The student's predicted performance level is shown above.
                </p>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Prediction;