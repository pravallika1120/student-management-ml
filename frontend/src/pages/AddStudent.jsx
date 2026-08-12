import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddStudent() {
  const navigate = useNavigate();

  // Get logged-in user
  const user = JSON.parse(localStorage.getItem("user"));

  // Check admin
  const isAdmin = user?.role === "admin";

  const [formData, setFormData] = useState({
    studentId: "",
    name: "",
    email: "",
    phone: "",
    department: "",
    year: "",
    cgpa: "",
    attendance: "",
    internalMarks: "",
    assignmentMarks: "",
    previousMarks: "",
    studyHours: "",
    backlogs: ""
  });

  // ==========================================
  // ADMIN ACCESS CHECK
  // ==========================================

  useEffect(() => {
    if (!isAdmin) {
      alert("Access denied. Only Admin can add students.");
      navigate("/dashboard");
    }
  }, [isAdmin, navigate]);

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ==========================================
  // SUBMIT FORM
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAdmin) {
      alert("Only Admin can add students.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/students",
        {
          ...formData,

          year: Number(formData.year),

          cgpa: Number(formData.cgpa),

          attendance: Number(formData.attendance),

          internalMarks: Number(formData.internalMarks),

          assignmentMarks: Number(
            formData.assignmentMarks
          ),

          previousMarks: Number(
            formData.previousMarks
          ),

          studyHours: Number(
            formData.studyHours
          ),

          backlogs: Number(
            formData.backlogs
          )
        }
      );

      alert("Student added successfully!");

      // ======================================
      // REDIRECT TO STUDENTS PAGE
      // ======================================

      navigate("/students");

    } catch (error) {
      console.log(
        "Add Student Error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to add student"
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
      className="container mt-4 mb-5"
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

        <h2
          style={{
            color: "#ffffff",
            fontWeight: "700",
            marginBottom: "8px"
          }}
        >
          Add Student
        </h2>

        <p
          style={{
            color: "#aaaaaa",
            marginBottom: "0"
          }}
        >
          Enter the student's personal and academic
          information.
        </p>

      </div>


      {/* ======================================
          FORM
      ======================================= */}

      <div
        className="p-4"
        style={{
          backgroundColor: "#202020",
          border: "1px solid #363636",
          borderRadius: "12px"
        }}
      >

        <form onSubmit={handleSubmit}>

          <div className="row">

            {/* Student ID */}

            <div className="col-md-6 mb-3">

              <label className="form-label">
                Student ID
              </label>

              <input
                type="text"
                name="studentId"
                className="form-control"
                placeholder="Enter student ID"
                value={formData.studentId}
                onChange={handleChange}
                required
              />

            </div>


            {/* Name */}

            <div className="col-md-6 mb-3">

              <label className="form-label">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>


            {/* Email */}

            <div className="col-md-6 mb-3">

              <label className="form-label">
                Email
              </label>

              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>


            {/* Phone */}

            <div className="col-md-6 mb-3">

              <label className="form-label">
                Phone
              </label>

              <input
                type="text"
                name="phone"
                className="form-control"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
              />

            </div>


            {/* Department */}

            <div className="col-md-6 mb-3">

              <label className="form-label">
                Department
              </label>

              <input
                type="text"
                name="department"
                className="form-control"
                placeholder="Example: CSE"
                value={formData.department}
                onChange={handleChange}
                required
              />

            </div>


            {/* Year */}

            <div className="col-md-6 mb-3">

              <label className="form-label">
                Year
              </label>

              <input
                type="number"
                name="year"
                className="form-control"
                placeholder="1 - 4"
                min="1"
                max="4"
                value={formData.year}
                onChange={handleChange}
                required
              />

            </div>


            {/* CGPA */}

            <div className="col-md-6 mb-3">

              <label className="form-label">
                CGPA
              </label>

              <input
                type="number"
                name="cgpa"
                className="form-control"
                placeholder="Example: 8.50"
                step="0.01"
                min="0"
                max="10"
                value={formData.cgpa}
                onChange={handleChange}
                required
              />

            </div>


            {/* Attendance */}

            <div className="col-md-6 mb-3">

              <label className="form-label">
                Attendance (%)
              </label>

              <input
                type="number"
                name="attendance"
                className="form-control"
                placeholder="Example: 85"
                min="0"
                max="100"
                value={formData.attendance}
                onChange={handleChange}
                required
              />

            </div>


            {/* Internal Marks */}

            <div className="col-md-6 mb-3">

              <label className="form-label">
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

              <label className="form-label">
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

              <label className="form-label">
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

              <label className="form-label">
                Study Hours / Day
              </label>

              <input
                type="number"
                name="studyHours"
                className="form-control"
                placeholder="Example: 4"
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

              <label className="form-label">
                Backlogs
              </label>

              <input
                type="number"
                name="backlogs"
                className="form-control"
                placeholder="Example: 0"
                min="0"
                value={formData.backlogs}
                onChange={handleChange}
                required
              />

            </div>

          </div>


          {/* ==================================
              BUTTONS
          =================================== */}

          <div className="mt-3">

            <button
              type="submit"
              className="btn btn-success"
            >
              Add Student
            </button>


            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => navigate("/students")}
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddStudent;