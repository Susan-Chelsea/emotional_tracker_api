const express = require('express');
const dotenv = require('dotenv').config({path: './config.env'});

const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const journalRoutes = require('./src/routes/journalRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/journals', journalRoutes);
app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});