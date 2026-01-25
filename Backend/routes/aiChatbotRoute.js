const express = require('express');
const { chatWithAI } = require('../controllers/aiChatbotController');

const router = express.Router();

// POST /api/chat
router.post('/chat', chatWithAI);

module.exports = router;
