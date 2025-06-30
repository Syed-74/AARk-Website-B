// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const router = express.Router();
// const GalleryImage = require('../models/GalleryImage');

// // Ensure uploads directory exists
// const uploadDir = path.join(__dirname, '..', 'uploads');
// if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// // Multer config
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, uploadDir),
//   filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
// });
// const upload = multer({ storage });

// // POST /api/gallery/add - Upload an image
// router.post('/add', upload.single('image'), async (req, res) => {
//   try {
//     const { name } = req.body;
//     if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

//     const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
//     const newImage = new GalleryImage({ name, imageUrl });
//     await newImage.save();

//     res.status(201).json(newImage);
//   } catch (err) {
//     console.error('Upload error:', err);
//     res.status(500).json({ message: 'Failed to upload image' });
//   }
// });


// router.delete('/:id', async (req, res) => {
//     try {
//       const deleted = await GalleryImage.findByIdAndDelete(req.params.id);
//       if (!deleted) return res.status(404).json({ message: 'Image not found' });
//       res.status(200).json({ message: 'Image deleted successfully' });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: 'Server error' });
//     }
//   });
  
// // GET /api/gallery - Get all gallery images
// router.get('/', async (req, res) => {
//   try {
//     const images = await GalleryImage.find().sort({ _id: -1 });
//     res.json(images);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching gallery images' });
//   }
// });

// module.exports = router;



const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const GalleryImage = require('../models/GalleryImage');
const router = express.Router();

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { name } = req.body;
    const url = `/uploads/${req.file.filename}`;  // 👉 relative path!
    const img = await new GalleryImage({ name, imageUrl: url }).save();
    res.status(201).json(img);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Upload failed' });
  }
});

router.get('/', async (req, res) => {
  const imgs = await GalleryImage.find().sort({ _id: -1 });
  res.json(imgs);
});

router.delete('/:id', async (req, res) => {
  await GalleryImage.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
