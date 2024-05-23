const connection = require('../models/db');

module.exports.getTurnoById = (req, res) => {
  const turnoId = req.params.id;
  const query = 'SELECT id, CONCAT(nombre, " ", apellido) AS nombre FROM turnos WHERE id = ?';

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
  });
};
