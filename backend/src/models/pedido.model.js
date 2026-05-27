const pool = require('../config/db');

const create = async ({ usuario_id, nombre_cliente, direccion, telefono, correo, metodo_pago, envio, total }) => {
  const [result] = await pool.query(
    `INSERT INTO pedidos (usuario_id, nombre_cliente, direccion, telefono, correo, metodo_pago, envio, total, estado)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Pendiente')`,
    [usuario_id, nombre_cliente, direccion, telefono, correo, metodo_pago, envio, total]
  );
  return result.insertId;
};

const getAll = async (filtros = {}) => {
  let sql = 'SELECT * FROM pedidos WHERE 1=1';
  const params = [];
  if (filtros.estado) { sql += ' AND estado = ?'; params.push(filtros.estado); }
  sql += ' ORDER BY id DESC';
  const [rows] = await pool.query(sql, params);
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM pedidos WHERE id = ?', [id]);
  return rows[0];
};

const getByUsuario = async (usuario_id) => {
  const [rows] = await pool.query(
    'SELECT * FROM pedidos WHERE usuario_id = ? ORDER BY id DESC', [usuario_id]
  );
  return rows;
};

const updateEstado = async (id, estado) => {
  const [result] = await pool.query(
    'UPDATE pedidos SET estado = ? WHERE id = ?', [estado, id]
  );
  return result.affectedRows;
};

const cancelar = async (id) => {
  const [result] = await pool.query(
    "UPDATE pedidos SET estado = 'Cancelado' WHERE id = ? AND estado = 'Pendiente'", [id]
  );
  return result.affectedRows;
};

module.exports = { create, getAll, getById, getByUsuario, updateEstado, cancelar };
