import express from "express";
import {create_Account_Employee, Employee_Login} from '../controllers/createAccountRoutes.js'; 




const router = express.Router();

// Register
router.post('/employee/register',create_Account_Employee);

// Login
router.post('/employee/login',Employee_Login );

export default router;
