import React from 'react';
import { useNotification } from '../../contexts/NotificationContext';
import './About.css';

const About = () => {
  const { showNotification } = useNotification();

  const stats = [
    { number: '120+', label: 'Universities served' },
    { number: '9.4/10', label: 'Student satisfaction' },
    { number: '50k', label: 'Events hosted' },
    { number: '24/7', label: 'Support' }
  ];

  const offerings = [
    {
      icon: 'fas fa-calendar-plus',
      title: 'Event creation',
      description: 'Set up events with schedules, venues, and ticket sales in just a few clicks.'
    },
    {
      icon: 'fas fa-users',
      title: 'Attendance management',
      description: 'Handle registrations, check-ins, and check-outs with automated tools and real-time updates.'
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Reporting',
      description: 'Generate comprehensive engagement and ticket sales reports for every event.'
    }
  ];

  const values = [
    {
      icon: 'fas fa-graduation-cap',
      title: 'Student-first',
      description: 'We design every feature with student organizers at the center, prioritizing ease of use and accessibility.'
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Privacy & security',
      description: 'Protecting student data and maintaining trust is fundamental to everything we do.'
    },
    {
      icon: 'fas fa-lightbulb',
      title: 'Simplicity',
      description: 'A clean interface that helps you do complex tasks better.'
    },
    {
      icon: 'fas fa-handshake',
      title: 'Collaboration',
      description: 'Built for teams and clubs, approvals, and all the ways we thrive together.'
    }
  ];

  const team = [
    {
      name: 'Alex Kim',
      role: 'Product Lead',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      name: 'Priya Shah',
      role: 'Engineering',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      name: 'Diego Ruiz',
      role: 'Design',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      name: 'Morgan Lee',
      role: 'Customer Success',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    }
  ];

  const pressResources = [
    {
      icon: 'fas fa-newspaper',
      title: 'Press kit',
      description: 'Logos, screenshots, and brand guidelines for universities.',
      action: 'Download'
    },
    {
      icon: 'fas fa-envelope',
      title: 'Contact',
      description: 'Reach our team for partnerships and media inquiries.',
      action: 'Email us'
    },
    {
      icon: 'fas fa-file-alt',
      title: 'Docs',
      description: 'Implementation and getting guides for universities.',
      action: 'View docs'
    }
  ];

  const handleGetStarted = () => {
    showNotification('Redirecting to sign up...', 'info');
  };

  const handleWatchDemo = () => {
    showNotification('Demo video coming soon!', 'info');
  };

  const handlePressAction = (action) => {
    showNotification(`${action} feature coming soon!`, 'info');
  };

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="hero-content">
            <span className="hero-badge">Our Mission</span>
            <h1>Helping students create unforgettable campus events</h1>
            <p>Evently is a comprehensive platform designed to empower university students in creating, discovering, and managing exceptional campus events - from academic conferences to social gatherings.</p>
            <div className="hero-actions">
              <button className="btn btn-primary btn-large" onClick={handleGetStarted}>
                Get Started
              </button>
              <button className="btn btn-secondary btn-large" onClick={handleWatchDemo}>
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <h2>Our mission</h2>
            <div className="mission-card">
              <h3>Empower every student organizer</h3>
              <p>We believe campus events should be effortless to run and delightful to attend. Our platform reduces admin work so organizers can focus on building communities that bring students together.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="offerings-section">
        <div className="container">
          <h2>What we offer</h2>
          <div className="offerings-grid">
            {offerings.map((offering, index) => (
              <div key={index} className="offering-card">
                <div className="offering-icon">
                  <i className={offering.icon}></i>
                </div>
                <h3>{offering.title}</h3>
                <p>{offering.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2>Our values</h2>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">
                  <i className={value.icon}></i>
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2>Meet the team</h2>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-member">
                <div className="member-image">
                  <img src={member.image} alt={member.name} loading="lazy" />
                </div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press & Resources Section */}
      <section className="press-section">
        <div className="container">
          <h2>Press & resources</h2>
          <div className="press-grid">
            {pressResources.map((resource, index) => (
              <div key={index} className="press-card">
                <div className="press-icon">
                  <i className={resource.icon}></i>
                </div>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                <button 
                  className="btn btn-secondary"
                  onClick={() => handlePressAction(resource.action)}
                >
                  {resource.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
