const express = require('express');
const router = express.Router();
const Merchant = require('../models/Merchant');

// إنشاء تاجر جديد (تجريبي)
router.post('/create', async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const merchant = new Merchant({ name, email, phone });
        await merchant.save();
        res.json({ success: true, merchant });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// جلب جميع التجار
router.get('/', async (req, res) => {
    const merchants = await Merchant.find();
    res.json({ success: true, merchants });
});

module.exports = router;
