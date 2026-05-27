const PedidoModel  = require('../models/pedido.model');
const DetalleModel = require('../models/detallePedido.model');

// POST /api/v1/pedidos
const create = async (req, res) => {
  try {
    const { nombre_cliente, direccion, telefono, correo, metodo_pago, envio, detalle } = req.body;
    if (!nombre_cliente || !direccion || !detalle || !detalle.length) {
      return res.status(400).json({ ok: false, msg: 'Datos de envío y detalle son requeridos' });
    }
    const total = detalle.reduce((s, i) => s + i.cantidad * i.precio_unitario, 0) + (envio || 0);
    const pedido_id = await PedidoModel.create({
      usuario_id: req.usuario?.id || null,
      nombre_cliente, direccion, telefono, correo, metodo_pago, envio: envio || 0, total
    });
    await DetalleModel.create(pedido_id, detalle);
    res.status(201).json({ ok: true, msg: 'Pedido creado', pedido_id, total });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

// GET /api/v1/pedidos  (admin)
const getAll = async (req, res) => {
  try {
    const data = await PedidoModel.getAll({ estado: req.query.estado });
    res.json({ ok: true, data });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

// GET /api/v1/pedidos/:id
const getById = async (req, res) => {
  try {
    const pedido = await PedidoModel.getById(req.params.id);
    if (!pedido) return res.status(404).json({ ok: false, msg: 'Pedido no encontrado' });
    const detalle = await DetalleModel.getByPedido(pedido.id);
    res.json({ ok: true, data: { ...pedido, detalle } });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

// GET /api/v1/pedidos/mis-pedidos
const misPedidos = async (req, res) => {
  try {
    const data = await PedidoModel.getByUsuario(req.usuario.id);
    res.json({ ok: true, data });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

// PATCH /api/v1/pedidos/:id/estado
const updateEstado = async (req, res) => {
  try {
    const { estado } = req.body;
    const estados = ['Pendiente', 'En preparación', 'Enviado', 'Entregado'];
    if (!estados.includes(estado)) {
      return res.status(400).json({ ok: false, msg: 'Estado no válido' });
    }
    const affected = await PedidoModel.updateEstado(req.params.id, estado);
    if (!affected) return res.status(404).json({ ok: false, msg: 'Pedido no encontrado' });
    res.json({ ok: true, msg: 'Estado actualizado', nuevo_estado: estado });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

// PATCH /api/v1/pedidos/:id/cancelar
const cancelar = async (req, res) => {
  try {
    const affected = await PedidoModel.cancelar(req.params.id);
    if (!affected) return res.status(400).json({ ok: false, msg: 'Solo se pueden cancelar pedidos Pendientes' });
    res.json({ ok: true, msg: 'Pedido cancelado' });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

module.exports = { create, getAll, getById, misPedidos, updateEstado, cancelar };
