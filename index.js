const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config()
const anakRoutes = require('./routes/anakRoutes');

const app = express();
app.use(bodyParser.json());

// Koneksi ke MongoDB
mongoose.connect(process.env.MONGO_URI, {}).then(() => {
  console.log('Koneksi ke MongoDB berhasil');
}).catch(err => {
  console.error('Koneksi ke MongoDB gagal', err);
});

// Gunakan routes untuk API
app.use('/api/anak', anakRoutes);

// Menjalankan server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
