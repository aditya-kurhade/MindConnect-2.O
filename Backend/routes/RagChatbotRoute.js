const {Router} = require('express');

const { handleRagChat } = require('../controllers/ragChatbotController');

const router = Router();

router.post('/rag-chat', handleRagChat);


module.exports = router;