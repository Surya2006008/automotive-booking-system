import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await axiosInstance.post('/auth/login', form);
      login(data);
      if (data.role === 'customer') navigate('/customer/dashboard');
      else if (data.role === 'dealer') navigate('/dealer/dashboard');
      else navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const inputStyle = {
    width: '100%', padding: '14px 16px', boxSizing: 'border-box',
    background: 'rgba(255,255,255,0.06)',
    border: '1.5px solid rgba(255,255,255,0.12)',
    borderRadius: '10px', color: '#fff', fontSize: '14px',
    fontFamily: "'Outfit', sans-serif", outline: 'none',
    transition: 'border-color 0.2s',
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;800;900&family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet" />

      {/* Background video */}
      <video autoPlay muted loop playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}>
        <source src="/bg.mp4" type="video/mp4" />
      </video>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.65)', zIndex: 1 }} />

      {/* Card */}
      <div style={{
        position: 'relative', zIndex: 2,
        background: 'rgba(10,10,10,0.80)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        border: '1.5px solid rgba(255,140,0,0.4)',
        borderRadius: '20px', padding: '48px 40px',
        width: '100%', maxWidth: '420px',
        boxShadow: '0 8px 60px rgba(0,0,0,0.7), 0 0 60px rgba(255,140,0,0.06)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ fontSize: '32px', marginBottom: '10px' }}>🚗</div>
          <h1 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 800, fontSize: '24px',
            color: '#fff', margin: 0, letterSpacing: '2px',
          }}>
            SPEED<span style={{ color: '#ff8c00' }}>SERVE</span>
          </h1>
          <p style={{ fontFamily: "'Outfit', sans-serif", color: 'rgba(255,255,255,0.35)', fontSize: '12px', marginTop: '8px', letterSpacing: '3px', textTransform: 'uppercase' }}>
            Sign in to your account
          </p>
        </div>

        {error && (
          <div style={{ background: 'rgba(255,60,60,0.15)', border: '1px solid rgba(255,60,60,0.4)', borderRadius: '8px', padding: '10px 14px', color: '#ff6b6b', fontSize: '13px', marginBottom: '20px', fontFamily: "'Outfit', sans-serif" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <input type="email" placeholder="Email" value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })} required style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'rgba(255,140,0,0.8)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'} />
          </div>
          <div style={{ marginBottom: '28px' }}>
            <input type="password" placeholder="Password" value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })} required style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'rgba(255,140,0,0.8)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'} />
          </div>

          <button type="submit" style={{
            width: '100%', padding: '14px',
            background: 'transparent',
            border: '2px solid #ff8c00',
            borderRadius: '10px', color: '#ff8c00',
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: 700, fontSize: '14px',
            cursor: 'pointer', letterSpacing: '2px',
            transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.target.style.background = '#ff8c00'; e.target.style.color = '#000'; }}
            onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#ff8c00'; }}>
            LOGIN
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontFamily: "'Outfit', sans-serif" }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#ff8c00', fontWeight: 700, textDecoration: 'none' }}>Register</Link>
        </p>
        <p style={{ textAlign: 'center', marginTop: '10px' }}>
          <Link to="/" style={{ color: 'rgba(255,255,255,0.25)', fontSize: '12px', textDecoration: 'none', fontFamily: "'Outfit', sans-serif" }}>← Back to home</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;