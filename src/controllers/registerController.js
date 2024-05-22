const connection = require('../models/db');
const jwt = require('jsonwebtoken');

module.exports.register = (req, res) => {
    const { firstName, lastName, email, adress, org, password } = req.body;
    const consult = 'INSERT INTO USERS (first_name, last_name, email, address, organization, password_user) VALUES (?,?,?,?,?,?)';

    try {

        console.log(firstName);
        connection.query(consult, [firstName, lastName, email, adress, org, password])
            .then((results) => {
                if(results[0].length > 0){
                    console.log(results[0]);
                    res.send(results[0]);
                }else {
                    console.log('No existe');
                    res.send({ message: 'No existe' });
                }
            })
            .catch((error) => {
                res.send(error[0]);
                console.log(error);
            });

    }catch (e) {
        console.log(e)
    }

}
