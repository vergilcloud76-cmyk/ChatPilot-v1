import express from 'express';
const router = express.Router();

// مثال على endpoint
router.get('/', (req, res) => {
  res.send('مرحبًا! هذه الصفحة الرئيسية من Route الخاص بي.');
});

export default router;
