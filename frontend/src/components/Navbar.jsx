import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <span className="navbar-brand fw-bold">🚗 AutoBook</span>
      <div className="ms-auto d-flex align-items-center gap-3">
        {user && (
          <>
            <span className="text-light small">
              {user.name} &nbsp;
              <span className="badge bg-secondary">{user.role}</span>
            </span>
            <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
