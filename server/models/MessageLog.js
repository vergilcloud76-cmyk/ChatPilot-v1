const mongoose = require('mongoose');

const messageLogSchema = new mongoose.Schema({
    merchantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Merchant' },
    message: String,
    reply: String,
    chatId: Number,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MessageLog', messageLogSchema);
