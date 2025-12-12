const {pool} = require('../config/dbConfig');
const bcrypt = require('bcrypt');

const counsellorRegister = async (req, res) => {
    try {
        const {firstName, lastName, email, password, licenseNumber, specialization, experience, location, bio} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const selectQuery = 'SELECT * FROM counsellors WHERE email = ?';
        const [dbuser] = await pool.query(selectQuery, [email]);
        if (dbuser.length === 0 || !dbuser) {
            const insertQuery = 'INSERT INTO counsellors (firstName, lastName, email, password, confirmPassword, licenseNumber, specialization, experience, location, bio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            const [result] = await pool.query(insertQuery, [firstName, lastName, email, hashedPassword, hashedPassword, licenseNumber, specialization, experience, location, bio]);
            const newCounsellor = {id: result.insertId, firstName, lastName, email, licenseNumber, specialization, experience, location, bio};
            res.status(201).json({message: 'Counsellor registered successfully', counsellor: newCounsellor});
        }else{
            return res.status(400).json({message: 'Email already registered'});
        }   
    } catch (error) {
        console.error('Error during counsellor registration:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}

const counsellorLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const selectQuery = 'SELECT * FROM counsellors WHERE email = ?';
        const [rows] = await pool.query(selectQuery, [email]);
        if (rows.length === 0) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }   
        return res.status(200).json({ message: 'Login successful', userId: user.id });
    } catch (error) {
        console.error('Error in counsellorLogin:', error);
        return res.status(400).json({ message: 'Internal server error' });
    }
}

module.exports = {counsellorRegister, counsellorLogin};
