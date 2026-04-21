const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/auth.controller');

router.post('/registro',    ctrl.registro);
router.post('/login',       ctrl.login);
router.post('/admin/login', ctrl.loginAdmin);

module.exports = router;
