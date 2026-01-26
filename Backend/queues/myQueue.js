const { Queue } = require('bullmq');

const connection = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
  password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: null,
};

const fileUploadsQueue = new Queue('file-uploads-queue', { connection });

// Handle connection errors
fileUploadsQueue.on('error', (error) => {
  console.error('Queue connection error:', error);
});

const addFileReadyJob = async ({ filename, destination, path }) => {
  if (!filename || !destination || !path) {
    throw new Error('Missing file metadata for file-ready job');
  }

  try {
    const job = await fileUploadsQueue.add('file-ready', { filename, destination, path });
    console.log(`Job ${job.id} added to queue successfully`);
    return job;
  } catch (error) {
    console.error('Failed to add job to queue:', error);
    throw error;
  }
};

module.exports = { fileUploadsQueue, addFileReadyJob };
