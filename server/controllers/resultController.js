const Result = require('../models/Result');

const saveResult = async (req, res) => {
  try {
    const {
      quiz,
      subject,
      answers,
      score,
      totalQuestions,
      correctAnswers,
      percentage
    } = req.body;

    const result = await Result.create({
      quiz,
      subject,
      answers,
      score,
      totalQuestions,
      correctAnswers,
      percentage,
      user: req.user._id
    });

    res.status(201).json(result);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  saveResult
};