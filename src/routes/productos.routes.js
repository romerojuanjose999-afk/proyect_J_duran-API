const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/productos.controller');
const { verificarToken } = require('../middlewares/auth.middleware');
const { verificarAdmin } = require('../middlewares/admin.middleware');

router.get('/',           ctrl.getAll);            // GET  /api/v1/productos
router.get('/:id',        ctrl.getById);           // GET  /api/v1/productos/:id
router.post('/',          verificarToken, verificarAdmin, ctrl.create);   // POST
router.put('/:id',        verificarToken, verificarAdmin, ctrl.update);   // PUT
router.delete('/:id',     verificarToken, verificarAdmin, ctrl.remove);   // DELETE (lógico)

module.exports = router;
