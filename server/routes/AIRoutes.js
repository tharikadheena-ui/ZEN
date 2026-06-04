const express = require('express');
const router = express.Router();

const { generateAIQuiz } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.post('/generate-ai', protect, generateAIQuiz);

module.exports = router;