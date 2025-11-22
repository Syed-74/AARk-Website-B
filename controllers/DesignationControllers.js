import Designation  from "../models/DesignationModules.js";

// Add Designation
const Add_Designation = async (req, res) => {
  const { DesignationName, departmentStatus } = req.body;
  try {
    const newDesignation = new Designation({
      DesignationName,
      departmentStatus,
    });
    await newDesignation.save();
    res.status(201).json({
      message: "Designation added successfully",
      designation: newDesignation,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Designation already exists" });
    }
    res.status(500).json({ error: "Failed to add designation" });
  }
};

// Get All Designations
const Get_Designation = async (req, res) => {
  try {
    const designations = await Designation.find().sort({ createdAt: -1 });
    if (!designations) {
      return res.status(500).json({ message: "No designations found" });
    }

    res.status(200).json(designations);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || "Failed to fetch designations" });
  }
};

// Delete Designation
const Delete_Designation = async (req, res) => {
  try {
    const deleted = await Designation.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Designation not found" });
    res.status(200).json({ message: "Designation deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete designation" });
  }
};

// Update Designation
const Update_Designation = async (req, res) => {
  const { DesignationName, departmentStatus } = req.body;
  try {
    const updated = await Designation.findByIdAndUpdate(
      req.params.id,
      { DesignationName, departmentStatus },
      { new: true, runValidators: true }
    );
    if (!updated)
      return res.status(404).json({ message: "Designation not found" });
    res.status(200).json({
      message: "Designation updated successfully",
      designation: updated,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Designation already exists" });
    }
    res.status(500).json({ error: "Failed to update designation" });
  }
};

export { Add_Designation, Get_Designation, Delete_Designation, Update_Designation };
