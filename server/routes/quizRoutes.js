const express = require('express');
const router = express.Router();

const {
  createQuiz,
  getQuizzesBySubject
} = require('../controllers/quizController');

const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createQuiz);

router.get('/:subjectId', protect, getQuizzesBySubject);

module.exports = router;