const { Worker } = require('bullmq');

const { QdrantVectorStore } = require("@langchain/qdrant");
const { OpenAIEmbeddings } = require("@langchain/openai");
const { Document } =  require("@langchain/core/documents");
const { PDFLoader } = require("@langchain/community/document_loaders/fs/pdf");
const { RecursiveCharacterTextSplitter } = require("@langchain/textsplitters");
const { text } = require('express');

const worker = new Worker('file-uploads-queue', async job => {
  console.log(`Processing job ${job.id}:`, job.data);
  const data = job.data;
  /*  
  path : data.path
  read the pdf from path
  chunk the pdf
  call the embedding model
  store the chunk in qdrant db  */

  //load the pdf
  const loader = new PDFLoader(data.destination);
  const docs = await loader.load();
  
//   const splitter = new RecursiveCharacterTextSplitter({
//     chunkSize: 100,
//     chunkOverlap: 0 
//   });
  
//   const texts = await splitter.splitDocuments(docs);
//   console.log(text);
//   console.log(docs);
  

}, { concurrency: 100,
    connection: {
        host : "localhost",
        port : 6379
    }
 });

worker.on('completed', job => {
  console.log(`Job ${job.id} completed successfully`);
});

worker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} failed:`, err.message);
});

