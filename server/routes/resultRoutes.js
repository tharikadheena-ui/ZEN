const express = require("express");
const router = express.Router();

const Result = require("../models/Result");
const Quiz = require("../models/Quiz");

// 🧠 Submit Quiz
router.post("/submit", async (req, res) => {
  try {
    const { userId, quizId, subjectId, answers } = req.body;

    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    let correctAnswers = 0;
    let formattedAnswers = [];

    quiz.questions.forEach((q) => {
      const userAnswer = answers.find(
        (a) => a.questionId === q._id.toString()
      );

      const selected = userAnswer?.selectedAnswer;

      const isCorrect =
        selected && selected === q.answer;

      if (isCorrect) correctAnswers++;

      formattedAnswers.push({
        questionId: q._id,
        selectedAnswer: selected || "",
        correctAnswer: q.answer,
        isCorrect,
      });
    });

    const totalQuestions = quiz.questions.length;
    const score = correctAnswers;
    const percentage = (score / totalQuestions) * 100;

    const result = await Result.create({
      user: userId,
      quiz: quizId,
      subject: subjectId,
      answers: formattedAnswers,
      score,
      totalQuestions,
      correctAnswers,
      percentage,
    });

    res.json({
      success: true,
      message: "Quiz submitted successfully 🎉",
      result,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// 📊 Analytics
router.get("/analytics/:userId", async (req, res) => {
  try {
    const results = await Result.find({
      user: req.params.userId
    });

    if (results.length === 0) {
      return res.json({
        totalQuizzes: 0,
        averageScore: 0,
        accuracy: 0
      });
    }

    const totalQuizzes = results.length;

    const totalScore = results.reduce(
      (sum, result) => sum + result.score,
      0
    );

    const totalQuestions = results.reduce(
      (sum, result) => sum + result.totalQuestions,
      0
    );

    const averageScore = (
      totalScore / totalQuizzes
    ).toFixed(2);

    const accuracy = (
      (totalScore / totalQuestions) * 100
    ).toFixed(2);

    res.json({
      totalQuizzes,
      averageScore,
      accuracy
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

module.exports = router;