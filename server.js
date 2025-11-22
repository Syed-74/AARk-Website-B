import express from "express";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";


dotenv.config(); 


import CreateAccount from "./models/CreateAccount.js";
import connectDB from "./config/db.js";

// import galleryRoutes from "./routes/galleryRoutes.js";
import consultationRoutes from "./routes/consultation.js";
import contactRoute from "./routes/contact.js";
import createAccountRoutes from "./routes/CreateAccountRoutes.js";
import designationRoutes from "./routes/DesignationRoutes.js";
import departmentRoutes from "./routes/DepartmentRoutes.js";
import NotificationRoutes from "./routes/Notificaton.Routes.js"; 
import attendanceRoutes from "./routes/attendanceRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (e.g. uploaded images)
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Register routes
// app.use('/api/auth', authRoutes);
// app.use("/api/gallery", galleryRoutes);
app.use("/api/consultation", consultationRoutes);
app.use("/api/contact", contactRoute);
app.use("/api/accounts", createAccountRoutes);
// Login
// router.post('api/create/account/company', Employee_Login);

app.use("/api/designation", designationRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/notification",NotificationRoutes)
app.use("/api/attendance", attendanceRoutes);

// ==================create admin account if not exists==============

const create_Account_Admin = async (req, res) => {
  try {
    const emailExists = await CreateAccount.findOne({
      email: "MxAdmin@aark.tech",
    });
    if (emailExists) {
      return console.log("Admin account already exists");
    }
    password = "Admin@123";
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new CreateAccount({
      email: "MxAdmin@aark.tech",
      username: "MxAdmin",
      password: hashedPassword,
      role: "admin",
    });
    console.log("===> new user create", newUser);
    await newUser.save();
    console.log("Account created successfully");
    // return res.status(201).json({ message: "Account created successfully" });
  } catch (err) {
    console.log("===> err", err);
    // return res.status(500).json({ error: "Failed to create account", err: err.message });
  }
};

create_Account_Admin();
// =======================ends here=======================================
// Start server
app.listen(PORT, (err) => {
  if (err) {
    console.error("❌ Error starting server:", err);
    return;
  }
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
