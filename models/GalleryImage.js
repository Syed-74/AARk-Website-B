const mongoose = require('mongoose');

const GalleryImageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

module.exports = mongoose.model('GalleryImage', GalleryImageSchema);




// const mongoose = require('mongoose');
// module.exports = mongoose.model('GalleryImage', new mongoose.Schema({
//   name: { type: String, required: true },
//   imageUrl: { type: String, required: true }
// }));
