const { pool } = require('../config/db');

const createTable = async() => {
    try{
        await pool.query(
            `CREATE TABLE IF NOT EXISTS clients (
                id INT AUTO_INCREMENT PRIMARY KEY,
                firstname VARCHAR(255) NOT NULL,
                lastname VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                age INT,
                city VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`
        )
        console.log("Clients table created or already exists.");

        await pool.query(
            `CREATE TABLE IF NOT EXISTS counsellors (
                id INT AUTO_INCREMENT PRIMARY KEY,
                firstname VARCHAR(255) NOT NULL,
                lastname VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE, 
                password VARCHAR(255) NOT NULL,
                license_number VARCHAR(255) NOT NULL UNIQUE,
                specialization VARCHAR(255),
                experience_years INT,
                city VARCHAR(255),
                description TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`
        )
        console.log("counsellors table created or already exists.");

    }catch(err){
        console.error("Error creating clients table:", err);
    }

}

module.exports = { createTable };