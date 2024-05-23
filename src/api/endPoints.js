const express  = require('express');
const router = express.Router();

const { ping } = require('../controllers/pingController');
const { login } = require('../controllers/loginController');
const { register } = require('../controllers/registerController');
const {} = require('../controllers/shiftController')

router.get('/ping', ping);

router.post('/login', login);

router.post('/register', register);

router.get('/turno/:id', shiftController.getTurnoById);

module.exports = router;