import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registro } from '../services/auth.service';

export default function Registro() {
  const [form, setForm]         = useState({ nombre: '', correo: '', telefono: '', password: '', confirmar: '' });
  const [error, setError]       = useState(null);
  const [exito, setExito]       = useState(false);
  const [loading, setLoading]   = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirmar) {
      setError('Las contraseñas no coinciden');
      return;
    }
    if (form.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);
    try {
      await registro({
        nombre:   form.nombre,
        correo:   form.correo,
        telefono: form.telefono,
        password: form.password,
      });
      setExito(true);
      setTimeout(() => navigate('/login-usuario'), 2500);
    } catch (err) {
      setError(err.response?.data?.msg || 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  const update = (campo) => (e) => setForm({ ...form, [campo]: e.target.value });

  if (exito) {
    return (
      <div style={styles.page}>
        <div style={styles.bgCircle1} />
        <div style={styles.bgCircle2} />
        <div style={{ ...styles.card, textAlign: 'center', padding: '60px 40px' }}>
          <div style={{ fontSize: '4rem', marginBottom: 16 }}>🎉</div>
          <h2 style={{ color: '#3d2b1f', marginBottom: 8 }}>¡Registro exitoso!</h2>
          <p style={{ color: '#9b8070', fontSize: 14 }}>
            Tu cuenta fue creada correctamente.<br />
            Redirigiendo al inicio de sesión...
          </p>
          <div style={styles.progressBar}>
            <div style={styles.progressFill} />
          </div>
        </div>
      </div>
    );
  }

  const fields = [
    { key: 'nombre',    label: 'Nombre completo',      type: 'text',     icon: '👤', placeholder: 'Juan Pérez' },
    { key: 'correo',    label: 'Correo electrónico',   type: 'email',    icon: '✉️', placeholder: 'tucorreo@email.com' },
    { key: 'telefono',  label: 'Teléfono (opcional)',  type: 'tel',      icon: '📱', placeholder: '300 123 4567' },
    { key: 'password',  label: 'Contraseña',            type: 'password', icon: '🔒', placeholder: '••••••••' },
    { key: 'confirmar', label: 'Confirmar contraseña', type: 'password', icon: '🔐', placeholder: '••••••••' },
  ];

  return (
    <div style={styles.page}>
      <div style={styles.bgCircle1} />
      <div style={styles.bgCircle2} />

      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.logo}>☕</div>
          <h1 style={styles.title}>Crear cuenta</h1>
          <p style={styles.subtitle}>Únete a la comunidad J Duran Coffee</p>
        </div>

        {error && (
          <div style={styles.errorBox}>
            <span style={{ marginRight: 6 }}>⚠️</span>{error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          {fields.map(({ key, label, type, icon, placeholder }) => (
            <div key={key} style={styles.field}>
              <label style={styles.label}>{label}</label>
              <div style={styles.inputWrapper}>
                <span style={styles.icon}>{icon}</span>
                <input
                  type={type}
                  placeholder={placeholder}
                  value={form[key]}
                  onChange={update(key)}
                  required={key !== 'telefono'}
                  style={styles.input}
                />
              </div>
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.btn,
              background: loading ? '#a08060' : '#3d2b1f',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Registrando...' : 'Crear mi cuenta'}
          </button>
        </form>

        <div style={styles.divider}>
          <span style={styles.dividerLine} />
          <span style={styles.dividerText}>¿Ya tienes cuenta?</span>
          <span style={styles.dividerLine} />
        </div>

        <Link to="/login-usuario" style={styles.loginLink}>
          Iniciar sesión
        </Link>

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
    position: 'absolute', width: 400, height: 400, borderRadius: '50%',
    background: 'rgba(255,255,255,0.04)', top: -100, right: -100, pointerEvents: 'none',
  },
  bgCircle2: {
    position: 'absolute', width: 300, height: 300, borderRadius: '50%',
    background: 'rgba(255,255,255,0.04)', bottom: -80, left: -80, pointerEvents: 'none',
  },
  card: {
    background: 'white',
    borderRadius: 20,
    padding: '40px 40px 32px',
    width: '100%',
    maxWidth: 420,
    boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
    position: 'relative',
    zIndex: 1,
  },
  header: { textAlign: 'center', marginBottom: 24 },
  logo: { fontSize: '3rem', marginBottom: 8, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))' },
  title: { color: '#3d2b1f', fontSize: '1.6rem', fontWeight: 700, margin: '0 0 4px', letterSpacing: '-0.5px' },
  subtitle: { color: '#9b8070', fontSize: 13, margin: 0 },
  errorBox: {
    background: '#fff5f5', border: '1px solid #fecaca', borderRadius: 10,
    padding: '10px 14px', marginBottom: 16, color: '#b91c1c', fontSize: 13, textAlign: 'center',
  },
  form: { display: 'flex', flexDirection: 'column', gap: 14 },
  field: { display: 'flex', flexDirection: 'column', gap: 5 },
  label: { fontSize: 11, fontWeight: 600, color: '#5c3d2e', letterSpacing: '0.3px', textTransform: 'uppercase' },
  inputWrapper: {
    display: 'flex', alignItems: 'center',
    border: '1.5px solid #e5ddd7', borderRadius: 10,
    background: '#faf8f6', overflow: 'hidden',
  },
  icon: { padding: '0 12px', fontSize: 14, flexShrink: 0 },
  input: {
    flex: 1, border: 'none', background: 'transparent',
    padding: '10px 12px 10px 0', fontSize: 14, color: '#3d2b1f', outline: 'none',
  },
  btn: {
    width: '100%', padding: '13px', color: 'white', border: 'none',
    borderRadius: 10, fontSize: 15, fontWeight: 600, marginTop: 4,
    transition: 'background 0.2s', letterSpacing: '0.2px',
  },
  divider: { display: 'flex', alignItems: 'center', gap: 10, margin: '20px 0 14px' },
  dividerLine: { flex: 1, height: 1, background: '#e5ddd7' },
  dividerText: { fontSize: 12, color: '#9b8070', whiteSpace: 'nowrap' },
  loginLink: {
    display: 'block', width: '100%', padding: '12px', textAlign: 'center',
    border: '1.5px solid #3d2b1f', borderRadius: 10, color: '#3d2b1f',
    textDecoration: 'none', fontSize: 14, fontWeight: 600,
    transition: 'background 0.2s', boxSizing: 'border-box',
  },
  footer: { textAlign: 'center', fontSize: 11, color: '#c5b8b0', marginTop: 20, marginBottom: 0 },
  progressBar: {
    marginTop: 24, height: 4, background: '#f0ebe7', borderRadius: 4, overflow: 'hidden',
  },
  progressFill: {
    height: '100%', width: '100%', background: '#3d2b1f', borderRadius: 4,
    animation: 'fillBar 2.5s linear forwards',
  },
};
