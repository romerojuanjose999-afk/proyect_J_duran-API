const ContactoModel = require('../models/contacto.model');

// POST /api/v1/contacto
const create = async (req, res) => {
  try {
    const { nombre, correo, asunto, mensaje } = req.body;
    if (!nombre || !correo || !asunto || !mensaje) {
      return res.status(400).json({ ok: false, msg: 'Todos los campos son requeridos' });
    }
    await ContactoModel.create({ nombre, correo, asunto, mensaje });
    res.status(201).json({ ok: true, msg: 'Mensaje enviado correctamente' });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

// GET /api/v1/contacto  (admin)
const getAll = async (req, res) => {
  try {
    const soloNoLeidos = req.query.leido === 'false';
    const data = await ContactoModel.getAll(soloNoLeidos);
    res.json({ ok: true, data });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

module.exports = { create, getAll };
