const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function generateAIQuiz(subject) {
  try {
    const prompt = `Generate 5 MCQs for ${subject} in JSON format`;

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    let text = result.text;

    return JSON.parse(
      text.replace(/```json|```/g, "").trim()
    );

  } catch (err) {
    console.log("❌ GEMINI ERROR:", err.message);
    return [];
  }
}

module.exports = { generateAIQuiz };