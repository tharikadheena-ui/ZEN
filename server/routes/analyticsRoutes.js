const express = require("express");
const router = express.Router();

const Result = require("../models/Result");

// 📊 GET USER ANALYTICS
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const results = await Result.find({ user: userId });

    if (!results.length) {
      return res.json({
        message: "No quiz attempts yet 😢",
      });
    }

    let totalQuizzes = results.length;
    let totalScore = 0;
    let totalQuestions = 0;

    results.forEach((r) => {
      totalScore += r.score;
      totalQuestions += r.totalQuestions;
    });

    const averageScore = totalScore / totalQuizzes;
    const accuracy = (totalScore / totalQuestions) * 100;

    res.json({
      totalQuizzes,
      averageScore,
      accuracy: accuracy.toFixed(2),
      message: "Analytics generated 🚀",
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;