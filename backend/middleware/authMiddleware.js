const jwt = require("jsonwebtoken");

// ==========================================
// AUTHENTICATION MIDDLEWARE
// ==========================================

const protect = (req, res, next) => {
  try {
    // Get Authorization header
    const authHeader = req.headers.authorization;

    // Check token
    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        message: "Not authorized. Please login."
      });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Store user information in request
    req.user = decoded;

    next();

  } catch (error) {
    console.log("Authentication Error:", error.message);

    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};


// ==========================================
// ADMIN MIDDLEWARE
// ==========================================

const adminOnly = (req, res, next) => {

  if (!req.user) {
    return res.status(401).json({
      message: "Not authorized"
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied. Admin only."
    });
  }

  next();
};


module.exports = {
  protect,
  adminOnly
};