import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNotification } from '../../contexts/NotificationContext';
import EventCard from '../../components/EventCard/EventCard';
import SearchSection from '../../components/SearchSection/SearchSection';
import './Home.css';

const Home = () => {
  const { showNotification } = useNotification();
  const [searchTerm, setSearchTerm] = useState('');

  const featuredEvents = [
    {
      id: 1,
      title: "FutureTech Summit 2025",
      date: "Sep 12",
      location: "San Francisco",
      description: "A gathering of innovators and leaders shaping the next wave of technology.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: { text: "Early Bird", type: "early-bird" },
      category: "tech"
    },
    {
      id: 2,
      title: "City Lights Music Fest",
      date: "Oct 07",
      location: "Austin",
      description: "An electrifying night with top artists and immersive light shows.",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: { text: "Limited", type: "limited" },
      category: "music"
    },
    {
      id: 3,
      title: "Startup Workshop: Go-To-Market",
      date: "Aug 28",
      location: "Remote",
      description: "Hands-on tactics to validate your product and launch successfully.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: { text: "Online", type: "online" },
      category: "business"
    }
  ];

  const handleExploreEvents = () => {
    // This would typically navigate to events page with filters
    showNotification('Redirecting to events page...', 'info');
  };

  const handleGoToProfile = () => {
    showNotification('Opening your profile...', 'info');
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term.trim()) {
      showNotification(`Searching for "${term}"...`, 'info');
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1>Discover, register, and manage events effortlessly</h1>
            <p>Your modern hub for conferences, concerts, workshops, and meetups. Explore curated events and secure your spot in seconds.</p>
            <div className="hero-actions">
              <Link to="/events" className="btn btn-primary btn-large">
                <i className="fas fa-compass"></i>
                Explore Events
              </Link>
              <Link to="/profile" className="btn btn-secondary btn-large">
                <i className="fas fa-user"></i>
                Go to Profile
              </Link>
            </div>
            <div className="hero-categories">
              <span className="category-tag">Tech</span>
              <span className="category-tag">Music</span>
              <span className="category-tag">Business</span>
              <span className="category-tag">Art</span>
            </div>
          </div>
          <div className="hero-image">
            <img 
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="University Event"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Search Section */}
      <SearchSection onSearch={handleSearch} />

      {/* Featured Events */}
      <section className="featured-events">
        <div className="container">
          <div className="section-header">
            <div className="section-title">
              <h2>Featured events</h2>
              <p>Handpicked experiences happening soon</p>
            </div>
            <Link to="/events" className="view-all">View all</Link>
          </div>
          <div className="events-grid">
            {featuredEvents.map(event => (
              <EventCard 
                key={event.id} 
                event={event}
                onRegister={() => showNotification(`Registered for ${event.title}!`, 'success')}
                onViewDetails={() => showNotification(`Viewing details for ${event.title}`, 'info')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us">
        <div className="container">
          <div className="section-title">
            <h2>Why choose us</h2>
            <p>Built for speed, clarity, and delightful experiences</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-mouse-pointer"></i>
              </div>
              <h3>Seamless registration</h3>
              <p>Register in a few clicks with clear pricing and instant confirmation.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-search"></i>
              </div>
              <h3>Powerful discovery</h3>
              <p>Search and filter by category, date, price and location to find the perfect event.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-calendar-check"></i>
              </div>
              <h3>Profile & calendar</h3>
              <p>Track registrations and view your upcoming schedule at a glance.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
