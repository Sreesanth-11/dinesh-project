import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useNotification } from "../../contexts/NotificationContext";
import { useAuth } from "../../contexts/AuthContext";
import "./EventDetails.css";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const { isAuthenticated, registerForEvent, isRegisteredForEvent } = useAuth();

  const [event, setEvent] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const isUserRegistered = event ? isRegisteredForEvent(event.id) : false;

  // Sample event data - in real app this would come from API
  const sampleEvent = {
    id: 1,
    title: "Campus AI Fair",
    description:
      "Student-run talks, demos, and networking. Free registration for all university students.",
    date: "Oct 3, 10:00 AM - 4:00 PM",
    location: "Engineering Hall, North Campus",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    badge: { text: "Free", type: "free" },
    busLines: "Bus lines 5, 7, 12",
    bikeRacks: "Bike racks available",
    eventDetails: {
      doorsOpen: "9:30 AM",
      wifiIncluded: true,
      snacksProvided: true,
    },
    aboutEvent:
      "Discover campus AI projects, student startups, and lightning talks. Network with peers and faculty.",
    highlights: [
      "12 speakers across 6 sessions",
      "Snacks and refreshments provided",
      "Student showcases and demos",
    ],
    speakers: [
      {
        id: 1,
        name: "Alex Chen",
        title: "CS Graduate",
        role: "Researcher",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      },
      {
        id: 2,
        name: "Priya Kumar",
        title: "ML Club President",
        role: "Student Leader",
        image:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      },
      {
        id: 3,
        name: "Diego Morales",
        title: "AI Society Lead",
        role: "Organizer",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      },
    ],
  };

  useEffect(() => {
    // Simulate API call to fetch event details
    setIsLoading(true);
    setTimeout(() => {
      setEvent(sampleEvent);
      setIsLoading(false);
    }, 1000);
  }, [id]);

  const handleSeatSelect = (seatId) => {
    setSelectedSeats((prev) => {
      if (prev.includes(seatId)) {
        return prev.filter((id) => id !== seatId);
      } else {
        return [...prev, seatId];
      }
    });
  };

  const handleAddToCalendar = () => {
    showNotification("Event added to calendar!", "success");
  };

  const handleSave = () => {
    showNotification("Event saved to your profile!", "success");
  };

  const handleShare = () => {
    // Copy to clipboard functionality
    navigator.clipboard.writeText(window.location.href);
    showNotification("Event link copied to clipboard!", "success");
  };

  const handleRegister = () => {
    if (!isAuthenticated) {
      showNotification("Please log in to register for events", "error");
      return;
    }

    if (selectedSeats.length === 0) {
      showNotification("Please select at least one seat", "error");
      return;
    }
    setShowRegistrationModal(true);
  };

  const handleConfirmRegistration = () => {
    try {
      registerForEvent(event);
      setShowRegistrationModal(false);
      showNotification(
        "Registration successful! Check your email for confirmation.",
        "success"
      );
    } catch (error) {
      showNotification("Registration failed. Please try again.", "error");
    }
  };

  const clearSeatSelection = () => {
    setSelectedSeats([]);
  };

  const confirmSeatSelection = () => {
    // Visual feedback is enough, no need for notification
    // showNotification(`${selectedSeats.length} seat(s) selected`, "success");
  };

  if (isLoading) {
    return (
      <div className="event-details-loading">
        <div className="container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading event details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="event-not-found">
        <div className="container">
          <h1>Event not found</h1>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/events")}
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="event-details-page">
      {/* Event Header */}
      <section className="event-header">
        <div className="container">
          <div className="event-hero">
            <div className="event-image">
              <img src={event.image} alt={event.title} />
              {event.badge && (
                <span className={`event-badge ${event.badge.type}`}>
                  {event.badge.text}
                </span>
              )}
            </div>
            <div className="event-info">
              <h1>{event.title}</h1>
              <p className="event-description">{event.description}</p>
              <div className="event-meta">
                <div className="meta-item">
                  <i className="fas fa-calendar"></i>
                  <span>{event.date}</span>
                </div>
                <div className="meta-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>{event.location}</span>
                </div>
              </div>
              <div className="event-actions">
                <button
                  className="btn btn-secondary"
                  onClick={handleAddToCalendar}
                >
                  Add to Calendar
                </button>
                <button className="btn btn-secondary" onClick={handleSave}>
                  Save
                </button>
                <button className="btn btn-primary" onClick={handleShare}>
                  <i className="fas fa-share"></i>
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="event-main">
        <div className="container">
          <div className="event-layout">
            {/* Left Column */}
            <div className="event-content">
              {/* Quick Filters */}
              <div className="quick-filters">
                <h3>Quick filters</h3>
                <div className="filter-tags">
                  <span className="filter-tag active">All tracks</span>
                  <span className="filter-tag">Capacity: Any</span>
                  <span className="filter-tag">Time: Morning</span>
                </div>
              </div>

              {/* Seat Selection */}
              <div className="seat-selection">
                <h3>Seat selection (Hall A)</h3>
                <p className="seat-info">
                  Choose your seat for the keynote. One seat per student. Your
                  selection is saved with your free registration.
                </p>
                <div className="seat-map">
                  <div className="seat-legend">
                    <div className="legend-item">
                      <span className="seat-indicator available"></span>
                      <span>Available</span>
                    </div>
                    <div className="legend-item">
                      <span className="seat-indicator selected"></span>
                      <span>Selected</span>
                    </div>
                    <div className="legend-item">
                      <span className="seat-indicator reserved"></span>
                      <span>Reserved</span>
                    </div>
                  </div>
                  {/* Seat Grid - simplified representation */}
                  <div className="seats-grid">
                    {["A", "B", "C"].map((row) => (
                      <div key={row} className="seat-row">
                        <span className="row-label">{row}</span>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((seatNum) => {
                          const seatId = `${row}${seatNum}`;
                          const isSelected = selectedSeats.includes(seatId);
                          const isReserved = ["A5", "B3", "B8", "C2"].includes(
                            seatId
                          );

                          return (
                            <button
                              key={seatId}
                              className={`seat ${
                                isSelected ? "selected" : ""
                              } ${isReserved ? "reserved" : ""}`}
                              onClick={() =>
                                !isReserved && handleSeatSelect(seatId)
                              }
                              disabled={isReserved}
                            >
                              {seatNum}
                            </button>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                  <div className="seat-actions">
                    <button
                      className="btn btn-secondary"
                      onClick={clearSeatSelection}
                    >
                      Clear
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={confirmSeatSelection}
                      disabled={selectedSeats.length === 0}
                    >
                      Confirm Seat
                    </button>
                  </div>
                </div>
              </div>

              {/* About Event */}
              <div className="about-event">
                <h3>About this event</h3>
                <p>{event.aboutEvent}</p>
                <ul className="event-highlights">
                  {event.highlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </div>

              {/* Speakers */}
              <div className="speakers-section">
                <h3>Speakers</h3>
                <div className="speakers-grid">
                  {event.speakers.map((speaker) => (
                    <div key={speaker.id} className="speaker-card">
                      <img src={speaker.image} alt={speaker.name} />
                      <div className="speaker-info">
                        <h4>{speaker.name}</h4>
                        <p className="speaker-title">{speaker.title}</p>
                        <p className="speaker-role">{speaker.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="event-sidebar">
              {/* Registration Card */}
              <div className="registration-card">
                <h3>Registration</h3>
                <p className="registration-info">
                  Free for university students. Student email verification
                  required.
                </p>
                <div className="registration-details">
                  <p>
                    <strong>No VIP tiers</strong>
                  </p>
                  <p>General Admission only</p>
                </div>
                <button
                  className={`btn ${
                    isUserRegistered ? "btn-success" : "btn-primary"
                  } register-btn`}
                  onClick={handleRegister}
                  disabled={isUserRegistered}
                >
                  {isUserRegistered ? (
                    <>
                      <i className="fas fa-check"></i>
                      Already Registered
                    </>
                  ) : isAuthenticated ? (
                    "Register with .edu"
                  ) : (
                    "Login to Register"
                  )}
                </button>
              </div>

              {/* Location Map */}
              <div className="location-card">
                <div className="location-map">
                  <div className="map-placeholder">
                    <i className="fas fa-map-marker-alt"></i>
                    <p>Interactive map</p>
                  </div>
                </div>
                <div className="location-info">
                  <h4>{event.location}</h4>
                  <p>{event.busLines}</p>
                  <p>{event.bikeRacks}</p>
                </div>
              </div>

              {/* Event Details */}
              <div className="event-details-card">
                <h3>Event details</h3>
                <div className="details-list">
                  <div className="detail-item">
                    <span>Doors open</span>
                    <span>{event.eventDetails.doorsOpen}</span>
                  </div>
                  <div className="detail-item">
                    <span>Wi Fi included</span>
                    <span>{event.eventDetails.wifiIncluded ? "✓" : "✗"}</span>
                  </div>
                  <div className="detail-item">
                    <span>Snacks provided</span>
                    <span>{event.eventDetails.snacksProvided ? "✓" : "✗"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Registration Modal */}
      {showRegistrationModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowRegistrationModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Confirm Registration</h3>
              <button
                className="modal-close"
                onClick={() => setShowRegistrationModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <p>
                You've selected {selectedSeats.length} seat(s):{" "}
                {selectedSeats.join(", ")}
              </p>
              <p>Registration is free for university students.</p>
            </div>
            <div className="modal-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setShowRegistrationModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleConfirmRegistration}
              >
                Register (Free)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
