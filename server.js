require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const sequelize = require('./config/db');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);

sequelize.sync().then(() => console.log('Database connected'));

app.listen(5000, () => console.log('Server running on port 5000'));
