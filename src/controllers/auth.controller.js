const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const Usuario = require('../models/usuario.model');
const Admin   = require('../models/admin.model');

// POST /api/v1/auth/registro
const registro = async (req, res) => {
  try {
    const { nombre, correo, telefono, password } = req.body;
    if (!nombre || !correo || !password) {
      return res.status(400).json({ ok: false, msg: 'nombre, correo y password son requeridos' });
    }
    const existe = await Usuario.getByCorreo(correo);
    if (existe) return res.status(400).json({ ok: false, msg: 'El correo ya está registrado' });

    const password_hash = await bcrypt.hash(password, 10);
    const data = await Usuario.create({ nombre, correo, telefono, password_hash });
    res.status(201).json({ ok: true, msg: 'Registro exitoso', usuario_id: data.id });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

// POST /api/v1/auth/login
const login = async (req, res) => {
  try {
    const { correo, password } = req.body;
    const usuario = await Usuario.getByCorreo(correo);
    if (!usuario) return res.status(401).json({ ok: false, msg: 'Credenciales incorrectas' });

    const valido = await bcrypt.compare(password, usuario.password);
    if (!valido) return res.status(401).json({ ok: false, msg: 'Credenciales incorrectas' });

    const token = jwt.sign(
      { id: usuario.id, correo: usuario.correo, rol: 'cliente' },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );
    res.json({ ok: true, token, usuario_id: usuario.id, nombre: usuario.nombre });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

// POST /api/v1/auth/admin/login
const loginAdmin = async (req, res) => {
  try {
    const { usuario, clave } = req.body;
    const admin = await Admin.getByUsuario(usuario);
    if (!admin) return res.status(401).json({ ok: false, msg: 'Credenciales incorrectas' });

    // Comparar clave (si está hasheada usa bcrypt.compare, si no, comparación directa)
    const valido = admin.clave === clave; // cambiar a bcrypt cuando se hashee
    if (!valido) return res.status(401).json({ ok: false, msg: 'Credenciales incorrectas' });

    const token = jwt.sign(
      { id: admin.id, usuario: admin.usuario, rol: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );
    res.json({ ok: true, token, admin_id: admin.id });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

module.exports = { registro, login, loginAdmin };
