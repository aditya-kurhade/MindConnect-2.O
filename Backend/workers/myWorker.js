const { Worker } = require('bullmq');
const { OllamaEmbeddings } = require("@langchain/ollama");

const { QdrantVectorStore } = require("@langchain/qdrant");
const { QdrantClient } = require("@qdrant/js-client-rest");
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
  
  // Split documents into chunks
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 50,
  });
  
  const splitDocs = await splitter.splitDocuments(docs);
  console.log(`Split into ${splitDocs.length} chunks`);
  
  //local machine
  console.log("Initializing embeddings...");
  const embeddings = new OllamaEmbeddings({
    model: "nomic-embed-text",
    baseUrl: "http://localhost:11434"
  });
  
  try {
    const client = new QdrantClient({ url: "http://localhost:6333" });
    const collections = await client.getCollections();
    const exists = collections.collections.some(c => c.name === "pdf-docs");

    if (!exists) {
      console.log("Creating new collection...");
      await QdrantVectorStore.fromDocuments(
        splitDocs,
        embeddings,
        {
          url: "http://localhost:6333",
          collectionName: "pdf-docs",
        }
      );
    } else {
      console.log("Using existing collection...");
      const vectorStore = await QdrantVectorStore.fromExistingCollection(
        embeddings,
        {
          url: "http://localhost:6333",
          collectionName: "pdf-docs",
        }
      );
      await vectorStore.addDocuments(splitDocs);
      console.log("Added documents to existing collection");
    }
    console.log("Documents added to Qdrant vector store");
  } catch (err) {
    console.error("Error with vector store:", err.message);
    throw err;
  }

  // if you are using api key
  // const embeddings = new OpenAIEmbeddings({url: "http://localhost:11434/api/embeddings"});

  
//   const splitter = new RecursiveCharacterTextSplitter({
//     chunkSize: 100,
//     chunkOverlap: 0 
//   });
  
//   const texts = await splitter.splitDocuments(docs);
//   console.log(text);
//   console.log(docs);
  

}, { concurrency: 1,
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

