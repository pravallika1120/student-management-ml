import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function NewRegistration() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    year: ""
  });

  const [loading, setLoading] = useState(false);


  // ==========================================
  // HANDLE CHANGE
  // ==========================================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };


  // ==========================================
  // SUBMIT REQUEST
  // ==========================================

  const handleSubmit = async (e) => {

    e.preventDefault();


    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.department ||
      !formData.year
    ) {

      alert("Please fill all fields");

      return;
    }


    try {

      setLoading(true);


      const response = await axios.post(
        "http://localhost:5000/api/student-requests",
        {
          name: formData.name.trim(),

          email: formData.email
            .trim()
            .toLowerCase(),

          phone: formData.phone.trim(),

          department:
            formData.department.trim(),

          year: Number(formData.year)
        }
      );


      alert(
        response.data.message ||
        "Registration request submitted successfully"
      );


      // Clear form

      setFormData({
        name: "",
        email: "",
        phone: "",
        department: "",
        year: ""
      });


      // Return to login

      navigate("/login");


    } catch (error) {

      console.log(
        "New Registration Error:",
        error
      );


      alert(
        error.response?.data?.message ||
        "Registration request failed"
      );

    } finally {

      setLoading(false);

    }
  };


  return (

    <div
      className="login-page"
      style={{
        minHeight: "100vh",
        padding: "40px 20px"
      }}
    >

      <div
        className="card shadow p-4 mx-auto"
        style={{
          maxWidth: "700px",
          backgroundColor: "#202020",
          border: "1px solid #363636",
          borderRadius: "12px"
        }}
      >

        {/* ====================================
            HEADER
        ===================================== */}

        <div className="text-center mb-4">

          <div
            style={{
              fontSize: "50px"
            }}
          >
            🎓
          </div>


          <h2
            style={{
              color: "#ffffff",
              fontWeight: "700"
            }}
          >
            New Student Registration
          </h2>


          <p
            style={{
              color: "#aaaaaa"
            }}
          >
            Student Management System Using ML
          </p>


          <p
            style={{
              color: "#777777",
              fontSize: "14px"
            }}
          >
            University Academic Portal
          </p>

        </div>


        {/* ====================================
            INFORMATION BOX
        ===================================== */}

        <div
          style={{
            backgroundColor: "#2a2a2a",
            border: "1px solid #444",
            borderRadius: "8px",
            padding: "15px",
            marginBottom: "25px"
          }}
        >

          <strong
            style={{
              color: "#ffffff"
            }}
          >
            Important
          </strong>


          <p
            style={{
              color: "#aaaaaa",
              marginTop: "8px",
              marginBottom: "0"
            }}
          >
            If you are a new student and your
            details have not been added by the
            Administrator, submit this form.
            The Administrator will review your
            request and add your details to the
            student records.
          </p>


          <p
            style={{
              color: "#aaaaaa",
              marginTop: "8px",
              marginBottom: "0"
            }}
          >
            After the Admin adds your details,
            return to the Login page and select
            <strong style={{ color: "#ffffff" }}>
              {" "}Activate Student Account
            </strong>
            {" "}to create your password.
          </p>

        </div>


        {/* ====================================
            FORM
        ===================================== */}

        <form onSubmit={handleSubmit}>

          <div className="row">


            {/* Full Name */}

            <div className="col-md-6 mb-3">

              <label
                className="form-label text-white"
              >
                Full Name
              </label>

              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>


            {/* Email */}

            <div className="col-md-6 mb-3">

              <label
                className="form-label text-white"
              >
                Gmail / University Email
              </label>

              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>


            {/* Phone */}

            <div className="col-md-6 mb-3">

              <label
                className="form-label text-white"
              >
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                className="form-control"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />

            </div>


            {/* Department */}

            <div className="col-md-6 mb-3">

              <label
                className="form-label text-white"
              >
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

              <label
                className="form-label text-white"
              >
                Year
              </label>

              <select
                name="year"
                className="form-control"
                value={formData.year}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select Year
                </option>

                <option value="1">
                  1st Year
                </option>

                <option value="2">
                  2nd Year
                </option>

                <option value="3">
                  3rd Year
                </option>

                <option value="4">
                  4th Year
                </option>

              </select>

            </div>

          </div>


          {/* ==================================
              SUBMIT
          =================================== */}

          <button
            type="submit"
            className="btn btn-primary w-100 mt-3"
            disabled={loading}
          >

            {loading
              ? "Submitting..."
              : "Submit Registration Request"}

          </button>


          {/* ==================================
              BACK TO LOGIN
          =================================== */}

          <Link
            to="/login"
            className="btn btn-secondary w-100 mt-2"
          >
            Back to Login
          </Link>

        </form>

      </div>

    </div>
  );
}

export default NewRegistration;