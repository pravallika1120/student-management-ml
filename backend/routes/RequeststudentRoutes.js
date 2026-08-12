const express = require("express");

const {
  createStudentRequest,
  getStudentRequests,
  approveStudentRequest,
  rejectStudentRequest
} = require("../controllers/studentRequestController");

const router = express.Router();


// New student submits registration request
router.post("/", createStudentRequest);


// Admin views all registration requests
router.get("/", getStudentRequests);


// Admin approves request
router.put("/:id/approve", approveStudentRequest);


// Admin rejects request
router.put("/:id/reject", rejectStudentRequest);


module.exports = router;