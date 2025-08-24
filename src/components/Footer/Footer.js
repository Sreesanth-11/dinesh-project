import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <Link to="/" className="nav-brand">
              <i className="fas fa-calendar-alt"></i>
              <span>Evently</span>
            </Link>
            <p>© {currentYear} Evently. All rights reserved.</p>
          </div>
          <div className="footer-links">
            <Link to="#" className="footer-link">Privacy</Link>
            <Link to="#" className="footer-link">Terms</Link>
            <Link to="#" className="footer-link">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
