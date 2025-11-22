import express from "express";
import Attendance from "../models/Attendance.js";

const router = express.Router();

// Admin can view all reviewed attendance
router.get("/all", async (req, res) => {
  try {
    const records = await Attendance.find({ reviewedByHR: true })
      .populate("employeeId", "fullName email")
      .sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: "Error fetching admin records" });
  }
});

export default router;
