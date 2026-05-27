const express    = require('express');
const cors       = require('cors');
const morgan     = require('morgan');
const rateLimit  = require('express-rate-limit');
const app        = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

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

app.get('/', (req, res) => {
  res.json({ ok: true, msg: '☕ J Duran Coffee API funcionando' });
});

module.exports = app;
