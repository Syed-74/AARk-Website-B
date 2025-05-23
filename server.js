const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const galleryRoutes = require('./routes/galleryRoutes');;
const consultationRoutes = require('./routes/consultation');
const contactRoute = require("./routes/contact"); 
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (e.g. uploaded images)
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/gallery', galleryRoutes); 
app.use('/api/consultation', consultationRoutes);
app.use("/api/contact", contactRoute);
// Start server
app.listen(PORT, (err) => {
  if (err) {
    console.error('❌ Error starting server:', err);
    return;
  }
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
