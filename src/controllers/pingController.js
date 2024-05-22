const connection = require('../models/db')

module.exports.ping = (req, res) => {
    const consult = 'SELECT * FROM USERS';

    try {
        connection.query(consult)
            .then((results) => {
                res.json(results); // Process successful results
            })
            .catch((error) => {
                console.error(error); // Handle errors
            });

    }catch (e) {
        console.log(e)
    }
}
