import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import NewRegistration from "./pages/NewRegistration";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import Prediction from "./pages/Prediction";
import PredictionHistory from "./pages/PredictionHistory";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Login */}
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        {/* Existing Admin-added student */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* Completely new student */}
        <Route
          path="/new-registration"
          element={<NewRegistration />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* Students */}
        <Route
          path="/students"
          element={<Students />}
        />

        {/* Add Student */}
        <Route
          path="/add-student"
          element={<AddStudent />}
        />

        {/* ML Prediction */}
        <Route
          path="/prediction"
          element={<Prediction />}
        />

        {/* Prediction History */}
        <Route
          path="/prediction-history"
          element={<PredictionHistory />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;