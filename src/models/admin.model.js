const pool = require('../config/db');

const getByUsuario = async (usuario) => {
  const [rows] = await pool.query(
    'SELECT * FROM admin WHERE usuario = ?', [usuario]
  );
  return rows[0];
};

module.exports = { getByUsuario };
