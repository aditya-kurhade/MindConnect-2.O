const express = require('express');
const app = express();
const { checkConnection } = require('./config/db');
const { createTable } = require('./utils/dbUtils');

app.use(express.json());

// Sample route
app.get('/', (req, res) => {
    res.send('Hello World!');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Access the server at http://localhost:${PORT}`);
    try{
        await checkConnection();
        await createTable();
    }
    catch(err){
        console.error("Error checking database connection:", err);
    }
});

module.exports = app;