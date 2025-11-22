import express from "express";
import Department from "../models/DepartmentModels.js";
import router from "../routes/DepartmentRoutes.js";
// Add Department
const Add_Department = async (req, res) => {
    const { departmentName, departmentHead, departmentStatus } = req.body;
    try {
        const newDepartment = new Department({ departmentName, departmentHead, departmentStatus });
        await newDepartment.save();
        res.status(201).json({ message: 'Department added successfully' });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Department already exists' });
        }   
        res.status(500).json({ error: 'Failed to add department' });
    }   
};

// Get All Departments  
const Get_department = async (req, res) => {
    try {
        const departments = await Department.find().sort({ _id: -1 });  
        res.status(200).json(departments);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch departments' });
    }       
};
// Delete Department
const Delete_Department = async (req, res) => {
    try {
        const deleted = await Department.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Department not found' });
        res.status(200).json({ message: 'Department deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete department' });
    }
};
// Update Department
const Update_Department = async (req, res) => {
    const { departmentName, departmentHead, departmentStatus } = req.body;
    try {   
        const updated = await Department.findByIdAndUpdate(
            req.params.id,
            { departmentName, departmentHead, departmentStatus },
            { new: true, runValidators: true }  
        );
        if (!updated) return res.status(404).json({ message: 'Department not found' });
        res.status(200).json({ message: 'Department updated successfully', updated });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: 'Department already exists' });
        }
        res.status(500).json({ error: 'Failed to update department' });
    }
};

export { Add_Department, Get_department, Delete_Department, Update_Department };
