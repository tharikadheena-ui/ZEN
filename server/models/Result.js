const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },
  answers: [
    {
      question: String,
      selectedAnswer: String,
      correctAnswer: String,
      isCorrect: Boolean
    }
  ],
  score: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  correctAnswers: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;