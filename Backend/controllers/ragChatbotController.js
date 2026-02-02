const { QdrantVectorStore } = require("@langchain/qdrant");
const { OllamaEmbeddings } = require("@langchain/ollama");
const { generateAIResponse } = require('../services/ollama.service');

const handleRagChat = async (req, res) => {
    const { query: userQuery } = req.body;

    if (!userQuery) {
        return res.status(400).json({
            success: false,
            message: "Query is required"
        });
    }

    const vectorStore = await QdrantVectorStore.fromExistingCollection(
        new OllamaEmbeddings({
            model: "nomic-embed-text",
            baseUrl: "http://localhost:11434"
        }),
        {
            url: "http://localhost:6333",
            collectionName: "pdf-docs",
        }
    );
    const retriever = vectorStore.asRetriever({
        k: 2,
    });

    const results = await retriever.invoke(userQuery);

    const systemPrompt = `You are a helpful assistant. Use the following context to answer the question.
    If you don't know the answer, just say you don't know. Do not try to make up an answer.
    Context: ${results.map((r) => r.pageContent).join("\n")}
    Question: ${userQuery}
    `;

    const aiResponse = await generateAIResponse(systemPrompt);
    console.log("RAG Chat Response:", aiResponse);

    return res.status(200).json({
        success: true,
        data: aiResponse,
    });
};

module.exports = { handleRagChat }; 