import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem('email'); // Optional: We can save email during login
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div style={{ fontWeight: 'bold', fontSize: '1.25rem', color: 'var(--primary)' }}>
        Team Task Manager
      </div>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        {email && <span style={{ color: 'var(--text-muted)' }}>{email} ({role})</span>}
        <button onClick={handleLogout} className="btn btn-danger" style={{ padding: '0.4rem 0.8rem', fontSize: '0.875rem' }}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
