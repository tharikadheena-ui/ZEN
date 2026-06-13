const aiUtils = require('../utils/ai');
console.log("AI UTILS:", aiUtils);
const Quiz = require('../models/Quiz');
const Subject = require('../models/Subject');



/* ---------------- CREATE QUIZ ---------------- */

const createQuiz = async (req, res) => {
  try {
    const { title, subject } = req.body;
   const questions = await aiUtils.generateAIQuiz(subject);

    const quiz = await Quiz.create({
      title,
      subject,
      questions,
      user: req.user._id
    });
    console.log("💾 QUIZ CREATED:", quiz);
    res.status(201).json(quiz);

  } catch (error) {
    console.log("❌ CREATE QUIZ ERROR:", error);
    res.status(500).json({
      message: error.message
    });
  }
};

/* ---------------- AUTO QUIZ ---------------- */

const createQuizAuto = async (req, res) => {
  try {

    const { subjectId } = req.body;

    console.log("🔥 AUTO QUIZ ROUTE HIT");
    console.log("📚 SUBJECT ID:", subjectId);
  
    const subjectDoc = await Subject.findById(subjectId);

    if (!subjectDoc) {
      return res.status(404).json({
        message: "Subject not found"
      });
    }

    const subjectName = subjectDoc.name;

    console.log("📖 SUBJECT NAME:", subjectName);

    const questions = await aiUtils.generateAIQuiz(subjectName);

    console.log("🧠 QUESTIONS GENERATED:", questions.length);

    const quiz = await Quiz.create({
      title: `${subjectName} Quiz`,
      subject: subjectId,
      questions,
      user: req.user._id
    });

    console.log("💾 QUIZ SAVED:", quiz._id);

    res.status(201).json(quiz);

  } catch (error) {
    console.log("❌ AUTO QUIZ ERROR:", error);
    res.status(500).json({
      message: error.message
    });
  }
};

/* ---------------- GET QUIZZES BY SUBJECT ---------------- */

const getQuizzesBySubject = async (req, res) => {
  try {

    const quizzes = await Quiz.find({
      subject: req.params.subjectId,
      user: req.user._id
    });

    res.json(quizzes);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

/* ---------------- GET QUIZ BY ID ---------------- */

const getQuizById = async (req, res) => {
  try {

    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        message: 'Quiz not found'
      });
    }

    res.json(quiz);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  createQuiz,
  createQuizAuto,
  getQuizzesBySubject,
  getQuizById
};