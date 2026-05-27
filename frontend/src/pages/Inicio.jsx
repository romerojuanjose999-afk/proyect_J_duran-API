import { useNavigate } from 'react-router-dom';

export default function Inicio() {
  const nombre  = localStorage.getItem('nombre') || 'Cliente';
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario_id');
    localStorage.removeItem('nombre');
    navigate('/login-usuario');
  };

  const tarjetas = [
    { icon: '🛍️', titulo: 'Nuestros Productos', desc: 'Explora nuestra selección de cafés premium' },
    { icon: '📦', titulo: 'Mis Pedidos',         desc: 'Consulta el estado de tus pedidos' },
    { icon: '✉️', titulo: 'Contáctanos',         desc: 'Escríbenos, estamos para ayudarte' },
  ];

  return (
    <div style={styles.page}>
      <div style={styles.bgCircle1} />
      <div style={styles.bgCircle2} />

      <div style={styles.container}>
        {/* Navbar */}
        <header style={styles.navbar}>
          <div style={styles.brand}>
            <span style={{ fontSize: '1.6rem' }}>☕</span>
            <span style={styles.brandName}>J Duran Coffee</span>
          </div>
          <div style={styles.userArea}>
            <span style={styles.greeting}>Hola, {nombre} 👋</span>
            <button onClick={logout} style={styles.logoutBtn}>Cerrar sesión</button>
          </div>
        </header>

        {/* Hero */}
        <section style={styles.hero}>
          <h2 style={styles.heroTitle}>Bienvenido a J Duran Coffee</h2>
          <p style={styles.heroSub}>
            Café colombiano de la mejor calidad, directo del corazón del Tolima.
          </p>
        </section>

        {/* Tarjetas */}
        <div style={styles.grid}>
          {tarjetas.map(({ icon, titulo, desc }) => (
            <div key={titulo} style={styles.card}
              onMouseOver={e => e.currentTarget.style.transform = 'translateY(-6px)'}
              onMouseOut={e  => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={styles.cardIcon}>{icon}</div>
              <h3 style={styles.cardTitle}>{titulo}</h3>
              <p style={styles.cardDesc}>{desc}</p>
            </div>
          ))}
        </div>

        <p style={styles.footer}>J Duran Coffee © 2025 — Ibagué, Tolima, Colombia</p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(160deg, #fdf6f0 0%, #f5ebe0 100%)',
    padding: '0 0 40px',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: "'Segoe UI', sans-serif",
  },
  bgCircle1: {
    position: 'absolute', width: 500, height: 500, borderRadius: '50%',
    background: 'rgba(61,43,31,0.05)', top: -150, right: -100, pointerEvents: 'none',
  },
  bgCircle2: {
    position: 'absolute', width: 350, height: 350, borderRadius: '50%',
    background: 'rgba(61,43,31,0.05)', bottom: -100, left: -100, pointerEvents: 'none',
  },
  container: { maxWidth: 960, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 },
  navbar: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '20px 0', borderBottom: '1px solid rgba(61,43,31,0.1)', marginBottom: 40,
  },
  brand: { display: 'flex', alignItems: 'center', gap: 10 },
  brandName: { fontSize: '1.2rem', fontWeight: 700, color: '#3d2b1f', letterSpacing: '-0.3px' },
  userArea: { display: 'flex', alignItems: 'center', gap: 16 },
  greeting: { fontSize: 14, color: '#5c3d2e', fontWeight: 500 },
  logoutBtn: {
    padding: '7px 16px', background: '#3d2b1f', color: 'white', border: 'none',
    borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 500,
    transition: 'background 0.2s',
  },
  hero: { textAlign: 'center', marginBottom: 48 },
  heroTitle: { color: '#3d2b1f', fontSize: '2rem', fontWeight: 700, margin: '0 0 12px', letterSpacing: '-0.5px' },
  heroSub: { color: '#7d5c4a', fontSize: 16, margin: 0, maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: 20,
    marginBottom: 48,
  },
  card: {
    background: 'white', borderRadius: 16, padding: '32px 24px',
    textAlign: 'center', cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(61,43,31,0.08)',
    transition: 'transform 0.25s, box-shadow 0.25s',
  },
  cardIcon: { fontSize: '2.5rem', marginBottom: 14 },
  cardTitle: { color: '#3d2b1f', fontSize: '1rem', fontWeight: 700, margin: '0 0 8px' },
  cardDesc: { color: '#9b8070', fontSize: 13, margin: 0, lineHeight: 1.5 },
  footer: { textAlign: 'center', fontSize: 12, color: '#b09080' },
};
