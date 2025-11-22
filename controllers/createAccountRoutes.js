import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import CreateAccount from "../models/CreateAccount.js";

// Register
const create_Account_Employee = async (req, res) => {
  try {
    // console.log("======", req.body);
    const { email, employeeId, password, department } = req.body;
    if (!email.endsWith("@aark.tech")) {
      return res.status(400).json({ error: "Email must end with @aark.tech" });
    }
    console.log('===>email',email)
    const emailExists = await CreateAccount.findOne({email:email});
    if (emailExists) {
      return res.status(500).json({ error: "Email already exists" });
    } 
    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log('======> pass',hashedPassword);
    const newUser = new CreateAccount({
      ...req.body,
      password: hashedPassword,
    });
    console.log('===> new user create',newUser);
    await newUser.save();
   return res.status(201).json({ message: "Account created successfully" });
  } catch (err) {
    // if (err.code === 11000) {
    //   return res.status(400).json({ error: 'Email or Employee ID already exists',err });
    // }
   return ( 
    res.status(500).json({ error: "Failed to create account", err:err.message }))
  }
};

// Login
const Employee_Login = async (req, res) => {
  const { emailOrId, password } = req.body;
  console.log("===> login req body", req.body);
  if (!emailOrId || !password) {
    return res.status(400).json({ error: "Email/ID and password are required" });
  }

  try {
    const user = await CreateAccount.findOne({
      $or: [{ email: emailOrId }, { employeeId: emailOrId }],
    });

    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role, department: user.department },
      process.env.JWT_SECRET || "somecjbcnbcshbVerySecretKey",
      { expiresIn: "1d" }
    );

    res.status(201).json({ token, role: user.role, department: user.department });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};



export { create_Account_Employee, Employee_Login };