const express = require('express');
const router = express.Router();
const { generateToken } = require('../utils/jwt');

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // تجربة بسيطة للمستخدم التجريبي
    if (username === "admin" && password === "123456") {
        const token = generateToken({ username });
        return res.json({ success: true, token });
    }

    res.status(401).json({ success: false, message: "بيانات غير صحيحة" });
});

module.exports = router;
