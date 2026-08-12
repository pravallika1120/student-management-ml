import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/students/${id}`
        );

        setFormData(response.data);

      } catch (error) {
        console.log(error);
        alert("Unable to load student");
      }
    };

    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/api/students/${id}`,
        {
          ...formData,
          year: Number(formData.year),
          cgpa: Number(formData.cgpa),
          attendance: Number(formData.attendance),
          internalMarks: Number(formData.internalMarks),
          assignmentMarks: Number(formData.assignmentMarks),
          previousMarks: Number(formData.previousMarks),
          studyHours: Number(formData.studyHours),
          backlogs: Number(formData.backlogs)
        }
      );

      alert("Student updated successfully!");

      navigate("/students");

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to update student"
      );
    }
  };

  return (
    <div className="container mt-4 mb-5">

      <h2 className="mb-4">
        Edit Student
      </h2>

      <form onSubmit={handleSubmit}>

        <div className="row">

          <div className="col-md-6 mb-3">
            <label>Student ID</label>
            <input
              type="text"
              name="studentId"
              className="form-control"
              value={formData.studentId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              className="form-control"
              value={formData.phone || ""}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Department</label>
            <input
              type="text"
              name="department"
              className="form-control"
              value={formData.department}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Year</label>
            <input
              type="number"
              name="year"
              className="form-control"
              value={formData.year}
              onChange={handleChange}
              min="1"
              max="4"
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>CGPA</label>
            <input
              type="number"
              name="cgpa"
              className="form-control"
              value={formData.cgpa}
              onChange={handleChange}
              step="0.01"
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Attendance (%)</label>
            <input
              type="number"
              name="attendance"
              className="form-control"
              value={formData.attendance}
              onChange={handleChange}
              min="0"
              max="100"
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Internal Marks</label>
            <input
              type="number"
              name="internalMarks"
              className="form-control"
              value={formData.internalMarks}
              onChange={handleChange}
              min="0"
              max="100"
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Assignment Marks</label>
            <input
              type="number"
              name="assignmentMarks"
              className="form-control"
              value={formData.assignmentMarks}
              onChange={handleChange}
              min="0"
              max="100"
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Previous Marks</label>
            <input
              type="number"
              name="previousMarks"
              className="form-control"
              value={formData.previousMarks}
              onChange={handleChange}
              min="0"
              max="100"
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Study Hours / Day</label>
            <input
              type="number"
              name="studyHours"
              className="form-control"
              value={formData.studyHours}
              onChange={handleChange}
              min="0"
              max="24"
              step="0.5"
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Backlogs</label>
            <input
              type="number"
              name="backlogs"
              className="form-control"
              value={formData.backlogs}
              onChange={handleChange}
              min="0"
              required
            />
          </div>

        </div>

        <button
          type="submit"
          className="btn btn-primary"
        >
          Update Student
        </button>

        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/students")}
        >
          Cancel
        </button>

      </form>

    </div>
  );
}

export default EditStudent;