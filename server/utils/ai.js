const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function generateAIQuiz(subject) {
  try {
    const prompt = `Generate 5 MCQs for ${subject} in JSON format.
Return ONLY valid JSON array.`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    const text = completion.choices[0].message.content;
    console.log(text);
    return JSON.parse(
      text.replace(/```json|```/g, "").trim()
    );

  } catch (err) {
  console.log("❌ GROQ ERROR:");
  console.log(err);

  throw err;
}
  }

module.exports = { generateAIQuiz };