import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'customer', phone: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await axiosInstance.post('/auth/register', form);
      login(data);
      if (data.role === 'customer') navigate('/customer/dashboard');
      else if (data.role === 'dealer') navigate('/dealer/dashboard');
      else navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  const inputStyle = {
    width: '100%', padding: '12px 16px', boxSizing: 'border-box',
    background: 'rgba(255,255,255,0.06)',
    border: '1.5px solid rgba(255,255,255,0.12)',
    borderRadius: '10px', color: '#fff', fontSize: '14px',
    fontFamily: "'Outfit', sans-serif", outline: 'none',
    transition: 'border-color 0.2s',
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&display=swap" rel="stylesheet" />

      <video autoPlay muted loop playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}>
        <source src="/bg.mp4" type="video/mp4" />
      </video>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.62)', zIndex: 1 }} />

      <div style={{
        position: 'relative', zIndex: 2,
        background: 'rgba(15,15,15,0.75)',
        backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
        border: '1.5px solid rgba(255,140,0,0.35)',
        borderRadius: '20px', padding: '40px',
        width: '100%', maxWidth: '440px',
        boxShadow: '0 8px 60px rgba(0,0,0,0.6), 0 0 40px rgba(255,140,0,0.08)',
        fontFamily: "'Outfit', sans-serif",
        maxHeight: '90vh', overflowY: 'auto',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>🚗</div>
          <h1 style={{ fontWeight: 800, fontSize: '26px', color: '#fff', margin: 0, letterSpacing: '-0.5px' }}>
            Speed<span style={{ color: '#ff8c00' }}>Serve</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', marginTop: '6px' }}>Create your account</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(255,60,60,0.15)', border: '1px solid rgba(255,60,60,0.4)', borderRadius: '8px', padding: '10px 14px', color: '#ff6b6b', fontSize: '13px', marginBottom: '16px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {[
            { placeholder: 'Full Name', key: 'name', type: 'text' },
            { placeholder: 'Email', key: 'email', type: 'email' },
            { placeholder: 'Phone Number', key: 'phone', type: 'text' },
            { placeholder: 'Password', key: 'password', type: 'password' },
          ].map(({ placeholder, key, type }) => (
            <div key={key} style={{ marginBottom: '14px' }}>
              <input type={type} placeholder={placeholder} value={form[key]}
                onChange={e => setForm({ ...form, [key]: e.target.value })}
                required={key !== 'phone'} style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'rgba(255,140,0,0.7)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'} />
            </div>
          ))}

          <div style={{ marginBottom: '24px' }}>
            <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}
              style={{ ...inputStyle, cursor: 'pointer' }}
              onFocus={e => e.target.style.borderColor = 'rgba(255,140,0,0.7)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.12)'}>
              <option value="customer" style={{ background: '#1a1a1a' }}>Register as Customer</option>
              <option value="dealer" style={{ background: '#1a1a1a' }}>Register as Dealer</option>
            </select>
          </div>

          <button type="submit" style={{
            width: '100%', padding: '14px',
            background: 'transparent', border: '2px solid #ff8c00',
            borderRadius: '10px', color: '#ff8c00',
            fontWeight: 700, fontSize: '16px', fontFamily: "'Outfit', sans-serif",
            cursor: 'pointer', letterSpacing: '0.5px', transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.target.style.background = '#ff8c00'; e.target.style.color = '#000'; }}
            onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#ff8c00'; }}>
            Create Account
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', color: 'rgba(255,255,255,0.45)', fontSize: '14px' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#ff8c00', fontWeight: 700, textDecoration: 'none' }}>Login</Link>
        </p>
        <p style={{ textAlign: 'center', marginTop: '10px' }}>
          <Link to="/" style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', textDecoration: 'none' }}>← Back to home</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;