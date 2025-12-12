const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const {checkConnection} = require('./config/dbConfig');
const {createTable} = require('./utils/dbUtils');

const app = express();
const port = process.env.PORT || 3000;
    
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