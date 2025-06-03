import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const styles = {
    header: {
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      padding: '12px 0',
      fontFamily: 'Arial, sans-serif',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    brand: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#007bff',
      textDecoration: 'none',
    },
    nav: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
    },
    link: {
      color: '#444',
      textDecoration: 'none',
      fontWeight: '500',
      transition: 'color 0.3s',
    },
    linkHover: {
      color: '#007bff',
    },
    logoutButton: {
      backgroundColor: '#dc3545',
      color: '#fff',
      padding: '6px 12px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      marginLeft: '8px',
      transition: 'background-color 0.3s',
    },
    userText: {
      marginLeft: '10px',
      color: '#666',
      fontSize: '14px',
    },
  };

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <Link to="/" style={styles.brand}>ADITTAN</Link>
        <nav style={styles.nav}>
          {user ? (
            <>
              <Link to="/" style={styles.link}>Dashboard</Link>
              <Link to="/invoices" style={styles.link}>Invoices</Link>
              <Link to="/expenses" style={styles.link}>Expenses</Link>
              <Link to="/reports" style={styles.link}>Reports</Link>
              <span style={styles.userText}>Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                style={styles.logoutButton}
                onMouseOver={(e) => (e.target.style.backgroundColor = '#c82333')}
                onMouseOut={(e) => (e.target.style.backgroundColor = '#dc3545')}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.link}>Login</Link>
              <Link to="/register" style={styles.link}>Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
