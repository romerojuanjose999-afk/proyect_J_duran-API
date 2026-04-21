const express = require('express');
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Rutas
const authRouter      = require('./routes/auth.routes');
const productosRouter = require('./routes/productos.routes');
const pedidosRouter   = require('./routes/pedidos.routes');
const usuariosRouter  = require('./routes/usuarios.routes');
const contactoRouter  = require('./routes/contacto.routes');
const dashboardRouter = require('./routes/dashboard.routes');

app.use('/api/v1/auth',      authRouter);
app.use('/api/v1/productos', productosRouter);
app.use('/api/v1/pedidos',   pedidosRouter);
app.use('/api/v1/usuarios',  usuariosRouter);
app.use('/api/v1/contacto',  contactoRouter);
app.use('/api/v1/dashboard', dashboardRouter);

// Ruta raíz
app.get('/', (req, res) => {
  res.json({ ok: true, msg: '☕ J Duran Coffee API funcionando' });
});

module.exports = app;
