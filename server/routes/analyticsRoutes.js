const express = require("express");
const router = express.Router();

const generateInsights = require("../utils/generateInsights");

const Result = require("../models/Result");

// 📊 GET USER ANALYTICS
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

   const results = await Result.find();
   console.log(results);

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
    const accuracy = totalQuestions > 0 ? (totalScore / totalQuestions) * 100 : 0;
    const insights = generateInsights({totalQuizzes, accuracy});

   res.json({
  totalQuizzes,
  averageScore: averageScore.toFixed(2),
  accuracy: accuracy.toFixed(2),
  insights,
  message: "Analytics generated 🚀",
});

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;