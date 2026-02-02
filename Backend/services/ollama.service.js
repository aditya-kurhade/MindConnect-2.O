// services/ollama.service.js
const fetchFn = global.fetch || ((...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args))
);

const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434/api/generate';

const generateAIResponse = async (prompt) => {
  try {
    const response = await fetchFn(OLLAMA_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3:8b', 
        prompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API failed with status ${response.status}`);
    }

    const data = await response.json();

    // Ollama response may contain "response" or "completion"
    const aiText = data?.response || data?.completion;

    if (!aiText) throw new Error('Empty response from Ollama');

    return aiText;

  } catch (error) {
    console.error('Ollama service error:', error.message);
    return 'Sorry, the AI service is currently unavailable. Please try again later.';
  }
};

module.exports = { generateAIResponse };
