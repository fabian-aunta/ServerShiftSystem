const connection = require('../models/db');
const jwt = require('jsonwebtoken');

module.exports.login = (req, res) => {
    const { username, password } = req.body;
    const consult = 'SELECT * FROM USERS WHERE email = ? AND password_user = ?';

    try {
        connection.query(consult, [username, password])
            .then((results) => {
                if (results.length > 0) {
                    const user = results[0];
                    const token = jwt.sign({ username: user.email, role: user.role }, "Stack", {
                        expiresIn: '1h'
                    });
                    res.send({ username: user.email, token });
                } else {
                    res.status(401).send({ message: 'No existe' });
                }
            })
            .catch((error) => {
                res.status(500).send(error);
            });

    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
};
