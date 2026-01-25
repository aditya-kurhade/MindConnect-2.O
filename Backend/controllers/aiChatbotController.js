const { generateAIResponse } = require('../services/ollama.service');

const chatWithAI = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ success: false, error: 'Prompt is required' });
    }

    const aiResponse = await generateAIResponse(prompt);

    return res.status(200).json({
      success: true,
      data: aiResponse,
    });
  } catch (error) {
    console.error('chatWithAI error:', error);
    return res.status(200).json({
      success: false,
      error: 'AI service unavailable right now. Please try again shortly.',
    });
  }
};

module.exports = { chatWithAI };
