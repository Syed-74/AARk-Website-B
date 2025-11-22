// backend/routes/consultationRoute.js
import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";


dotenv.config();


const router = express.Router();

router.post("/", async (req, res) => {
  const data = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mx.mxmsin@gmail.com", // Your Gmail address
      pass: "ethgpqmktizzwzle",  // App password (not regular password)
    }
  });

  const mailOptions = {
    from: data.email,
    to: "syednusrath380@gmail.com",
    subject: "New Consultation Request",
    text: `
      First Name: ${data.firstName}
      Last Name: ${data.lastName}
      DOB: ${data.dob}
      Email: ${data.email}
      Phone: ${data.phone}
      Address: ${data.address}
      Gender: ${data.gender}
      English Proficiency: ${data.englishProficiency}
      Referral: ${data.referral}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Consultation request sent successfully." });
  } catch (error) {
    console.error("Email sending failed:", error);
    res.status(500).json({ message: "Failed to send email." });
  }
});

export default router;
