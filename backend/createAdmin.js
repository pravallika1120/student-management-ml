const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const User = require("./models/User");

dotenv.config();

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB connected");

    // Admin details
    const name = "Admin";
    const email = "admin@gmail.com";
    const password = "Admin@123";

    // Check whether admin already exists
    const existingAdmin = await User.findOne({
      email: email.toLowerCase()
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    const admin = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "admin"
    });

    console.log("=================================");
    console.log("Admin created successfully!");
    console.log("=================================");
    console.log("Email:", admin.email);
    console.log("Password:", password);
    console.log("Role:", admin.role);
    console.log("=================================");

    process.exit();

  } catch (error) {

    console.log("Admin creation error:");
    console.log(error.message);

    process.exit(1);
  }
};

createAdmin();