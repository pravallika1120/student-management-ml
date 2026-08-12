import { useEffect, useState } from "react";
import axios from "axios";

function PredictionHistory() {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch prediction history
  const fetchHistory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/prediction/history"
      );

      console.log("Prediction History:", response.data);

      setPredictions(response.data);

    } catch (error) {
      console.log("History Error:", error);

      alert(
        error.response?.data?.message ||
        "Unable to fetch prediction history"
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="container mt-5 mb-5">

      <h2 className="text-center mb-4">
        Prediction History
      </h2>

      <p className="text-center text-muted mb-4">
        Previous student performance predictions
      </p>

      {loading ? (

        <div className="text-center mt-5">
          <h5>Loading prediction history...</h5>
        </div>

      ) : predictions.length === 0 ? (

        <div className="alert alert-info text-center">
          No prediction history available.
        </div>

      ) : (

        <div className="table-responsive">

          <table className="table table-bordered table-striped table-hover">

            <thead className="table-dark">

              <tr>
                <th>S.No</th>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Attendance</th>
                <th>Internal Marks</th>
                <th>Assignment Marks</th>
                <th>Previous Marks</th>
                <th>Study Hours</th>
                <th>Backlogs</th>
                <th>Prediction</th>
                <th>Date</th>
              </tr>

            </thead>

            <tbody>

              {predictions.map((item, index) => (

                <tr key={item._id}>

                  <td>
                    {index + 1}
                  </td>

                  <td>
                    {item.studentId}
                  </td>

                  <td>
                    {item.studentName}
                  </td>

                  <td>
                    {item.attendance}%
                  </td>

                  <td>
                    {item.internalMarks}
                  </td>

                  <td>
                    {item.assignmentMarks}
                  </td>

                  <td>
                    {item.previousMarks}
                  </td>

                  <td>
                    {item.studyHours}
                  </td>

                  <td>
                    {item.backlogs}
                  </td>

                  <td>

                    <span
                      className={
                        item.prediction?.toLowerCase() === "good"
                          ? "badge bg-success"
                          : item.prediction?.toLowerCase() === "average"
                          ? "badge bg-warning text-dark"
                          : "badge bg-danger"
                      }
                    >
                      {item.prediction}
                    </span>

                  </td>

                  <td>
                    {item.createdAt
                      ? new Date(
                          item.createdAt
                        ).toLocaleDateString()
                      : "N/A"}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

      <div className="text-center mt-4">

        <button
          className="btn btn-primary"
          onClick={fetchHistory}
        >
          Refresh History
        </button>

      </div>

    </div>
  );
}

export default PredictionHistory;