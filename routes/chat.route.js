import express from 'express';
import { model } from '../services/gemini.js';
import { chatPrompt } from '../services/prompts.js';

const router = express.Router();

router.post('/chat', async (req, res) => {
  try {
    const { content, history, message } = req.body;

    if (!content || !message) {
      return res.status(400).json({
        message: 'Missing required fields',
      });
    }

    const prompt = chatPrompt(content, history || [], message);

    const result = await model.generateContent(prompt);

    const reply = result.response.text();

    res.json({ reply });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Chat request failed',
    });
  }
});

export default router;