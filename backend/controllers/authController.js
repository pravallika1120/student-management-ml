const User = require("../models/User");
const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// =====================================================
// REGISTER STUDENT
// =====================================================

const registerUser = async (req, res) => {
  try {

    const {
      name,
      email,
      password
    } = req.body;


    // -----------------------------------------------
    // Validate input
    // -----------------------------------------------

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required"
      });
    }


    const normalizedEmail = email
      .trim()
      .toLowerCase();


    // -----------------------------------------------
    // Check whether email belongs to an Admin-added
    // student
    // -----------------------------------------------

    const student = await Student.findOne({
      email: normalizedEmail
    });


    if (!student) {
      return res.status(404).json({
        message:
          "Student details are not available. Please contact the Admin first."
      });
    }


    // -----------------------------------------------
    // Check whether student already registered
    // -----------------------------------------------

    const existingUser = await User.findOne({
      email: normalizedEmail
    });


    if (existingUser) {
      return res.status(400).json({
        message:
          "This student is already registered. Please login."
      });
    }


    // -----------------------------------------------
    // Optional name verification
    // -----------------------------------------------

    if (
      student.name.trim().toLowerCase() !==
      name.trim().toLowerCase()
    ) {
      return res.status(400).json({
        message:
          "The name does not match the student details added by Admin."
      });
    }


    // -----------------------------------------------
    // Hash password
    // -----------------------------------------------

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );


    // -----------------------------------------------
    // Create student User account
    // -----------------------------------------------

    const user = await User.create({

      name: student.name,

      email: normalizedEmail,

      password: hashedPassword,

      studentId: student.studentId,

      role: "student"

    });


    // -----------------------------------------------
    // Success response
    // -----------------------------------------------

    res.status(201).json({

      message:
        "Registration successful. You can now login.",

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        studentId: user.studentId,
        role: user.role
      }

    });

  } catch (error) {

    console.log(
      "Registration Error:",
      error.message
    );

    res.status(500).json({
      message: error.message
    });
  }
};



// =====================================================
// LOGIN USER
// =====================================================

const loginUser = async (req, res) => {
  try {

    const {
      email,
      password
    } = req.body;


    // -----------------------------------------------
    // Validate input
    // -----------------------------------------------

    if (!email || !password) {
      return res.status(400).json({
        message:
          "Email and password are required"
      });
    }


    const normalizedEmail = email
      .trim()
      .toLowerCase();


    // -----------------------------------------------
    // Find user
    // -----------------------------------------------

    const user = await User.findOne({
      email: normalizedEmail
    });


    if (!user) {
      return res.status(401).json({
        message:
          "Invalid email or password"
      });
    }


    // -----------------------------------------------
    // Compare password
    // -----------------------------------------------

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );


    if (!isMatch) {
      return res.status(401).json({
        message:
          "Invalid email or password"
      });
    }


    // -----------------------------------------------
    // Create JWT
    // -----------------------------------------------

    const token = jwt.sign(

      {
        id: user._id,
        name: user.name,
        email: user.email,
        studentId: user.studentId,
        role: user.role
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "1d"
      }

    );


    // -----------------------------------------------
    // Send response
    // -----------------------------------------------

    res.json({

      message:
        "Login successful",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        studentId: user.studentId,
        role: user.role
      }

    });

  } catch (error) {

    console.log(
      "Login Error:",
      error.message
    );

    res.status(500).json({
      message: error.message
    });
  }
};



module.exports = {
  registerUser,
  loginUser
};