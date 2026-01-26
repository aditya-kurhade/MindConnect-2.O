const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const {checkConnection} = require('./config/dbConfig');
const {createTable} = require('./utils/dbUtils');
const cors = require('cors');


const authClientRoute = require('./routes/authClientRoute');
const authCounsellorRoute = require('./routes/authCounsellorRoute');
const dashboardRoute = require('./routes/dashboardRoute');
const aiChatbotRoute = require('./routes/aiChatbotRoute');
const pdfUploadRoute = require('./routes/pdfUploadRoute');



const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use('/api', authClientRoute);
app.use('/api', authCounsellorRoute);
app.use('/api', dashboardRoute);
app.use('/api', aiChatbotRoute);
app.use('/api', pdfUploadRoute);

//rag code 




const port = process.env.PORT || 5000;
    
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
    try {
        checkConnection();
        createTable();
        console.log(`Server is running on port ${port}`);
    } catch (error) {
        console.error('Failed to start server:', error);
    }
    
}); 

module.exports = app;