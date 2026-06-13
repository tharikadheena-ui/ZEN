require("dotenv").config();

const Groq = require("groq-sdk");
const Quiz = require("../models/Quiz");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateAIQuiz = async (req, res) => {
  const { topic, subjectId, questionCount = 5 } = req.body;
  const userId = req.user.id;

  if (!topic || !subjectId) {
    return res.status(400).json({
      message: "Topic and Subject ID are required",
    });
  }

  try {
    const prompt = `
Generate 5 MCQs for ${subject}.

Return ONLY a JSON array.

Example:

[
  {
    "question": "Question?",
    "options": ["A","B","C","D"],
    "answer": "A"
  }
]
IMPORTANT:
The answer field must contain the exact text of the correct option.
Do not return 0,1,2,3.
Do not return A,B,C,D.
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const text = completion.choices[0].message.content;

    const generatedData = JSON.parse(
      text.replace(/```json|```/g, "").trim()
    );

    const newQuiz = new Quiz({
      title: generatedData.title,
      subject: subjectId,
      user: userId,
      questions: generatedData.questions,
    });

    const savedQuiz = await newQuiz.save();

    res.status(201).json(savedQuiz);

  } catch (error) {
    console.error("GROQ ERROR:", error);

    res.status(500).json({
      message: "Quiz generation failed",
      error: error.message,
    });
  }
};

module.exports = {
  generateAIQuiz,
};