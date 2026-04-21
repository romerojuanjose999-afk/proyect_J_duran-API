const pool = require('../config/db');

// GET /api/v1/dashboard/metricas
const getMetricas = async (req, res) => {
  try {
    const [ventas]      = await pool.query("SELECT COALESCE(SUM(total),0) as total FROM pedidos WHERE MONTH(fecha_pedido)=MONTH(NOW()) AND estado != 'Cancelado'");
    const [numPedidos]  = await pool.query("SELECT COUNT(*) as total FROM pedidos WHERE MONTH(fecha_pedido)=MONTH(NOW())");
    const [porEstado]   = await pool.query("SELECT estado, COUNT(*) as cantidad FROM pedidos GROUP BY estado");
    const [masVendidos] = await pool.query("SELECT p.nombre, SUM(dp.cantidad) as vendidos FROM detalle_pedido dp JOIN productos p ON dp.producto_id=p.id GROUP BY p.id ORDER BY vendidos DESC LIMIT 5");
    const [stockBajo]   = await pool.query("SELECT id, nombre, stock FROM productos WHERE stock <= 5 AND activo=1");

    res.json({
      ok: true,
      data: {
        ventas_mes:   ventas[0].total,
        pedidos_mes:  numPedidos[0].total,
        por_estado:   porEstado,
        mas_vendidos: masVendidos,
        stock_bajo:   stockBajo,
      }
    });
  } catch (err) {
    res.status(500).json({ ok: false, msg: err.message });
  }
};

module.exports = { getMetricas };
