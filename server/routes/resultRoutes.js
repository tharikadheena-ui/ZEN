const express = require("express");
const router = express.Router();

const Result = require("../models/Result");
const Quiz = require("../models/Quiz");

// 🧠 SUBMIT QUIZ
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
        (a) => a.questionId?.toString() === q._id.toString()
      );

      const selected = userAnswer?.selectedAnswer || "";

      // FIX: support both schemas safely
   let correct = q.answer || q.correctAnswer;

if (
  correct === "0" ||
  correct === "1" ||
  correct === "2" ||
  correct === "3"
) {
  correct = q.options[parseInt(correct)];
}
      console.log("Q:", q.question);
      console.log("USER:", selected);
      console.log("CORRECT:", correct);

      const isCorrect =
        selected &&
        correct &&
        selected.toString().trim().toLowerCase() ===
        correct.toString().trim().toLowerCase();

      console.log("MATCH:", isCorrect);

      if (isCorrect) correctAnswers++;

      formattedAnswers.push({
        questionId: q._id,
        selectedAnswer: selected,
        correctAnswer: correct,
        isCorrect,
      });
    });

    const totalQuestions = quiz.questions.length;
    const score = correctAnswers;

    const percentage =
      totalQuestions === 0
        ? 0
        : (score / totalQuestions) * 100;

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