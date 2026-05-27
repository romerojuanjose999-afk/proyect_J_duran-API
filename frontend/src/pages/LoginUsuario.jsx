import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUsuario } from '../services/auth.service';

export default function LoginUsuario() {
  const [form, setForm]       = useState({ correo: '', password: '' });
  const [error, setError]     = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await loginUsuario(form);
      localStorage.setItem('token',       res.data.token);
      localStorage.setItem('usuario_id',  res.data.usuario_id);
      localStorage.setItem('nombre',      res.data.nombre);
      navigate('/inicio');
    } catch (err) {
      setError(err.response?.data?.msg || 'Credenciales incorrectas');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      {/* Fondo decorativo */}
      <div style={styles.bgCircle1} />
      <div style={styles.bgCircle2} />

      <div style={styles.card}>
        {/* Encabezado */}
        <div style={styles.header}>
          <div style={styles.logo}>☕</div>
          <h1 style={styles.title}>J Duran Coffee</h1>
          <p style={styles.subtitle}>Bienvenido de nuevo</p>
        </div>

        {/* Error */}
        {error && (
          <div style={styles.errorBox}>
            <span style={{ marginRight: 6 }}>⚠️</span>{error}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Correo electrónico</label>
            <div style={styles.inputWrapper}>
              <span style={styles.icon}>✉️</span>
              <input
                type="email"
                placeholder="tucorreo@email.com"
                value={form.correo}
                onChange={e => setForm({ ...form, correo: e.target.value })}
                required
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Contraseña</label>
            <div style={styles.inputWrapper}>
              <span style={styles.icon}>🔒</span>
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
                style={styles.input}
              />
            </div>
          </div>

          <button type="submit" disabled={loading} style={{
            ...styles.btn,
            background: loading ? '#a08060' : '#3d2b1f',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}>
            {loading ? (
              <span>Ingresando<span style={styles.dots}>...</span></span>
            ) : 'Iniciar sesión'}
          </button>
        </form>

        {/* Separador */}
        <div style={styles.divider}>
          <span style={styles.dividerLine} />
          <span style={styles.dividerText}>¿No tienes cuenta?</span>
          <span style={styles.dividerLine} />
        </div>

        {/* Registro */}
        <Link to="/registro" style={styles.registerLink}>
          Crear cuenta gratis
        </Link>

        {/* Footer */}
        <p style={styles.footer}>J Duran Coffee © 2025</p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #2c1810 0%, #5c3827 50%, #8b5e3c 100%)',
    padding: '20px',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: "'Segoe UI', sans-serif",
  },
  bgCircle1: {
    position: 'absolute',
    width: 400,
    height: 400,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.04)',
    top: -100,
    right: -100,
    pointerEvents: 'none',
  },
  bgCircle2: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.04)',
    bottom: -80,
    left: -80,
    pointerEvents: 'none',
  },
  card: {
    background: 'white',
    borderRadius: 20,
    padding: '44px 40px 32px',
    width: '100%',
    maxWidth: 400,
    boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
    position: 'relative',
    zIndex: 1,
  },
  header: {
    textAlign: 'center',
    marginBottom: 28,
  },
  logo: {
    fontSize: '3.2rem',
    marginBottom: 8,
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))',
  },
  title: {
    color: '#3d2b1f',
    fontSize: '1.7rem',
    fontWeight: 700,
    margin: '0 0 4px',
    letterSpacing: '-0.5px',
  },
  subtitle: {
    color: '#9b8070',
    fontSize: 13,
    margin: 0,
  },
  errorBox: {
    background: '#fff5f5',
    border: '1px solid #fecaca',
    borderRadius: 10,
    padding: '10px 14px',
    marginBottom: 18,
    color: '#b91c1c',
    fontSize: 13,
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: 600,
    color: '#5c3d2e',
    letterSpacing: '0.3px',
    textTransform: 'uppercase',
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    border: '1.5px solid #e5ddd7',
    borderRadius: 10,
    background: '#faf8f6',
    transition: 'border-color 0.2s',
    overflow: 'hidden',
  },
  icon: {
    padding: '0 12px',
    fontSize: 15,
    flexShrink: 0,
  },
  input: {
    flex: 1,
    border: 'none',
    background: 'transparent',
    padding: '11px 12px 11px 0',
    fontSize: 14,
    color: '#3d2b1f',
    outline: 'none',
  },
  btn: {
    width: '100%',
    padding: '13px',
    color: 'white',
    border: 'none',
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 600,
    marginTop: 4,
    transition: 'background 0.2s, transform 0.1s',
    letterSpacing: '0.2px',
  },
  dots: {
    display: 'inline-block',
    animation: 'none',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    margin: '22px 0 16px',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    background: '#e5ddd7',
  },
  dividerText: {
    fontSize: 12,
    color: '#9b8070',
    whiteSpace: 'nowrap',
  },
  registerLink: {
    display: 'block',
    width: '100%',
    padding: '12px',
    textAlign: 'center',
    border: '1.5px solid #3d2b1f',
    borderRadius: 10,
    color: '#3d2b1f',
    textDecoration: 'none',
    fontSize: 14,
    fontWeight: 600,
    transition: 'background 0.2s',
    boxSizing: 'border-box',
  },
  footer: {
    textAlign: 'center',
    fontSize: 11,
    color: '#c5b8b0',
    marginTop: 22,
    marginBottom: 0,
  },
};
