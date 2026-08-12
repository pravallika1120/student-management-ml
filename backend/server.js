const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const predictionRoutes = require("./routes/predictionRoutes");
const RequeststudentRoutes = require("./routes/RequeststudentRoutes");

const app = express();

connectDB();

app.use(cors());

app.use(express.json());


app.use("/api/auth", authRoutes);

app.use("/api/students", studentRoutes);

app.use("/api/prediction", predictionRoutes);

app.use(
  "/api/student-requests",
  RequeststudentRoutes
);


app.get("/", (req, res) => {
  res.json({
    message: "Student Management API Running"
  });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});