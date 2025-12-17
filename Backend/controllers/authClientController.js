require('dotenv').config();
const bcrypt = require('bcrypt');
const {pool} = require('../config/dbConfig');
const jwt = require('jsonwebtoken');


const clientRegister = async (req, res) => {
    try {
        const {firstName, lastName, email, password, age, location} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const ageValue = Number.parseInt(age, 10);
    if (Number.isNaN(ageValue)) {
        return res.status(400).json({ message: 'Age must be a valid integer' });
    }
    const selectQuery = 'SELECT * FROM clients WHERE email = ?';
    const [dbuser] = await pool.query(selectQuery, [email]);

    if (dbuser.length === 0 || !dbuser) {
        const insertQuery = 'INSERT INTO clients (firstName, lastName, email, password, age, location) VALUES (?, ?, ?, ?, ?, ?)';
        const [result] = await pool.query(insertQuery, [firstName, lastName, email, hashedPassword, ageValue, location]);
        const newClient = {id: result.insertId, firstName, lastName, email, age, location};
        res.status(201).json({message: 'Client registered successfully', client: newClient});
    }else{
        return  res.status(400).json({message: 'Email already registered'});
    };
    }catch (error) {
        console.error('Error during client registration:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}

const clientLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const selectQuery = 'SELECT * FROM clients WHERE email = ?';
        const [rows] = await pool.query(selectQuery, [email]);
        if (rows.length === 0) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }else{
            const token = jwt.sign(
                { userId: user.id, firstName: user.firstName }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ message: 'Login successful', userId: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, token });
        }
    } catch (error) {
        console.error('Error in loginUser:', error);
        return res.status(400).json({ message: 'Internal server error' });
    }
}

module.exports = {clientRegister, clientLogin};