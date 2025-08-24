import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNotification } from "../../contexts/NotificationContext";
import { useAuth } from "../../contexts/AuthContext";
import AuthModal from "../Auth/AuthModal";
import "./Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState("login");
  const [showUserMenu, setShowUserMenu] = useState(false);

  const location = useLocation();
  const { showNotification } = useNotification();
  const { user, logout, isAuthenticated } = useAuth();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest(".navbar")) {
        setIsMenuOpen(false);
      }
      if (showUserMenu && !event.target.closest(".user-menu")) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen, showUserMenu]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCreateEvent = () => {
    if (!isAuthenticated) {
      setAuthModalMode("login");
      setAuthModalOpen(true);
      return;
    }
    showNotification("Create Event feature coming soon!", "info");
  };

  const handleBrowse = () => {
    showNotification("Browse feature activated!", "success");
  };

  const handleLogin = () => {
    setAuthModalMode("login");
    setAuthModalOpen(true);
  };

  const handleSignup = () => {
    setAuthModalMode("signup");
    setAuthModalOpen(true);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    showNotification("Successfully logged out", "success");
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          <i className="fas fa-calendar-alt"></i>
          <span>Evently</span>
        </Link>

        <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <li>
            <Link
              to="/"
              className={`nav-link ${isActiveLink("/") ? "active" : ""}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/events"
              className={`nav-link ${isActiveLink("/events") ? "active" : ""}`}
            >
              Events
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`nav-link ${isActiveLink("/about") ? "active" : ""}`}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={`nav-link ${isActiveLink("/contact") ? "active" : ""}`}
            >
              Contact Us
            </Link>
          </li>
          {isAuthenticated && (
            <li>
              <Link
                to="/profile"
                className={`nav-link ${
                  isActiveLink("/profile") ? "active" : ""
                }`}
              >
                Profile
              </Link>
            </li>
          )}
        </ul>

        <div className="nav-actions">
          {isAuthenticated ? (
            <>
              {user?.role === "admin" && (
                <button
                  className="btn btn-primary"
                  onClick={handleCreateEvent}
                  aria-label="Create new event"
                >
                  <i className="fas fa-plus"></i>
                  <span className="btn-text">Create Event</span>
                </button>
              )}
              <div className="user-menu">
                <button
                  className="user-avatar"
                  onClick={toggleUserMenu}
                  aria-label="User menu"
                >
                  <img src={user?.avatar} alt={user?.name} />
                  <span className="user-name">{user?.name}</span>
                  <i className="fas fa-chevron-down"></i>
                </button>
                {showUserMenu && (
                  <div className="user-dropdown">
                    <Link to="/profile" onClick={() => setShowUserMenu(false)}>
                      <i className="fas fa-user"></i>
                      Profile
                    </Link>
                    <button onClick={handleLogout}>
                      <i className="fas fa-sign-out-alt"></i>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <button
                className="btn btn-secondary"
                onClick={handleLogin}
                aria-label="Login"
              >
                <i className="fas fa-sign-in-alt"></i>
                <span className="btn-text">Login</span>
              </button>
              <button
                className="btn btn-primary"
                onClick={handleSignup}
                aria-label="Sign up"
              >
                <i className="fas fa-user-plus"></i>
                <span className="btn-text">Sign Up</span>
              </button>
            </>
          )}
        </div>

        <button
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
      />
    </nav>
  );
};

export default Header;
