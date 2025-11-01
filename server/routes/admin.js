const express = require('express');
const router = express.Router();
const Merchant = require('../models/Merchant');

// مثال لإدارة التجار
router.delete('/merchant/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Merchant.findByIdAndDelete(id);
        res.json({ success: true, message: "تم حذف التاجر" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
