import mongoose from "mongoose";

const DesignationSchema = new mongoose.Schema({
  DesignationName: { type: String, required: true, unique: true },
  departmentStatus: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
}, { timestamps: true });


export default mongoose.model('Designation', DesignationSchema);