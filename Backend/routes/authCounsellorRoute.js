const router = require('express').Router();
const {counsellorRegister} = require('../controllers/authCounsellorController');
const {counsellorLogin} = require('../controllers/authCounsellorController');

router.post('/counsellor-register',counsellorRegister);
router.post('/counsellor-login',counsellorLogin);

module.exports = router;