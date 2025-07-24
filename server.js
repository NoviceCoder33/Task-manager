require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
app.use(cors({
  origin: ['http://localhost:3000', 'https://task-manager-3z7p.onrender.com'],
  credentials: true
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));