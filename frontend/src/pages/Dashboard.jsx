import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Dashboard() {
  const [students, setStudents] = useState([]);

  // Get logged-in user
  const user = JSON.parse(localStorage.getItem("user"));

  // Check whether user is admin
  const isAdmin = user?.role === "admin";

  // Fetch students
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/students"
      );

      setStudents(response.data);
    } catch (error) {
      console.log("Error fetching students:", error);
    }
  };

  // Total students
  const totalStudents = students.length;

  // Average CGPA
  const averageCGPA =
    totalStudents > 0
      ? (
          students.reduce(
            (sum, student) =>
              sum + Number(student.cgpa || 0),
            0
          ) / totalStudents
        ).toFixed(2)
      : "0.00";

  // Average attendance
  const averageAttendance =
    totalStudents > 0
      ? (
          students.reduce(
            (sum, student) =>
              sum + Number(student.attendance || 0),
            0
          ) / totalStudents
        ).toFixed(1)
      : "0.0";

  return (
    <div
      className="container-fluid mt-4 mb-5"
      style={{
        minHeight: "100vh",
        color: "#ffffff"
      }}
    >

      {/* =====================================================
          ROW 1 - WELCOME / PROJECT INFORMATION
      ====================================================== */}

      <div className="row">
        <div className="col-12">

          <div
            className="p-4 mb-4"
            style={{
              backgroundColor: "#202020",
              border: "1px solid #363636",
              borderRadius: "12px"
            }}
          >

            <div className="row align-items-center">

              {/* Project Title */}

              <div className="col-md-8">

                <h1
                  style={{
                    color: "#ffffff",
                    fontWeight: "700",
                    marginBottom: "10px"
                  }}
                >
                  Student Management System Using ML
                </h1>

                <p
                  style={{
                    color: "#aaaaaa",
                    marginBottom: "0"
                  }}
                >
                  Manage student information and predict
                  academic performance using Machine Learning.
                </p>

              </div>


              {/* Welcome */}

              <div className="col-md-4 text-md-end text-start mt-3 mt-md-0">

                <h5
                  style={{
                    color: "#bbbbbb",
                    marginBottom: "6px"
                  }}
                >
                  Welcome
                </h5>

                <h3
                  style={{
                    color: "#ffffff",
                    fontWeight: "600",
                    marginBottom: "0"
                  }}
                >
                  {user?.name || "User"}
                </h3>

                <small
                  style={{
                    color: "#888888"
                  }}
                >
                  {isAdmin ? "Administrator" : "Student"}
                </small>

              </div>

            </div>

          </div>

        </div>
      </div>


      {/* =====================================================
          ROW 2 - STATISTICS
      ====================================================== */}

      <div className="row">

        {/* Total Students */}

        <div className="col-md-4 mb-4">

          <div
            className="card shadow text-center p-4 h-100"
            style={{
              backgroundColor: "#242424",
              border: "1px solid #3a3a3a",
              borderRadius: "12px"
            }}
          >

            <h5
              style={{
                color: "#bbbbbb"
              }}
            >
              Total Students
            </h5>

            <h1
              style={{
                color: "#ffffff",
                fontWeight: "700",
                marginTop: "15px"
              }}
            >
              {totalStudents}
            </h1>

            <p
              style={{
                color: "#888888",
                marginBottom: "0"
              }}
            >
              Registered students
            </p>

          </div>

        </div>


        {/* Average CGPA */}

        <div className="col-md-4 mb-4">

          <div
            className="card shadow text-center p-4 h-100"
            style={{
              backgroundColor: "#242424",
              border: "1px solid #3a3a3a",
              borderRadius: "12px"
            }}
          >

            <h5
              style={{
                color: "#bbbbbb"
              }}
            >
              Average CGPA
            </h5>

            <h1
              style={{
                color: "#ffffff",
                fontWeight: "700",
                marginTop: "15px"
              }}
            >
              {averageCGPA}
            </h1>

            <p
              style={{
                color: "#888888",
                marginBottom: "0"
              }}
            >
              Overall student average
            </p>

          </div>

        </div>


        {/* Average Attendance */}

        <div className="col-md-4 mb-4">

          <div
            className="card shadow text-center p-4 h-100"
            style={{
              backgroundColor: "#242424",
              border: "1px solid #3a3a3a",
              borderRadius: "12px"
            }}
          >

            <h5
              style={{
                color: "#bbbbbb"
              }}
            >
              Average Attendance
            </h5>

            <h1
              style={{
                color: "#ffffff",
                fontWeight: "700",
                marginTop: "15px"
              }}
            >
              {averageAttendance}%
            </h1>

            <p
              style={{
                color: "#888888",
                marginBottom: "0"
              }}
            >
              Overall attendance
            </p>

          </div>

        </div>

      </div>


      {/* =====================================================
          ROW 3 - QUICK ACTIONS
      ====================================================== */}

      <div className="row">

        <div className="col-12 text-center mb-4">

          <h3
            style={{
              color: "#ffffff",
              fontWeight: "600"
            }}
          >
            Quick Actions
          </h3>

          <p
            style={{
              color: "#888888"
            }}
          >
            Access the main features of the system
          </p>

        </div>


        {/* =================================================
            ADMIN - MANAGE STUDENTS
        ================================================== */}

        {isAdmin && (
          <div className="col-md-4 mb-4">

            <div
              className="card shadow p-4 h-100"
              style={{
                backgroundColor: "#242424",
                border: "1px solid #3a3a3a",
                borderRadius: "12px"
              }}
            >

              <h4
                style={{
                  color: "#ffffff"
                }}
              >
                Manage Students
              </h4>

              <p
                style={{
                  color: "#aaaaaa"
                }}
              >
                View, edit and manage all student
                records.
              </p>

              <Link
                to="/students"
                className="btn btn-primary mt-2"
              >
                View Students
              </Link>

            </div>

          </div>
        )}


        {/* =================================================
            ADMIN - ADD STUDENT
        ================================================== */}

        {isAdmin && (
          <div className="col-md-4 mb-4">

            <div
              className="card shadow p-4 h-100"
              style={{
                backgroundColor: "#242424",
                border: "1px solid #3a3a3a",
                borderRadius: "12px"
              }}
            >

              <h4
                style={{
                  color: "#ffffff"
                }}
              >
                Add Student
              </h4>

              <p
                style={{
                  color: "#aaaaaa"
                }}
              >
                Add a new student's academic
                information.
              </p>

              <Link
                to="/add-student"
                className="btn btn-primary mt-2"
              >
                Add Student
              </Link>

            </div>

          </div>
        )}


        {/* =================================================
            ML PREDICTION
        ================================================== */}

        <div className="col-md-4 mb-4">

          <div
            className="card shadow p-4 h-100"
            style={{
              backgroundColor: "#242424",
              border: "1px solid #3a3a3a",
              borderRadius: "12px"
            }}
          >

            <h4
              style={{
                color: "#ffffff"
              }}
            >
              ML Prediction
            </h4>

            <p
              style={{
                color: "#aaaaaa"
              }}
            >
              Predict student academic performance
              using Machine Learning.
            </p>

            <Link
              to="/prediction"
              className="btn btn-primary mt-2"
            >
              Predict Performance
            </Link>

          </div>

        </div>


        {/* =================================================
            PREDICTION HISTORY
        ================================================== */}

        <div className="col-md-4 mb-4">

          <div
            className="card shadow p-4 h-100"
            style={{
              backgroundColor: "#242424",
              border: "1px solid #3a3a3a",
              borderRadius: "12px"
            }}
          >

            <h4
              style={{
                color: "#ffffff"
              }}
            >
              Prediction History
            </h4>

            <p
              style={{
                color: "#aaaaaa"
              }}
            >
              View previous student performance
              predictions.
            </p>

            <Link
              to="/prediction-history"
              className="btn btn-primary mt-2"
            >
              View History
            </Link>

          </div>

        </div>


      </div>

    </div>
  );
}

export default Dashboard;