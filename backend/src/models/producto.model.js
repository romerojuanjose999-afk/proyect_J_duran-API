const pool = require('../config/db');

// ? = placeholder seguro (evita SQL Injection)

const getAll = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM productos WHERE activo = 1 ORDER BY id DESC'
  );
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM productos WHERE id = ? AND activo = 1', [id]
  );
  return rows[0]; // undefined si no existe
};

const create = async ({ nombre, descripcion, precio, presentacion, imagen, stock, origen }) => {
  const [result] = await pool.query(
    'INSERT INTO productos (nombre, descripcion, precio, presentacion, imagen, stock, origen) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [nombre, descripcion, precio, presentacion, imagen ?? '', stock ?? 0, origen ?? '']
  );
  return { id: result.insertId, nombre, precio, stock };
};

const update = async (id, { nombre, descripcion, precio, presentacion, imagen, stock, origen }) => {
  const [result] = await pool.query(
    `UPDATE productos
     SET nombre = COALESCE(?, nombre),
         descripcion = COALESCE(?, descripcion),
         precio = COALESCE(?, precio),
         presentacion = COALESCE(?, presentacion),
         imagen = COALESCE(?, imagen),
         stock = COALESCE(?, stock),
         origen = COALESCE(?, origen)
     WHERE id = ?`,
    [nombre, descripcion, precio, presentacion, imagen, stock, origen, id]
  );
  return result.affectedRows; // 0 si no existe
};

const remove = async (id) => {
  // Borrado lógico: solo cambia activo a 0
  const [result] = await pool.query(
    'UPDATE productos SET activo = 0 WHERE id = ?', [id]
  );
  return result.affectedRows;
};

module.exports = { getAll, getById, create, update, remove };
