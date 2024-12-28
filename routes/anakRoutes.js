// routes/anakRoutes.js
const express = require('express');
const router = express.Router();
const Anak = require('../models/anak');
const ValidationHelper = require('../helpers/validationHelper');

router.post('/add', async (req, res) => {
    try {
        const { error } = ValidationHelper.addAnakValidation(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const anak = new Anak(req.body);
        await anak.save();
        res.status(201).json(anak);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (_, res) => {
    try {
        const anak = await Anak.find();
        res.status(200).json(anak);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const anak = await Anak.findById(req.params.id);
        if (!anak)  return res.status(404).json({ message: 'Anak tidak ditemukan' });
        
        res.status(200).json(anak);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { error } = ValidationHelper.addAnakValidation(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        const anak = await Anak.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!anak)  return res.status(404).json({ message: 'Anak tidak ditemukan' });

        res.status(200).json(anak);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const anak = await Anak.findByIdAndDelete(req.params.id);
        if (!anak) {
            return res.status(404).json({ message: 'Anak tidak ditemukan' });
        }
        res.status(200).json({ message: 'Anak telah dihapus' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
