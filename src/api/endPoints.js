const express  = require('express');
const router = express.Router();

const { ping } = require('../controllers/pingController');
const { login } = require('../controllers/loginController');
const { register } = require('../controllers/registerController');
const { getTurnoById , assignTurno, passTurno } = require('../controllers/shiftController');
const {authorizeRoles} = require('../middlware/auth')

router.get('/ping', ping);

router.post('/login', login);

router.post('/register', register);

router.post('/turno', getTurnoById);

router.post('/assignShift', authorizeRoles('admin'), assignTurno)

router.post('/pass', authorizeRoles('admin'), passTurno)

module.exports = router;