import { Link } from 'react-router-dom';

const PendingApproval = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f0f0f', fontFamily: "'Outfit', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&display=swap" rel="stylesheet" />
      <div style={{ textAlign: 'center', padding: '40px', background: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(255,140,0,0.3)', borderRadius: '20px', maxWidth: '440px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
        <h2 style={{ color: '#fff', fontWeight: 800, fontSize: '24px', marginBottom: '12px' }}>
          Application <span style={{ color: '#ff8c00' }}>Submitted!</span>
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
          Your dealer registration is under review. Our admin will verify your shop details and photos. You'll be able to access your dashboard once approved.
        </p>
        <div style={{ background: 'rgba(255,140,0,0.08)', border: '1px solid rgba(255,140,0,0.2)', borderRadius: '10px', padding: '14px', marginBottom: '24px' }}>
          <p style={{ color: '#ff8c00', fontSize: '13px', margin: 0 }}>⏱ Approval usually takes 24-48 hours</p>
        </div>
        <Link to="/login" style={{ display: 'inline-block', padding: '12px 32px', background: 'transparent', border: '2px solid #ff8c00', borderRadius: '10px', color: '#ff8c00', fontWeight: 700, textDecoration: 'none', fontSize: '15px' }}>
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default PendingApproval;