require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// CORS aktivieren, damit deine Webseite darauf zugreifen kann
const cors = require('cors');
app.use(cors());

// Middleware, um JSON-Anfragen zu parsen
app.use(express.json());

// Route, die die Chatbot-Nachrichten verarbeitet
app.post('/api/chat', async (req, res) => {
  const userInput = req.body.prompt;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'text-davinci-003',
        prompt: userInput,
        max_tokens: 150,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Fehler bei der Kommunikation mit der OpenAI API' });
  }
});

app.listen(port, () => {
  console.log(`Server läuft unter http://localhost:${port}`);
});
