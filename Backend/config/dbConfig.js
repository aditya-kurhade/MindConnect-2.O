const mysql2 = require('mysql2/promise');
require('dotenv').config();

const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 60000,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

const checkConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Database connection established successfully.');
        connection.release();
    }
    catch (error) {
        console.error('Error connecting to the database:', error);
    }
};

module.exports = { pool, checkConnection };