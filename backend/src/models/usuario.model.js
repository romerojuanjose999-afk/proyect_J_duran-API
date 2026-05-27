const pool = require('../config/db');

const getByCorreo = async (correo) => {
  const [rows] = await pool.query(
    'SELECT * FROM usuarios WHERE correo = ?', [correo]
  );
  return rows[0];
};

const create = async ({ nombre, correo, telefono, password_hash }) => {
  const [result] = await pool.query(
    'INSERT INTO usuarios (nombre, correo, telefono, password) VALUES (?, ?, ?, ?)',
    [nombre, correo, telefono, password_hash]
  );
  return { id: result.insertId, nombre, correo };
};

const getById = async (id) => {
  const [rows] = await pool.query(
    'SELECT id, nombre, correo, telefono, fecha_registro FROM usuarios WHERE id = ?', [id]
  );
  return rows[0];
};

const update = async (id, { nombre, telefono }) => {
  const [result] = await pool.query(
    'UPDATE usuarios SET nombre = COALESCE(?, nombre), telefono = COALESCE(?, telefono) WHERE id = ?',
    [nombre, telefono, id]
  );
  return result.affectedRows;
};

module.exports = { getByCorreo, create, getById, update };