import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["Employee", "HR", "Admin"], default: "Employee" },
  timezone: { type: String, default: "Asia/Kolkata" },
});

export default mongoose.model("Employee", employeeSchema);
