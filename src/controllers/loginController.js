const connection = require('../models/db');
const jwt = require('jsonwebtoken');

module.exports.login = (req, res) => {
    const { username , password } = req.body;
    const consult = 'SELECT * FROM USERS WHERE email = ? AND password_user = ?';

    try {
        connection.query(consult, [username, password])
            .then((results) => {
                if(results[0].length > 0){
                    console.log(results[0])
                    const token = jwt.sign({username}, "Stack", {
                        expiresIn: '1m'
                    });
                    res.send({username, token});
                }else {
                    console.log('No existe');
                    res.send({ message: 'No existe' });
                }
            })
            .catch((error) => {
                res.send(error[0]);
            });

    }catch (e) {
        console.log(e)
    }

}
