const express = require('express');
const router = express.Router();
const { handleTelegramMessage } = require('../utils/telegram');

router.post('/', async (req, res) => {
    const body = req.body;

    if (!body.message) return res.sendStatus(200);

    await handleTelegramMessage(body.message);
    res.sendStatus(200);
});

module.exports = router;
