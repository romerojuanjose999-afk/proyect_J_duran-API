const pool = require('../config/db');

const create = async (pedido_id, items) => {
  // Insertar cada ítem del carrito como fila en detalle_pedido
  for (const item of items) {
    await pool.query(
      'INSERT INTO detalle_pedido (pedido_id, producto_id, cantidad, precio_unitario, subtotal) VALUES (?, ?, ?, ?, ?)',
      [pedido_id, item.producto_id, item.cantidad, item.precio_unitario, item.cantidad * item.precio_unitario]
    );
    // Descontar stock automáticamente
    await pool.query(
      'UPDATE productos SET stock = stock - ? WHERE id = ?',
      [item.cantidad, item.producto_id]
    );
  }
};

const getByPedido = async (pedido_id) => {
  const [rows] = await pool.query(
    `SELECT dp.*, p.nombre, p.presentacion
     FROM detalle_pedido dp
     JOIN productos p ON dp.producto_id = p.id
     WHERE dp.pedido_id = ?`,
    [pedido_id]
  );
  return rows;
};

module.exports = { create, getByPedido };
