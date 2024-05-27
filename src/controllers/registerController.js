const connection = require('../models/db');
const jwt = require('jsonwebtoken');

module.exports.register = (req, res) => {
    const { firstName, lastName, documentNumber, email, address, org, password, role, termsAccepted } = req.body;

    if (!firstName || !lastName || !documentNumber || !email || !address || !org || !password || !role || termsAccepted === undefined) {
        return res.status(400).send({ message: 'Todos los campos son obligatorios' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).send({ message: 'Correo electrónico no válido' });
    }

    const consult = 'INSERT INTO USERS (first_name, last_name, document, email, address, organization, password_user, role, terms_conditions) VALUES (?,?,?,?,?,?,?,?,?)';

    try {
        connection.query(consult, [firstName, lastName, documentNumber, email, address, org, password, role, termsAccepted ? 1 : 0])
            .then((results) => {
                res.send(results);
            })
            .catch((error) => {
                res.status(500).send(error);
                console.log(error);
            });
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
};
