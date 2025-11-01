const express = require('express');
const { handleMessage } = require('../controllers/botController');

const router = express.Router();

router.post('/message', handleMessage);

module.exports = router;
