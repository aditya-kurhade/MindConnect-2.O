const {pool} = require('../config/dbConfig');

const createTable = async () => {
    try {
        await pool.query(`
        CREATE TABLE IF NOT EXISTS clients (
        id INT AUTO_INCREMENT PRIMARY KEY,
        firstName VARCHAR(50),
        lastName VARCHAR(50),
        email VARCHAR(100) UNIQUE,
        password VARCHAR(255),
        age INT,
        location VARCHAR(100)
            );
        `);
        console.log('client table ensured to exist.'); 

        await pool.query(
            `CREATE TABLE IF NOT EXISTS counsellors (
                id INT AUTO_INCREMENT PRIMARY KEY,
                firstName VARCHAR(100),
                lastName VARCHAR(100),
                email VARCHAR(150) UNIQUE,
                password VARCHAR(255),
                confirmPassword VARCHAR(255),
                licenseNumber VARCHAR(100),
                specialization VARCHAR(150),
                experience VARCHAR(50),
                location VARCHAR(150),
                bio TEXT
            );`
        );
        console.log('Counsellor table ensured');
        
        
    } catch (error) {
        console.error('Error creating users table:', error);
    }
}

module.exports = {createTable}