import React, { useState } from 'react';
import { useNotification } from '../../contexts/NotificationContext';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showNotification } = useNotification();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      showNotification('Message sent successfully! We\'ll get back to you within 1 business day.', 'success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 2000);
  };

  const handleDepartmentContact = (department) => {
    showNotification(`Contacting ${department} department...`, 'info');
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="hero-content">
            <p className="hero-subtitle">Contact us</p>
            <h1>We'd love to hear from you</h1>
            <p className="hero-description">
              Questions about student events, onboarding your club, or press? Send us a message and the right team
              will get back within 1 business day.
            </p>
            <p className="hero-hours">Mon–Fri, 9am–6pm</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="contact-main">
        <div className="container">
          <div className="contact-layout">
            {/* Contact Form */}
            <div className="contact-form-section">
              <h2>Send a message</h2>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="University email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone (optional)"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    placeholder="How can we help?"
                    rows="6"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <p className="form-note">We respond within 24 hours.</p>
                <button 
                  type="submit" 
                  className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      Sending...
                    </>
                  ) : (
                    'Send message'
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="contact-info-section">
              <div className="contact-info">
                <h3>Contact information</h3>
                <div className="contact-details">
                  <div className="contact-item">
                    <i className="fas fa-envelope"></i>
                    <span>support@evently.edu</span>
                  </div>
                  <div className="contact-item">
                    <i className="fas fa-phone"></i>
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="contact-item">
                    <i className="fas fa-comments"></i>
                    <span>Live chat for organizers</span>
                  </div>
                </div>
              </div>

              {/* Departments */}
              <div className="departments">
                <h3>Departments</h3>
                <div className="department-cards">
                  <div className="department-card">
                    <h4>Student clubs</h4>
                    <p>Help with onboarding, roles, and approvals.</p>
                    <button 
                      className="btn btn-outline"
                      onClick={() => handleDepartmentContact('Student clubs')}
                    >
                      Contact
                    </button>
                  </div>
                  <div className="department-card">
                    <h4>University admin</h4>
                    <p>Integrations, SSO, and data exports.</p>
                    <button 
                      className="btn btn-outline"
                      onClick={() => handleDepartmentContact('University admin')}
                    >
                      Contact
                    </button>
                  </div>
                  <div className="department-card">
                    <h4>Press & media</h4>
                    <p>Interviews, statements, or assets.</p>
                    <button 
                      className="btn btn-outline"
                      onClick={() => handleDepartmentContact('Press & media')}
                    >
                      Contact
                    </button>
                  </div>
                </div>
              </div>

              {/* Visit Us */}
              <div className="visit-us">
                <h3>Visit us</h3>
                <div className="location-map">
                  <div className="map-placeholder">
                    <i className="fas fa-map-marker-alt"></i>
                    <p>Interactive map coming soon</p>
                  </div>
                </div>
                <p className="location-address">123 Campus Way, Suite 200, College Town, CT</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
