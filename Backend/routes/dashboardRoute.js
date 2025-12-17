const router = require('express').Router();
const { getClientDashboard, getCounsellorDashboard } = require('../controllers/dashboardController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/client-dashboard', authenticateToken, getClientDashboard);
router.get('/counsellor-dashboard', authenticateToken, getCounsellorDashboard);

module.exports = router;
