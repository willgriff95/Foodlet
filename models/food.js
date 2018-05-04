const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  image: { type: String, required: true },
  active: { type: Boolean, default: true }

},{
  timestamps: true
});

module.exports = mongoose.model('Food', foodSchema);
