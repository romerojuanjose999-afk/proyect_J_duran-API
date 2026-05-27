const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/pedidos.controller');
const { verificarToken } = require('../middlewares/auth.middleware');
const { verificarAdmin } = require('../middlewares/admin.middleware');

router.post('/',                 verificarToken, ctrl.create);
router.get('/',                  verificarToken, verificarAdmin, ctrl.getAll);
router.get('/mis-pedidos',       verificarToken, ctrl.misPedidos);
router.get('/:id',               verificarToken, ctrl.getById);
router.patch('/:id/estado',      verificarToken, verificarAdmin, ctrl.updateEstado);
router.patch('/:id/cancelar',    verificarToken, verificarAdmin, ctrl.cancelar);

module.exports = router;
