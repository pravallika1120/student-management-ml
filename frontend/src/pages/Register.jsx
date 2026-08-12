import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  // ==========================================
  // REGISTER
  // ==========================================

  const handleRegister = async (e) => {
    e.preventDefault();

    console.log("Register button clicked");


    // ------------------------------------------
    // Validation
    // ------------------------------------------

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }


    try {

      setLoading(true);


      // ----------------------------------------
      // Send registration request
      // ----------------------------------------

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password
        }
      );


      console.log(
        "Register Response:",
        response.data
      );


      // ----------------------------------------
      // Success
      // ----------------------------------------

      alert(
        response.data.message ||
        "Registration successful!"
      );


      // Clear fields

      setName("");
      setEmail("");
      setPassword("");


      // Go to Login

      navigate("/login");


    } catch (error) {

      console.log(
        "Registration Error:",
        error
      );


      // ----------------------------------------
      // Server error
      // ----------------------------------------

      if (error.response) {

        console.log(
          "Server Response:",
          error.response.data
        );


        alert(
          error.response.data.message ||
          "Registration failed"
        );

      } else {

        alert(
          "Cannot connect to server. Make sure backend is running."
        );

      }

    } finally {

      setLoading(false);

    }
  };


  return (

    <div className="login-page">

      {/* ======================================
          BACKGROUND CIRCLES
      ======================================= */}

      <div className="background-circle circle-one"></div>

      <div className="background-circle circle-two"></div>

      <div className="background-circle circle-three"></div>


      {/* ======================================
          REGISTER CARD
      ======================================= */}

      <div className="login-card register-card">


        {/* University Icon */}

        <div className="university-icon">
          🎓
        </div>


        {/* Title */}

        <h1 className="login-title">
          Student Registration
        </h1>


        {/* Subtitle */}

        <p className="login-subtitle">
          Student Management System Using ML
        </p>


        {/* Description */}

        <p
          className="login-description"
          style={{
            marginBottom: "15px"
          }}
        >
          University Academic Portal
        </p>


        {/* ==================================
            IMPORTANT INFORMATION
        =================================== */}

        <div
          style={{
            backgroundColor: "#2a2a2a",
            border: "1px solid #444",
            borderRadius: "8px",
            padding: "12px",
            marginBottom: "20px",
            color: "#cccccc",
            fontSize: "14px",
            lineHeight: "1.5"
          }}
        >

          <strong
            style={{
              color: "#ffffff"
            }}
          >
            Already added by Admin?
          </strong>

          <br />

          Use the same name and email that the
          Admin added to the Student records.

          <br />

          <span
            style={{
              color: "#aaaaaa"
            }}
          >
            If your details are not added by Admin,
            please contact the Admin first.
          </span>

        </div>


        {/* ==================================
            FORM
        =================================== */}

        <form onSubmit={handleRegister}>


          {/* Full Name */}

          <div className="login-input-group">

            <label>
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
            />

          </div>


          {/* Email */}

          <div className="login-input-group">

            <label>
              Gmail / University Email
            </label>

            <input
              type="email"
              placeholder="Enter email added by Admin"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>


          {/* Password */}

          <div className="login-input-group">

            <label>
              Create Password
            </label>

            <input
              type="password"
              placeholder="Create your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
              minLength="6"
            />

          </div>


          {/* ==================================
              REGISTER BUTTON
          =================================== */}

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >

            {loading
              ? "Registering..."
              : "Register"}

          </button>

        </form>


        {/* ==================================
            LOGIN LINK
        =================================== */}

        <div className="register-text">

          Already registered?

          <Link to="/login">
            Login
          </Link>

        </div>


      </div>

    </div>

  );
}

export default Register;