const UsuarioModel = require('../models/usuario.model');

// GET /api/v1/usuarios/perfil
const getPerfil = async (req, res) => {
  try {
    const data = await UsuarioModel.getById(req.usuario.id);
    if (!data) return res.status(404).json({ ok: false, msg: 'Usuario no encontrado' });
    res.json({ ok: true, data });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

// PUT /api/v1/usuarios/perfil
const updatePerfil = async (req, res) => {
  try {
    const affected = await UsuarioModel.update(req.usuario.id, req.body);
    if (!affected) return res.status(404).json({ ok: false, msg: 'Usuario no encontrado' });
    res.json({ ok: true, msg: 'Perfil actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

module.exports = { getPerfil, updatePerfil };
