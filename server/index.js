const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.json({message: 'Zen API is running!'});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`ZEN server running on port ${PORT}`);;
});