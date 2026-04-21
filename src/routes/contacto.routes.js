const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/contacto.controller');
const { verificarToken } = require('../middlewares/auth.middleware');
const { verificarAdmin } = require('../middlewares/admin.middleware');

router.post('/', ctrl.create);                                         // público
router.get('/',  verificarToken, verificarAdmin, ctrl.getAll);         // solo admin

module.exports = router;
