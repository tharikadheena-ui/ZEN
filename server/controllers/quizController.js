const Quiz = require('../models/Quiz');

// Create Quiz
const createQuiz = async (req, res) => {
  try {
    const { title, subject, questions } = req.body;

    const quiz = await Quiz.create({
      title,
      subject,
      questions,
      user: req.user._id
    });

    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get quizzes by subject
const getQuizzesBySubject = async (req, res) => {
  try {
    const quizzes = await Quiz.find({
      subject: req.params.subjectId,
      user: req.user._id
    });

    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createQuiz,
  getQuizzesBySubject
};