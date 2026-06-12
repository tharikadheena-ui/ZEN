function generateInsights(stats) {

  const {
    totalQuizzes,
    accuracy
  } = stats;

  let level;

  if (accuracy >= 85)
    level = "Excellent";

  else if (accuracy >= 70)
    level = "Good";

  else if (accuracy >= 50)
    level = "Average";

  else
    level = "Needs Improvement";

  let summary = "";

  if (level === "Excellent") {
    summary =
      "Outstanding performance. You have a strong understanding of the subjects.";
  }

  if (level === "Good") {
    summary =
      "You have a good understanding of the topics and are progressing steadily.";
  }

  if (level === "Average") {
    summary =
      "You are learning well, but some topics need additional practice.";
  }

  if (level === "Needs Improvement") {
    summary =
      "Focus on consistent practice and revision to strengthen your understanding.";
  }

  return {
    level,
    summary,
    recommendation:
      "Review incorrect answers and focus on weaker topics.",
    motivation:
      "Consistency beats intensity. Keep practicing and improving."
  };
}

module.exports = generateInsights;