const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Połączono z MongoDB Atlas'))
    .catch(err => console.error('❌ Błąd połączenia z MongoDB', err));

app.get('/', (req, res) => {
    res.send('Spiwiarnia backend działa!')
});

// Start: 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('🚀 Server is running on port ${PORT}'));