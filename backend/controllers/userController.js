const User = require("../models/User");
const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// =====================================================
// NEW STUDENT REGISTRATION
// =====================================================

const registerUser = async (req, res) => {
  try {

    const {
      studentId,
      name,
      email,
      password
    } = req.body;

    if (!studentId || !name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields"
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check whether User account already exists
    const existingUser = await User.findOne({
      email: normalizedEmail
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "This email already has a login account. Please login."
      });
    }

    // Check whether student was already added by Admin
    const existingStudent = await Student.findOne({
      studentId: studentId.trim()
    });

    // =================================================
    // CASE 1: STUDENT WAS ALREADY ADDED BY ADMIN
    // =================================================

    if (existingStudent) {

      // Check email entered by student
      if (
        existingStudent.email.toLowerCase().trim() !==
        normalizedEmail
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Student ID exists, but the email does not match the email registered by the administrator."
        });
      }

      // Check name
      if (
        existingStudent.name.toLowerCase().trim() !==
        name.toLowerCase().trim()
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Student name does not match the administrator's record."
        });
      }

      // Create login password
      const hashedPassword = await bcrypt.hash(
        password,
        10
      );

      const user = await User.create({
        name: existingStudent.name,
        email: normalizedEmail,
        password: hashedPassword,
        studentId: existingStudent.studentId
      });

      return res.status(201).json({
        success: true,
        type: "existing_student",
        message:
          "Your student record was already added by the administrator. Your login account has been activated successfully.",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          studentId: user.studentId
        }
      });
    }


    // =================================================
    // CASE 2: COMPLETELY NEW STUDENT
    // =================================================

    return res.status(404).json({
      success: false,
      type: "new_student",
      message:
        "Student record not found. Please use New Student Registration."
    });

  } catch (error) {

    console.log(
      "Registration Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message
    });
  }
};


// =====================================================
// COMPLETELY NEW STUDENT REGISTRATION
// =====================================================

const registerNewStudent = async (req, res) => {

  try {

    const {
      studentId,
      name,
      email,
      password,
      phone,
      department,
      year,
      cgpa,
      attendance,
      internalMarks,
      assignmentMarks,
      previousMarks,
      studyHours,
      backlogs
    } = req.body;


    if (
      !studentId ||
      !name ||
      !email ||
      !password ||
      !department ||
      !year ||
      cgpa === undefined ||
      attendance === undefined ||
      internalMarks === undefined ||
      assignmentMarks === undefined ||
      previousMarks === undefined ||
      studyHours === undefined ||
      backlogs === undefined
    ) {

      return res.status(400).json({
        success: false,
        message: "Please fill all required fields"
      });

    }


    const normalizedEmail =
      email.toLowerCase().trim();


    // Check existing user

    const existingUser =
      await User.findOne({
        email: normalizedEmail
      });


    if (existingUser) {

      return res.status(400).json({
        success: false,
        message:
          "This email already has an account. Please login."
      });

    }


    // Check existing student

    const existingStudent =
      await Student.findOne({
        studentId: studentId.trim()
      });


    if (existingStudent) {

      return res.status(400).json({
        success: false,
        message:
          "This Student ID already exists. Please use Activate Account."
      });

    }


    // Hash password

    const hashedPassword =
      await bcrypt.hash(password, 10);


    // Create student

    const student =
      await Student.create({

        studentId: studentId.trim(),

        name,

        email: normalizedEmail,

        phone,

        department,

        year: Number(year),

        cgpa: Number(cgpa),

        attendance: Number(attendance),

        internalMarks:
          Number(internalMarks),

        assignmentMarks:
          Number(assignmentMarks),

        previousMarks:
          Number(previousMarks),

        studyHours:
          Number(studyHours),

        backlogs:
          Number(backlogs)

      });


    // Create user

    const user =
      await User.create({

        name,

        email: normalizedEmail,

        password: hashedPassword,

        studentId:
          student.studentId

      });


    res.status(201).json({

      success: true,

      type: "new_student",

      message:
        "New student registration successful.",

      user: {

        id: user._id,

        name: user.name,

        email: user.email,

        studentId:
          user.studentId

      }

    });


  } catch (error) {

    console.log(
      "New Registration Error:",
      error
    );

    res.status(500).json({

      success: false,

      message:
        "New registration failed",

      error: error.message

    });

  }

};


// =====================================================
// LOGIN
// =====================================================

const loginUser = async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;


    if (!email || !password) {

      return res.status(400).json({

        success: false,

        message:
          "Please enter email and password"

      });

    }


    const normalizedEmail =
      email.toLowerCase().trim();


    const user =
      await User.findOne({
        email: normalizedEmail
      });


    if (!user) {

      return res.status(401).json({

        success: false,

        message:
          "Invalid Email"

      });

    }


    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );


    if (!isMatch) {

      return res.status(401).json({

        success: false,

        message:
          "Invalid Password"

      });

    }


    const token =
      jwt.sign(

        {
          id: user._id,

          email: user.email,

          studentId:
            user.studentId

        },

        process.env.JWT_SECRET,

        {
          expiresIn: "1d"
        }

      );


    res.status(200).json({

      success: true,

      message:
        "Login Successful",

      token,

      user: {

        id: user._id,

        name: user.name,

        email: user.email,

        studentId:
          user.studentId

      }

    });


  } catch (error) {

    console.log(
      "Login Error:",
      error
    );


    res.status(500).json({

      success: false,

      message:
        "Login failed",

      error: error.message

    });

  }

};


module.exports = {

  registerUser,

  registerNewStudent,

  loginUser

};