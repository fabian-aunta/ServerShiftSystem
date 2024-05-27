const connection = require('../models/db');

module.exports.getTurnoById = (req, res) => {
  const consult = 'SELECT first_name, document FROM USERS WHERE email = ?';
  const data = req.body;
  console.log(data);

/*
  connection.query(query, [turnoId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al obtener el turno' });
    }
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ error: 'Turno no encontrado' });
    }
  });*/ 
};
