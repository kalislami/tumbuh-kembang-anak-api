const mongoose = require('mongoose');

const anakSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true
  },
  usia: {
    type: Number,
    required: true
  },
  beratBadan: {
    type: Number,
    required: true
  },
  tinggiBadan: {
    type: Number,
    required: true
  },
  milestone: [{
    tipe: String,
    tanggal: Date,
    keterangan: String
  }]
});

module.exports = mongoose.model('Anak', anakSchema);
