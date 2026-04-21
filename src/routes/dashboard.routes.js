const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/dashboard.controller');
const { verificarToken } = require('../middlewares/auth.middleware');
const { verificarAdmin } = require('../middlewares/admin.middleware');

router.get('/metricas', verificarToken, verificarAdmin, ctrl.getMetricas);

module.exports = router;
