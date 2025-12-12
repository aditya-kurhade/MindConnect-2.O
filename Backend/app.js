const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const {checkConnection} = require('./config/dbConfig');
const {createTable} = require('./utils/dbUtils');
const cors = require('cors');

const authClientRoute = require('./routes/authClientRoute');
const authCounsellorRoute = require('./routes/authCounsellorRoute');


const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', authClientRoute);
app.use('/api', authCounsellorRoute);




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