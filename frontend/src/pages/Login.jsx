import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ==========================================
  // LOGIN
  // ==========================================

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: email.trim().toLowerCase(),
          password
        }
      );

      console.log("Login Response:", response.data);

      // ========================================
      // STORE TOKEN
      // ========================================

      localStorage.setItem(
        "token",
        response.data.token
      );

      // ========================================
      // STORE USER
      // ========================================

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      // ========================================
      // SUCCESS
      // ========================================

      alert(
        response.data.message ||
        "Login Successful!"
      );

      // Clear password
      setPassword("");

      // Go to dashboard
      navigate("/dashboard");

    } catch (error) {
      console.log("Login Error:", error);

      if (error.response) {
        console.log(
          "Server Response:",
          error.response.data
        );

        alert(
          error.response.data.message ||
          "Invalid email or password"
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
    <div
      className="login-page"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "30px"
      }}
    >

      {/* ======================================
          LOGIN CARD
      ======================================= */}

      <div
        className="card shadow p-4"
        style={{
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "#202020",
          border: "1px solid #363636",
          borderRadius: "12px"
        }}
      >

        {/* ====================================
            HEADER
        ===================================== */}

        <div className="text-center">

          <div
            style={{
              fontSize: "50px",
              marginBottom: "10px"
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
            Student Login
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
            LOGIN FORM
        ===================================== */}

        <form onSubmit={handleLogin}>

          {/* Email */}

          <div className="mb-3">

            <label
              className="form-label"
              style={{
                color: "#ffffff"
              }}
            >
              Gmail / University Email
            </label>

            <input
              type="email"
              className="form-control"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>


          {/* Password */}

          <div className="mb-3">

            <label
              className="form-label"
              style={{
                color: "#ffffff"
              }}
            >
              Password
            </label>

            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

          </div>


          {/* Login Button */}

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >

            {loading
              ? "Logging in..."
              : "Login"}

          </button>

        </form>


        <hr
          style={{
            borderColor: "#444",
            margin: "25px 0"
          }}
        />


        {/* ====================================
            STUDENT ACCOUNT ACTIVATION
        ===================================== */}

        <div className="text-center">

          <p
            style={{
              color: "#ffffff",
              marginBottom: "8px"
            }}
          >
            Already added by Administrator?
          </p>

          <p
            style={{
              color: "#888888",
              fontSize: "14px"
            }}
          >
            If the Admin has already added your
            student details, activate your account
            by creating a password.
          </p>

          <Link
            to="/register"
            className="btn btn-outline-success w-100 mb-4"
          >
            Activate Student Account
          </Link>


          {/* ==================================
              NEW STUDENT
          =================================== */}

          <p
            style={{
              color: "#ffffff",
              marginBottom: "8px"
            }}
          >
            Not added by Administrator?
          </p>

          <p
            style={{
              color: "#888888",
              fontSize: "14px"
            }}
          >
            If you are a new student, submit your
            registration request.
          </p>

          <Link
            to="/new-registration"
            className="btn btn-outline-primary w-100"
          >
            New Student Registration
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;