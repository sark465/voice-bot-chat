require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Use Vercel-provided PORT or fallback to 5000
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Optional chat endpoint
app.post('/chat', (req, res) => {
    res.json({ reply: "This bot uses pre-programmed answers for the assessment." });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
