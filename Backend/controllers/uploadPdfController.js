const { addFileReadyJob } = require("../queues/myQueue");

const uploadPdfController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    // Add job to queue
    await addFileReadyJob({
      filename: req.file.originalname,
      destination: req.file.path,
      path: req.body.path || '/',
    });

    // Return success response
    return res.status(200).json({ 
      success: true, 
      filename: req.file.filename, 
      path: req.file.path,
      message: 'File uploaded and queued for processing'
    });
  } catch (error) { 
    console.error('uploadPdfController error:', error);
    return res.status(500).json({ success: false, error: error.message || 'Server error during file upload' });
  }
};

module.exports = { uploadPdfController };