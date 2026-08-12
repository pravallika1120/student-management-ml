import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Students() {
  const [students, setStudents] = useState([]);

  const navigate = useNavigate();

  // Get logged-in user
  const user = JSON.parse(localStorage.getItem("user"));

  // Check admin role
  const isAdmin = user?.role === "admin";

  // ==========================================
  // ADMIN ACCESS CHECK
  // ==========================================

  useEffect(() => {
    if (!isAdmin) {
      alert("Access denied. Only Admin can view students.");
      navigate("/dashboard");
      return;
    }

    fetchStudents();
  }, [isAdmin, navigate]);

  // ==========================================
  // FETCH STUDENTS
  // ==========================================

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/students"
      );

      setStudents(response.data);
    } catch (error) {
      console.log("Error fetching students:", error);

      alert(
        error.response?.data?.message ||
        "Unable to fetch students"
      );
    }
  };

  // ==========================================
  // DELETE STUDENT
  // ==========================================

  const deleteStudent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/api/students/${id}`
      );

      alert("Student deleted successfully!");

      fetchStudents();

    } catch (error) {
      console.log("Delete error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to delete student"
      );
    }
  };

  // ==========================================
  // IF NOT ADMIN
  // ==========================================

  if (!isAdmin) {
    return null;
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div
      className="container-fluid mt-4 mb-5"
      style={{
        minHeight: "100vh",
        color: "#ffffff"
      }}
    >

      {/* ======================================
          HEADER
      ======================================= */}

      <div
        className="p-4 mb-4"
        style={{
          backgroundColor: "#202020",
          border: "1px solid #363636",
          borderRadius: "12px"
        }}
      >

        <div className="row align-items-center">

          {/* TITLE */}

          <div className="col-md-8">

            <h2
              style={{
                color: "#ffffff",
                fontWeight: "700",
                marginBottom: "8px"
              }}
            >
              Student Management
            </h2>

            <p
              style={{
                color: "#aaaaaa",
                marginBottom: "0"
              }}
            >
              View and manage registered student
              academic information.
            </p>

          </div>


          {/* ADD STUDENT */}

          <div className="col-md-4 text-md-end mt-3 mt-md-0">

            <Link
              to="/add-student"
              className="btn btn-success"
              style={{
                fontWeight: "600"
              }}
            >
              + Add Student
            </Link>

          </div>

        </div>

      </div>


      {/* ======================================
          STUDENT COUNT
      ======================================= */}

      <div
        className="mb-3"
        style={{
          color: "#aaaaaa"
        }}
      >
        Total Students:{" "}
        <strong
          style={{
            color: "#ffffff"
          }}
        >
          {students.length}
        </strong>
      </div>


      {/* ======================================
          TABLE
      ======================================= */}

      <div
        className="table-responsive"
        style={{
          backgroundColor: "#202020",
          borderRadius: "12px",
          border: "1px solid #363636",
          padding: "15px"
        }}
      >

        <table
          className="table table-dark table-hover table-bordered align-middle mb-0"
        >

          <thead>

            <tr>

              <th>Student ID</th>

              <th>Name</th>

              <th>Email</th>

              <th>Department</th>

              <th>Year</th>

              <th>CGPA</th>

              <th>Attendance</th>

              <th>Actions</th>

            </tr>

          </thead>


          <tbody>

            {/* ==================================
                NO STUDENTS
            =================================== */}

            {students.length === 0 ? (

              <tr>

                <td
                  colSpan="8"
                  className="text-center"
                  style={{
                    color: "#aaaaaa",
                    padding: "30px"
                  }}
                >
                  No students found.
                  <br />

                  <Link
                    to="/add-student"
                    className="btn btn-success btn-sm mt-3"
                  >
                    Add First Student
                  </Link>

                </td>

              </tr>

            ) : (

              /* ==================================
                 STUDENT DATA
              =================================== */

              students.map((student) => (

                <tr key={student._id}>

                  <td>
                    {student.studentId}
                  </td>

                  <td>
                    {student.name}
                  </td>

                  <td>
                    {student.email}
                  </td>

                  <td>
                    {student.department}
                  </td>

                  <td>
                    {student.year}
                  </td>

                  <td>
                    {student.cgpa}
                  </td>

                  <td>
                    {student.attendance}%
                  </td>

                  <td>

                    {/* EDIT */}

                    <Link
                      to={`/edit-student/${student._id}`}
                      className="btn btn-primary btn-sm me-2"
                    >
                      Edit
                    </Link>


                    {/* DELETE */}

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        deleteStudent(student._id)
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Students;