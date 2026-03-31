import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const MECHANIC_IMG = 'https://www.shutterstock.com/image-photo/portrait-shot-handsome-mechanic-working-600nw-1711144648.jpg';

const SERVICES = [
  { icon: '🛢', title: 'Oil Change', desc: 'Full synthetic & conventional oil change with filter replacement.' },
  { icon: '🔧', title: 'Engine Tune-up', desc: 'Spark plugs, air filters, and full engine diagnostics.' },
  { icon: '🛞', title: 'Tyre Rotation', desc: 'Balanced rotation to extend tyre life and improve handling.' },
  { icon: '🧊', title: 'AC Service', desc: 'Full AC system check, refrigerant refill, and leak testing.' },
  { icon: '🛑', title: 'Brake Inspection', desc: 'Comprehensive brake pad, rotor, and fluid inspection.' },
  { icon: '⭐', title: 'Full Service', desc: 'Complete bumper-to-bumper vehicle service package.' },
];

const STATS = [
  { value: '5000+', label: 'Happy Customers' },
  { value: '12+', label: 'Years Experience' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '24/7', label: 'Support' },
];

const DEFAULT_REVIEWS = [
  { name: 'Arjun Sharma', text: 'Booked my car service in under 2 minutes. The dealer was on time and the status updates were amazing!', stars: 5 },
  { name: 'Priya Reddy', text: 'Love how easy it is to track my appointment. No more calling the service center every hour.', stars: 5 },
  { name: 'Kiran Mehta', text: 'Professional service, transparent pricing. SpeedServe has completely changed how I handle car maintenance.', stars: 5 },
];

