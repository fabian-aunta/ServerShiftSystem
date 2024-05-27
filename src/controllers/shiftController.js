const connection = require('../models/db');
const jwt = require('jsonwebtoken');

// Función existente
module.exports.getTurnoById = (req, res) => {
    const { jwtToken } = req.body;
    const decoded = jwt.decode(jwtToken);

    if (!decoded || !decoded.username) {
        return res.status(401).send({ message: 'Token no válido' });
    }

    const consult = 'SELECT t.id, u.first_name, u.last_name FROM TURNS t INNER JOIN USERS u ON t.id_user = u.id WHERE u.email = ?';

    try {
        connection.query(consult, [decoded.username])
            .then((results) => {
                if (results.length > 0) {
                    res.send(results[0]);
                } else {
                    res.status(404).send({ message: 'No existe' });
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

module.exports.assignTurno = (req, res) => {
  const { email } = req.body; // Obtener email del cliente
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, "Stack");

  if (decoded.role !== 'admin') {
      return res.status(403).send({ message: 'Acceso denegado' });
  }

  const getUserQuery = 'SELECT id FROM USERS WHERE email = ?';
  const assignTurnoQuery = 'INSERT INTO TURNS (id_user) VALUES (?)';

  try {
      connection.query(getUserQuery, [email])
          .then((userResults) => {
              if (userResults.length > 0) {
                  const userId = userResults[0].id;
                  connection.query(assignTurnoQuery, [userId])
                      .then((turnoResults) => {
                          res.send({ message: 'Turno asignado correctamente', turnoId: turnoResults.insertId });
                      })
                      .catch((error) => {
                          res.status(500).send(error);
                      });
              } else {
                  res.status(404).send({ message: 'Usuario no encontrado' });
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

module.exports.passTurno = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, "Stack");

  if (decoded.role !== 'admin') {
      return res.status(403).send({ message: 'Acceso denegado' });
  }

  const getFirstTurnoQuery = 'SELECT id FROM TURNS ORDER BY id LIMIT 1';
  const deleteFirstTurnoQuery = 'DELETE FROM TURNS WHERE id = ?';
  const getNextTurnoQuery = 'SELECT * FROM TURNS ORDER BY id LIMIT 1';

  try {
      connection.query(getFirstTurnoQuery)
          .then((firstTurnoResults) => {
              if (firstTurnoResults.length > 0) {
                  const firstTurnoId = firstTurnoResults[0].id;
                  connection.query(deleteFirstTurnoQuery, [firstTurnoId])
                      .then(() => {
                          connection.query(getNextTurnoQuery)
                              .then((nextTurnoResults) => {
                                  if (nextTurnoResults.length > 0) {
                                      res.send(nextTurnoResults[0]);
                                  } else {
                                      res.send({ message: 'No hay más turnos' });
                                  }
                              })
                              .catch((error) => {
                                  res.status(500).send(error);
                              });
                      })
                      .catch((error) => {
                          res.status(500).send(error);
                      });
              } else {
                  res.status(404).send({ message: 'No hay turnos para pasar' });
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