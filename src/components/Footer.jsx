import React from 'react';

const Footer = () => {
  const styles = {
    footer: {
      backgroundColor: 'black',
      borderTop: '1px solid #e5e7eb',
      marginTop: '2rem',
      fontFamily: 'Arial, sans-serif',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '24px 16px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontSize: '14px',
      color: '#6b7280',
    },
    links: {
      display: 'flex',
      gap: '16px',
      marginTop: '12px',
    },
    link: {
      color: '#6b7280',
      textDecoration: 'none',
      transition: 'color 0.3s',
    },
    linkHover: {
      color: '#2563eb', // blue-600
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <p>&copy; {new Date().getFullYear()} ADITTAN. All rights reserved.</p>
        <div style={styles.links}>
          <a
            href="#"
            style={styles.link}
            onMouseOver={(e) => (e.target.style.color = styles.linkHover.color)}
            onMouseOut={(e) => (e.target.style.color = styles.link.color)}
          >
            Privacy Policy
          </a>
          <a
            href="#"
            style={styles.link}
            onMouseOver={(e) => (e.target.style.color = styles.linkHover.color)}
            onMouseOut={(e) => (e.target.style.color = styles.link.color)}
          >
            Terms of Service
          </a>
          <a
            href="#"
            style={styles.link}
            onMouseOver={(e) => (e.target.style.color = styles.linkHover.color)}
            onMouseOut={(e) => (e.target.style.color = styles.link.color)}
          >
            Support
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
