import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  // Get logged-in user
  const user = JSON.parse(localStorage.getItem("user"));

  // Check role
  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        backgroundColor: "#101010",
        borderBottom: "1px solid #333",
        padding: "12px 0"
      }}
    >
      <div className="container">

        {/* =========================
            PROJECT TITLE
        ========================== */}

        <Link
          className="navbar-brand text-white fw-bold"
          to="/dashboard"
          style={{
            fontSize: "20px"
          }}
        >
          Student Management System Using ML
        </Link>


        {/* =========================
            NAVIGATION
        ========================== */}

        <div className="navbar-nav ms-auto align-items-center">

          {/* Dashboard */}

          <Link
            className="nav-link text-white px-3"
            to="/dashboard"
          >
            Dashboard
          </Link>


          {/* =========================
              ADMIN ONLY
          ========================== */}

          {isAdmin && (
            <>
              {/* Student List */}

              <Link
                className="nav-link text-white px-3"
                to="/students"
              >
                Students
              </Link>


              {/* Add Student */}

              <Link
                className="nav-link text-white px-3"
                to="/add-student"
              >
                Add Student
              </Link>
            </>
          )}


          {/* ML Prediction */}

          <Link
            className="nav-link text-white px-3"
            to="/prediction"
          >
            ML Prediction
          </Link>


          {/* Prediction History */}

          <Link
            className="nav-link text-white px-3"
            to="/prediction-history"
          >
            Prediction History
          </Link>


          {/* =========================
              LOGOUT
          ========================== */}

          <button
            className="btn btn-sm ms-3"
            onClick={handleLogout}
            style={{
              backgroundColor: "#8B0000",
              color: "#ffffff",
              border: "1px solid #8B0000",
              fontWeight: "600",
              padding: "7px 16px",
              borderRadius: "6px"
            }}
          >
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;