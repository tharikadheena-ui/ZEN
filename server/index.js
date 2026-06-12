require("dotenv").config();
console.log("GEMINI:", process.env.GEMINI_API_KEY);
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const { protect } = require('./middleware/authMiddleware');
const quizRoutes = require('./routes/quizRoutes');
const aiRoutes = require('./routes/aiRoutes');
const resultRoutes = require("./routes/resultRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/ai', aiRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/results/analytics", require("./routes/analyticsRoutes"));
app.use("/api/analytics", analyticsRoutes);
app.get('/', (req, res) => {
    res.json({message: 'Zen API is running!'});
});
app.get('/api/protected', protect, (req, res) => {
  res.json({ message: `Hello ${req.user.name}, you are authorized! 🔐` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`ZEN server running on port ${PORT}`);;
});