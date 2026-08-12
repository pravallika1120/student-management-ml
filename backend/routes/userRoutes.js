const express = require("express");

const router = express.Router();

const {
  registerUser,
  registerNewStudent,
  loginUser
} = require("../controllers/userController");


// Existing student activation
router.post(
  "/register",
  registerUser
);


// Completely new student
router.post(
  "/new-register",
  registerNewStudent
);


// Login
router.post(
  "/login",
  loginUser
);


module.exports = router;