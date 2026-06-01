const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const { protect } = require('./middleware/authMiddleware');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/subjects', subjectRoutes);

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