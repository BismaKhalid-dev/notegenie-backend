import express from 'express';
import { model } from '../services/gemini.js';
import { summaryPrompt } from '../services/prompts.js';
import { extractJson } from '../utils/extractJson.js';

const router = express.Router();


router.post('/summarize', async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        message: 'Content is required',
      });
    }

    const prompt = summaryPrompt(content);

    const result = await model.generateContent(prompt);

    const response = result.response.text();

    const data = extractJson(response);

    res.json(data);
  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      message: 'Failed to generate summary',
      error:
        process.env.NODE_ENV === 'production' ? undefined : error.message,
    });
  }
});
export default router;
