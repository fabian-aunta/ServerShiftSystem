const connection = require('../models/db');
const jwt = require('jsonwebtoken');

module.exports.getTurnoById = (req, res) => {
  const consult = 'SELECT t.id, u.first_name , u.last_name FROM TURNS t INNER JOIN USERS u ON t.id_user = u.id WHERE u.email = ?';
  const data = req.body;
  const result =jwt.decode(data.jwt);
  console.log(result.username);
  try {
    connection.query(consult, [result.username])
        .then((results) => {
            if(results[0].length > 0){
              res.send(results[0]);
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
};
