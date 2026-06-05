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
        selected && selected === q.correctAnswer;

      if (isCorrect) correctAnswers++;

      formattedAnswers.push({
        questionId: q._id,
        selectedAnswer: selected || "",
        correctAnswer: q.correctAnswer,
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

module.exports = router;