const StudentRequest = require("../models/StudentRequest");
const Student = require("../models/Student");


// =====================================================
// CREATE NEW STUDENT REGISTRATION REQUEST
// =====================================================

const createStudentRequest = async (req, res) => {
  try {

    const {
      name,
      email,
      phone,
      department,
      year
    } = req.body;


    // -----------------------------------------------
    // Validate required fields
    // -----------------------------------------------

    if (
      !name ||
      !email ||
      !phone ||
      !department ||
      !year
    ) {
      return res.status(400).json({
        message: "Please fill all required fields"
      });
    }


    const normalizedEmail = email
      .trim()
      .toLowerCase();


    // -----------------------------------------------
    // Check whether student already exists
    // -----------------------------------------------

    const existingStudent = await Student.findOne({
      email: normalizedEmail
    });


    if (existingStudent) {
      return res.status(400).json({
        message:
          "Student already exists in the system. Please use Activate Student Account."
      });
    }


    // -----------------------------------------------
    // Check existing request
    // -----------------------------------------------

    const existingRequest =
      await StudentRequest.findOne({
        email: normalizedEmail,
        status: "pending"
      });


    if (existingRequest) {
      return res.status(400).json({
        message:
          "Your registration request is already pending."
      });
    }


    // -----------------------------------------------
    // Create request
    // -----------------------------------------------

    const request =
      await StudentRequest.create({

        name: name.trim(),

        email: normalizedEmail,

        phone: phone.trim(),

        department: department.trim(),

        year: Number(year),

        status: "pending"

      });


    // -----------------------------------------------
    // Response
    // -----------------------------------------------

    res.status(201).json({

      message:
        "Registration request submitted successfully. Please wait for Admin approval.",

      request

    });

  } catch (error) {

    console.log(
      "Create Student Request Error:",
      error.message
    );

    res.status(500).json({
      message: error.message
    });

  }
};



// =====================================================
// GET ALL STUDENT REQUESTS
// ADMIN USE
// =====================================================

const getStudentRequests = async (req, res) => {
  try {

    const requests =
      await StudentRequest.find()
        .sort({ createdAt: -1 });


    res.json(requests);

  } catch (error) {

    console.log(
      "Get Student Requests Error:",
      error.message
    );

    res.status(500).json({
      message: error.message
    });

  }
};



// =====================================================
// APPROVE STUDENT REQUEST
// ADMIN USE
// =====================================================

const approveStudentRequest = async (req, res) => {
  try {

    const request =
      await StudentRequest.findById(
        req.params.id
      );


    // -----------------------------------------------
    // Check request
    // -----------------------------------------------

    if (!request) {
      return res.status(404).json({
        message: "Registration request not found"
      });
    }


    // -----------------------------------------------
    // Check status
    // -----------------------------------------------

    if (request.status !== "pending") {
      return res.status(400).json({
        message:
          "This registration request has already been processed."
      });
    }


    // -----------------------------------------------
    // Check duplicate student
    // -----------------------------------------------

    const existingStudent =
      await Student.findOne({
        email: request.email
      });


    if (existingStudent) {

      request.status = "approved";

      await request.save();


      return res.status(400).json({
        message:
          "Student already exists in the Student records."
      });

    }


    // -----------------------------------------------
    // Generate Student ID
    // -----------------------------------------------

    const studentCount =
      await Student.countDocuments();


    const studentId =
      `STU${String(studentCount + 1).padStart(3, "0")}`;


    // -----------------------------------------------
    // Add student to Student collection
    // -----------------------------------------------

    const student =
      await Student.create({

        studentId,

        name: request.name,

        email: request.email,

        phone: request.phone,

        department: request.department,

        year: request.year,

        cgpa: 0,

        attendance: 0,

        internalMarks: 0,

        assignmentMarks: 0,

        previousMarks: 0,

        studyHours: 0,

        backlogs: 0

      });


    // -----------------------------------------------
    // Update request status
    // -----------------------------------------------

    request.status = "approved";

    await request.save();


    // -----------------------------------------------
    // Response
    // -----------------------------------------------

    res.json({

      message:
        "Student approved and added successfully.",

      student

    });

  } catch (error) {

    console.log(
      "Approve Student Request Error:",
      error.message
    );

    res.status(500).json({
      message: error.message
    });

  }
};



// =====================================================
// REJECT STUDENT REQUEST
// ADMIN USE
// =====================================================

const rejectStudentRequest = async (req, res) => {
  try {

    const request =
      await StudentRequest.findById(
        req.params.id
      );


    if (!request) {
      return res.status(404).json({
        message: "Registration request not found"
      });
    }


    if (request.status !== "pending") {
      return res.status(400).json({
        message:
          "This registration request has already been processed."
      });
    }


    request.status = "rejected";

    await request.save();


    res.json({

      message:
        "Student registration request rejected."

    });

  } catch (error) {

    console.log(
      "Reject Student Request Error:",
      error.message
    );

    res.status(500).json({
      message: error.message
    });

  }
};



module.exports = {
  createStudentRequest,
  getStudentRequests,
  approveStudentRequest,
  rejectStudentRequest
};