export default function LandingPage() {
  const [dark, setDark] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [visible, setVisible] = useState({});
  const refs = useRef({});
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get('/admin/reviews').then(({ data }) => setReviews(data)).catch(() => {});
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) setVisible(v => ({ ...v, [e.target.dataset.id]: true }));
      }),
      { threshold: 0.12 }
    );
    Object.values(refs.current).forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const setRef = id => el => { refs.current[id] = el; };
  const fadeIn = (id, delay = 0) => ({
    opacity: visible[id] ? 1 : 0,
    transform: visible[id] ? 'translateY(0)' : 'translateY(28px)',
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  const t = dark ? {
    bg: '#0a0a0f', bg2: '#111118', bg3: '#1a1a24',
    text: '#f0f0f8', textMuted: '#8888aa',
    accent: '#ff8c00', accentDim: '#ff8c0018',
    border: '#ffffff15', card: '#13131c',
    navBg: '#0a0a0fee',
  } : {
    bg: '#f5f5fa', bg2: '#ffffff', bg3: '#ebebf5',
    text: '#0a0a0f', textMuted: '#55556a',
    accent: '#cc6e00', accentDim: '#cc6e0015',
    border: '#00000012', card: '#ffffff',
    navBg: '#f5f5faee',
  };

  return (
    <div style={{ background: t.bg, color: t.text, fontFamily: "'Outfit', sans-serif", minHeight: '100vh', transition: 'all 0.3s' }}>
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;800;900&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: t.navBg, backdropFilter: 'blur(16px)', borderBottom: `1px solid ${t.border}`, padding: '0 6%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '66px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '18px', letterSpacing: '2px', color: t.text }}>
            SPEED<span style={{ color: t.accent }}>SERVE</span>
          </span>
        </div>
        <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
          {['Services', 'About', 'Reviews'].map(s => (
            <a key={s} href={`#${s.toLowerCase()}`}
              style={{ color: t.textMuted, textDecoration: 'none', fontSize: '14px', fontWeight: 500, transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = t.accent}
              onMouseLeave={e => e.target.style.color = t.textMuted}>{s}</a>
          ))}
          <button onClick={() => setDark(!dark)} style={{ background: t.bg3, border: `1px solid ${t.border}`, borderRadius: '20px', padding: '6px 14px', cursor: 'pointer', color: t.text, fontSize: '13px', fontFamily: "'Outfit', sans-serif" }}>
            {dark ? '☀ Light' : '🌙 Dark'}
          </button>
          <button onClick={() => navigate('/login')} style={{ background: t.accent, border: 'none', borderRadius: '8px', padding: '9px 22px', cursor: 'pointer', color: '#fff', fontFamily: "'Orbitron', sans-serif", fontWeight: 700, fontSize: '11px', letterSpacing: '1px', transition: 'opacity 0.2s' }}
            onMouseEnter={e => e.target.style.opacity = '0.85'}
            onMouseLeave={e => e.target.style.opacity = '1'}>
            BOOK NOW
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '0 6%', paddingTop: '66px', position: 'relative', overflow: 'hidden' }}>
        {/* glow blobs */}
        <div style={{ position: 'absolute', top: '15%', right: '38%', width: '400px', height: '400px', background: `radial-gradient(circle, ${t.accent}14 0%, transparent 70%)`, borderRadius: '50%', pointerEvents: 'none' }} />

        {/* LEFT TEXT */}
        <div style={{ flex: 1, maxWidth: '580px', zIndex: 1 }}>
          <div style={{ display: 'inline-block', background: t.accentDim, border: `1px solid ${t.accent}55`, borderRadius: '20px', padding: '6px 16px', fontSize: '12px', color: t.accent, fontFamily: "'Orbitron', sans-serif", fontWeight: 700, marginBottom: '28px', letterSpacing: '1px' }}>
            🏆 #1 RATED AUTO SERVICE
          </div>
          <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(32px, 5vw, 58px)', fontWeight: 900, lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-1px' }}>
            YOUR CAR<br />
            DESERVES<br />
            <span style={{ color: t.accent }}>EXPERT CARE.</span>
          </h1>
          <p style={{ fontSize: '17px', color: t.textMuted, lineHeight: 1.75, marginBottom: '40px', maxWidth: '460px', fontWeight: 300 }}>
            Book your vehicle service in seconds. Professional mechanics, transparent updates, zero hassle.
          </p>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/register')} style={{
              background: t.accent, border: 'none', borderRadius: '10px',
              padding: '14px 32px', cursor: 'pointer', color: '#fff',
              fontFamily: "'Orbitron', sans-serif", fontWeight: 700, fontSize: '12px',
              letterSpacing: '1.5px', transition: 'all 0.2s',
              boxShadow: `0 6px 28px ${t.accent}44`,
            }}
              onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.target.style.transform = 'translateY(0)'}>
              GET STARTED →
            </button>
            <button onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: 'transparent', border: `1.5px solid ${t.border}`,
                borderRadius: '10px', padding: '14px 32px', cursor: 'pointer',
                color: t.text, fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '14px',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => e.target.style.borderColor = t.accent}
              onMouseLeave={e => e.target.style.borderColor = t.border}>
              View Services
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1, padding: '40px 0' }}>
          <div style={{ position: 'relative' }}>
            {/* Glow ring behind image */}
            <div style={{ position: 'absolute', inset: '-20px', background: `radial-gradient(circle, ${t.accent}22 0%, transparent 70%)`, borderRadius: '50%', zIndex: 0 }} />
            <img
              src={MECHANIC_IMG}
              alt="Professional mechanic"
              style={{
                width: 'clamp(260px, 30vw, 440px)',
                height: 'clamp(260px, 30vw, 440px)',
                objectFit: 'cover',
                borderRadius: '50%',
                border: `3px solid ${t.accent}66`,
                boxShadow: `0 0 60px ${t.accent}33, 0 20px 60px rgba(0,0,0,0.4)`,
                position: 'relative', zIndex: 1,
                display: 'block',
              }}
            />
            {/* Floating badge */}
            <div style={{
              position: 'absolute', bottom: '20px', left: '-20px', zIndex: 2,
              background: dark ? 'rgba(10,10,10,0.9)' : 'rgba(255,255,255,0.95)',
              border: `1px solid ${t.accent}55`,
              borderRadius: '12px', padding: '10px 16px',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            }}>
              <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '18px', fontWeight: 900, color: t.accent }}>98%</div>
              <div style={{ fontSize: '11px', color: t.textMuted, fontFamily: "'Outfit', sans-serif" }}>Satisfaction Rate</div>
            </div>
            <div style={{
              position: 'absolute', top: '20px', right: '-20px', zIndex: 2,
              background: dark ? 'rgba(10,10,10,0.9)' : 'rgba(255,255,255,0.95)',
              border: `1px solid ${t.accent}55`,
              borderRadius: '12px', padding: '10px 16px',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            }}>
              <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '18px', fontWeight: 900, color: t.accent }}>5K+</div>
              <div style={{ fontSize: '11px', color: t.textMuted, fontFamily: "'Outfit', sans-serif" }}>Happy Clients</div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section ref={setRef('stats')} data-id="stats" style={{ padding: '56px 6%', background: t.bg2, borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '32px', maxWidth: '900px', margin: '0 auto', textAlign: 'center', ...fadeIn('stats') }}>
          {STATS.map((s, i) => (
            <div key={i}>
              <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '36px', fontWeight: 900, color: t.accent }}>{s.value}</div>
              <div style={{ color: t.textMuted, fontSize: '13px', fontWeight: 500, marginTop: '6px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: '100px 6%' }}>
        <div ref={setRef('svc-title')} data-id="svc-title" style={{ textAlign: 'center', marginBottom: '56px', ...fadeIn('svc-title') }}>
          <div style={{ color: t.accent, fontFamily: "'Orbitron', sans-serif", fontSize: '11px', letterSpacing: '3px', marginBottom: '12px' }}>WHAT WE OFFER</div>
          <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 900, letterSpacing: '-0.5px' }}>OUR SERVICES</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '18px', maxWidth: '1100px', margin: '0 auto' }}>
          {SERVICES.map((s, i) => (
            <div key={i} ref={setRef(`s${i}`)} data-id={`s${i}`}
              style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: '16px', padding: '28px', cursor: 'default', transition: 'border-color 0.3s, transform 0.3s', ...fadeIn(`s${i}`, i * 0.07) }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.transform = 'translateY(0)'; }}>
              <div style={{ fontSize: '34px', marginBottom: '14px' }}>{s.icon}</div>
              <div style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 700, fontSize: '13px', letterSpacing: '0.5px', marginBottom: '10px', color: t.text }}>{s.title.toUpperCase()}</div>
              <div style={{ color: t.textMuted, fontSize: '14px', lineHeight: 1.65 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: '100px 6%', background: t.bg2, borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}` }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <div ref={setRef('about')} data-id="about" style={fadeIn('about')}>
            <div style={{ color: t.accent, fontFamily: "'Orbitron', sans-serif", fontSize: '11px', letterSpacing: '3px', marginBottom: '14px' }}>WHO WE ARE</div>
            <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(22px, 3vw, 36px)', fontWeight: 900, letterSpacing: '-0.5px', marginBottom: '20px', lineHeight: 1.2 }}>BUILT FOR DRIVERS,<br />BY MECHANICS.</h2>
            <p style={{ color: t.textMuted, lineHeight: 1.8, fontSize: '15px', marginBottom: '16px' }}>
              SpeedServe was founded with one mission — make vehicle maintenance effortless. No more waiting on hold, no more guessing when your car will be ready.
            </p>
            <p style={{ color: t.textMuted, lineHeight: 1.8, fontSize: '15px', marginBottom: '32px' }}>
              Our platform connects you directly with certified dealers, gives real-time status updates, and puts you in full control of your vehicle's service history.
            </p>
          </div>
          <div ref={setRef('howit')} data-id="howit" style={{ background: t.bg3, borderRadius: '20px', padding: '36px', border: `1px solid ${t.border}`, ...fadeIn('howit', 0.2) }}>
            <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '14px', fontWeight: 800, marginBottom: '28px', color: t.text, letterSpacing: '1px' }}>HOW IT WORKS</div>
            {[['01', 'Register & Login', 'Create your free account in seconds.'],
              ['02', 'Book Appointment', 'Choose dealer, service, date & time.'],
              ['03', 'Track Status', 'Get real-time updates on your service.']].map(([n, title, desc]) => (
              <div key={n} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '22px' }}>
                <div style={{ background: t.accent, color: '#fff', borderRadius: '8px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Orbitron', sans-serif", fontWeight: 800, fontSize: '11px', flexShrink: 0 }}>{n}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '3px', fontFamily: "'Outfit', sans-serif" }}>{title}</div>
                  <div style={{ color: t.textMuted, fontSize: '13px', fontFamily: "'Outfit', sans-serif" }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" style={{ padding: '100px 6%' }}>
        <div ref={setRef('rev-title')} data-id="rev-title" style={{ textAlign: 'center', marginBottom: '56px', ...fadeIn('rev-title') }}>
          <div style={{ color: t.accent, fontFamily: "'Orbitron', sans-serif", fontSize: '11px', letterSpacing: '3px', marginBottom: '12px' }}>TESTIMONIALS</div>
          <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(22px, 4vw, 38px)', fontWeight: 900 }}>REAL REVIEWS</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '18px', maxWidth: '1100px', margin: '0 auto' }}>
          {(reviews.length > 0 ? reviews : DEFAULT_REVIEWS).map((r, i) => (
            <div key={i} ref={setRef(`r${i}`)} data-id={`r${i}`}
              style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: '16px', padding: '28px', ...fadeIn(`r${i}`, i * 0.1) }}>
              <div style={{ color: t.accent, fontSize: '18px', marginBottom: '14px', letterSpacing: '2px' }}>{'★'.repeat(r.stars || 5)}</div>
              <p style={{ color: t.textMuted, fontSize: '14px', lineHeight: 1.75, marginBottom: '20px', fontStyle: 'italic' }}>"{r.text}"</p>
              <div style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 700, fontSize: '11px', color: t.text, letterSpacing: '1px' }}>{r.name.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section ref={setRef('cta')} data-id="cta" style={{ padding: '100px 6%', background: t.bg2, borderTop: `1px solid ${t.border}`, textAlign: 'center' }}>
        <div style={fadeIn('cta')}>
          <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(22px, 4vw, 44px)', fontWeight: 900, letterSpacing: '-0.5px', marginBottom: '16px', lineHeight: 1.2 }}>
            READY TO BOOK YOUR<br /><span style={{ color: t.accent }}>NEXT SERVICE?</span>
          </h2>
          <p style={{ color: t.textMuted, fontSize: '16px', marginBottom: '40px', fontWeight: 300 }}>Join thousands of drivers who trust SpeedServe.</p>
          <button onClick={() => navigate('/register')}
            style={{
              background: t.accent, border: 'none', borderRadius: '12px',
              padding: '16px 48px', cursor: 'pointer', color: '#fff',
              fontFamily: "'Orbitron', sans-serif", fontWeight: 800, fontSize: '13px',
              letterSpacing: '2px', boxShadow: `0 8px 40px ${t.accent}44`,
              transition: 'transform 0.2s',
            }}
            onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
            onMouseLeave={e => e.target.style.transform = 'scale(1)'}>
            CREATE FREE ACCOUNT →
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '30px 6%', borderTop: `1px solid ${t.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '14px', color: t.accent, letterSpacing: '2px' }}>SPEEDSERVE</span>
        <span style={{ color: t.textMuted, fontSize: '13px', fontFamily: "'Outfit', sans-serif" }}>© 2026 SpeedServe. All rights reserved.</span>
        <button onClick={() => navigate('/login')} style={{ background: 'transparent', border: `1px solid ${t.border}`, borderRadius: '8px', padding: '8px 20px', cursor: 'pointer', color: t.text, fontSize: '12px', fontFamily: "'Orbitron', sans-serif", fontWeight: 600, letterSpacing: '1px' }}>
          LOGIN →
        </button>
      </footer>
    </div>
  );
}