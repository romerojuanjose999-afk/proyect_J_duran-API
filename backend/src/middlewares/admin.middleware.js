const verificarAdmin = (req, res, next) => {
  // Se ejecuta DESPUÉS de verificarToken
  if (!req.usuario || req.usuario.rol !== 'admin') {
    return res.status(403).json({ ok: false, msg: 'Acceso denegado: se requiere rol admin' });
  }
  next();
};

module.exports = { verificarAdmin };
