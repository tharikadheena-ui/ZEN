const express = require('express');
const router = express.Router();
const {
  createQuiz,
  getQuizzesBySubject,
  getQuizById
} = require('../controllers/quizController');

const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createQuiz);

router.get('/:subjectId', protect, getQuizzesBySubject);

router.get('/single/:id', protect, getQuizById);

module.exports = router;