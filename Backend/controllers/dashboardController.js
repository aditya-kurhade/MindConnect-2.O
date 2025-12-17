const {pool} = require('../config/dbConfig');

const getClientDashboard = async (req, res) => {
    try {
        const userId = req.user.userId; // From JWT token
        
        // Fetch client data
        const selectQuery = 'SELECT id, firstName, lastName, email, age, location FROM clients WHERE id = ?';
        const [rows] = await pool.query(selectQuery, [userId]);
        
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Client not found' });
        }
        
        const client = rows[0];
        
        // Return dashboard data
        res.status(200).json({
            message: 'Dashboard data retrieved successfully',
            client: {
                id: client.id,
                firstName: client.firstName,
                lastName: client.lastName,
                email: client.email,
                age: client.age,
                location: client.location
            }
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getCounsellorDashboard = async (req, res) => {
    try {
        const userId = req.user.userId; // From JWT token
        
        // Fetch counsellor data
        const selectQuery = 'SELECT id, firstName, lastName, email, licenseNumber, specialization, experience, location, bio FROM counsellors WHERE id = ?';
        const [rows] = await pool.query(selectQuery, [userId]);
        
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Counsellor not found' });
        }
        
        const counsellor = rows[0];
        
        // Return dashboard data
        res.status(200).json({
            message: 'Dashboard data retrieved successfully',
            counsellor: {
                id: counsellor.id,
                firstName: counsellor.firstName,
                lastName: counsellor.lastName,
                email: counsellor.email,
                licenseNumber: counsellor.licenseNumber,
                specialization: counsellor.specialization,
                experience: counsellor.experience,
                location: counsellor.location,
                bio: counsellor.bio
            }
        });
    } catch (error) {
        console.error('Error fetching counsellor dashboard data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getClientDashboard, getCounsellorDashboard };
