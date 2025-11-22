import express from "express";
import {Add_Designation, Get_Designation, Delete_Designation, Update_Designation } from '../controllers/DesignationControllers.js';


const router = express.Router();
router.post('/create/designation', Add_Designation);
router.get('/get/designation', Get_Designation);
router.delete('/delete/designation/:id', Delete_Designation);
router.put('/update/designation/:id', Update_Designation);


export default router;