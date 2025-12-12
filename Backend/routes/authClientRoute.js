const router = require('express').Router();
const {clientRegister} = require('../controllers/authClientController');
const {clientLogin} = require('../controllers/authClientController');


router.post('/client-register',clientRegister);
router.post('/client-login',clientLogin);


module.exports = router;