const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/usuarios.controller');
const { verificarToken } = require('../middlewares/auth.middleware');

router.get('/perfil',  verificarToken, ctrl.getPerfil);
router.put('/perfil',  verificarToken, ctrl.updatePerfil);

module.exports = router;