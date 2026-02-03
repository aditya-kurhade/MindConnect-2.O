const { route } = require('./authClientRoute');

const router = require('express').Router();
const upload = require('../middleware/uploadMiddleware');
const uploadPdfController = require('../controllers/uploadPdfController').uploadPdfController;

router.post('/upload-pdf', upload.single('pdf'), uploadPdfController);

module.exports = router;