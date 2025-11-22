import e from "express";
import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema({
  departmentName: { type: String, required: true, unique: true },
  departmentHead: { type: String, required: true },
  departmentStatus: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
}, { timestamps: true });


export default mongoose.model('Department', DepartmentSchema);
