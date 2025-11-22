// routes/contact.js
import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mx.mxmsin@gmail.com", // Replace with your Gmail
        pass: "ethgpqmktizzwzle",   // Use Gmail App Password
      },
    });

    await transporter.sendMail({
      from: `"Contact Form" <${email}>`,
      to: "syednusrath380@gmail.com",
      subject: `New Contact from ${name}`,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ message: "Failed to send email" });
  }
});

export default router;
