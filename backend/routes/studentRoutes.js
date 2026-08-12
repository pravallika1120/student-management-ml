const express = require("express");

const {
  addStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent
} = require("../controllers/studentController");

const {
  protect,
  adminOnly
} = require("../middleware/authMiddleware");

const router = express.Router();


// ==========================================
// ADMIN ONLY ROUTES
// ==========================================

// Add Student
router.post(
  "/",
  protect,
  adminOnly,
  addStudent
);


// Get All Students
router.get(
  "/",
  protect,
  adminOnly,
  getStudents
);


// Get Student By ID
router.get(
  "/:id",
  protect,
  adminOnly,
  getStudentById
);


// Update Student
router.put(
  "/:id",
  protect,
  adminOnly,
  updateStudent
);


// Delete Student
router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteStudent
);


module.exports = router;