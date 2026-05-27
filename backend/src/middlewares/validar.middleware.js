// Valida que los campos requeridos estén presentes en req.body
const validarCampos = (campos) => (req, res, next) => {
  const faltantes = campos.filter(c => !req.body[c] && req.body[c] !== 0);
  if (faltantes.length > 0) {
    return res.status(400).json({
      ok: false,
      msg: `Campos requeridos faltantes: ${faltantes.join(', ')}`
    });
  }
  next();
};

module.exports = { validarCampos };
