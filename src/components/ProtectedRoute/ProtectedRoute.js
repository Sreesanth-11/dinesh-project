import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import AuthModal from '../Auth/AuthModal';

const ProtectedRoute = ({ children, requireAuth = true, fallback = null }) => {
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (requireAuth && !isAuthenticated) {
    if (fallback) {
      return fallback;
    }

    return (
      <div className="protected-route-fallback">
        <div className="container">
          <div className="auth-required">
            <div className="auth-required-content">
              <i className="fas fa-lock"></i>
              <h2>Authentication Required</h2>
              <p>You need to be logged in to access this page.</p>
              <div className="auth-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowAuthModal(true)}
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          initialMode="login"
        />
        
        <style jsx>{`
          .protected-route-fallback {
            min-height: 80vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f8fafc;
          }
          
          .auth-required {
            text-align: center;
            max-width: 400px;
            padding: 3rem 2rem;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          }
          
          .auth-required i {
            font-size: 3rem;
            color: #667eea;
            margin-bottom: 1.5rem;
          }
          
          .auth-required h2 {
            font-size: 1.75rem;
            font-weight: 600;
            color: #1a1a1a;
            margin-bottom: 1rem;
          }
          
          .auth-required p {
            color: #6b7280;
            margin-bottom: 2rem;
            line-height: 1.5;
          }
          
          .auth-actions {
            display: flex;
            justify-content: center;
          }
          
          .btn {
            padding: 0.75rem 2rem;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          
          .btn:hover {
            background: #5a67d8;
            transform: translateY(-1px);
          }
        `}</style>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
