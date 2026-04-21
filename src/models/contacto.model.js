const pool = require('../config/db');

const create = async ({ nombre, correo, asunto, mensaje }) => {
  const [result] = await pool.query(
    'INSERT INTO contacto (nombre, correo, asunto, mensaje) VALUES (?, ?, ?, ?)',
    [nombre, correo, asunto, mensaje]
  );
  return result.insertId;
};

const getAll = async (soloNoLeidos = false) => {
  let sql = 'SELECT * FROM contacto';
  if (soloNoLeidos) sql += ' WHERE leido = 0';
  sql += ' ORDER BY id DESC';
  const [rows] = await pool.query(sql);
  return rows;
};

module.exports = { create, getAll };
