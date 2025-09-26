require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();

// Use Render-provided PORT or fallback to 
const PORT = process.env.PORT || 3000;


// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Optional endpoint
app.post('/chat', async (req, res) => {
    res.json({ reply: "This bot uses pre-programmed answers for the assessment." });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    // Only open browser locally
    if (process.platform === "win32") {
        try { exec(`start http://localhost:${PORT}`); } catch (err) { }
    }
});
