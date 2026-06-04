require('dotenv').config();
const { GoogleGenAI, Type } = require("@google/genai");
const Quiz = require("../models/Quiz");
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

const generateAIQuiz = async (req, res) => {
  const { topic, subjectId, questionCount = 5 } = req.body;
  const userId = req.user.id; // From your authMiddleware

  if (!topic || !subjectId) {
    return res.status(400).json({ message: "Topic and Subject ID are required." });
  }

  try {
    // Define the exact schema you want Gemini to return
    const quizSchema = {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        questions: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Exactly 4 multiple choice options"
              },
              answer: { 
                type: Type.STRING, 
                description: "The exact string match of the correct option from the options array" 
              }
            },
            required: ["question", "options", "answer"],
          },
        },
      },
      required: ["title", "questions"],
    };
    console.log(
  "GEMINI_API_KEY:",
  process.env.GEMINI_API_KEY ? "Loaded ✅" : "Missing ❌"
);

    // Call the Gemini API
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Create a comprehensive academic quiz about the topic: "${topic}". It must contain exactly ${questionCount} questions.`,
      config: {
        // These two lines force Gemini to return pristine JSON matching your schema
        responseMimeType: "application/json",
        responseSchema: quizSchema,
        temperature: 0.7, 
      },
    });

    // Parse the strict JSON string returned by Gemini
    const generatedData = JSON.parse(response.text);

    // Create and save the new quiz directly to your MongoDB database
    const newQuiz = new Quiz({
      title: generatedData.title || `${topic} AI Quiz`,
      subject: subjectId,
      user: userId,
      questions: generatedData.questions
    });

    const savedQuiz = await newQuiz.save();
    
    // Return the saved quiz to the frontend
    res.status(201).json(savedQuiz);

  } catch (error) {
    console.error("Gemini Generation Error:", error);
    res.status(500).json({ message: "AI generation failed", error: error.message });
  }
};
module.exports = {
  generateAIQuiz
};