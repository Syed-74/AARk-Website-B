import express from "express";
import mongoose from 'mongoose';
import {Add_Department,Get_department,Delete_Department,Update_Department} from '../controllers/DapartmentConrollers.js';


const router = express.Router();



router.post('/Create/Department',  Add_Department);
router.get('/Get/Department',  Get_department);
router.delete('/Delete/Department/:id',  Delete_Department);
router.put('/Update/Department/:id',  Update_Department);   

export default router;