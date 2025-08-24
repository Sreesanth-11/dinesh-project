import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useNotification } from "../../contexts/NotificationContext";
import "./EventCard.css";

const EventCard = ({
  event,
  onRegister,
  onViewDetails,
  showActions = true,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, registerForEvent, isRegisteredForEvent } = useAuth();
  const { showNotification } = useNotification();

  const isRegistered = isRegisteredForEvent(event.id);

  const handleRegister = async (e) => {
    e.stopPropagation(); // Prevent card click

    if (!isAuthenticated) {
      showNotification("Please log in to register for events", "error");
      return;
    }

    if (isRegistered) return;

    setIsLoading(true);

    try {
      // Simulate API call
      setTimeout(() => {
        registerForEvent(event);
        setIsLoading(false);
        showNotification(
          `Successfully registered for ${event.title}!`,
          "success"
        );
        onRegister && onRegister(event);
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      showNotification("Registration failed. Please try again.", "error");
    }
  };

  const handleViewDetails = (e) => {
    if (e) e.stopPropagation(); // Prevent card click when button is clicked
    navigate(`/events/${event.id}`);
    onViewDetails && onViewDetails(event);
  };

  const getBadgeClass = (type) => {
    const baseClass = "event-badge";
    switch (type) {
      case "early-bird":
        return `${baseClass} early-bird`;
      case "limited":
        return `${baseClass} limited`;
      case "online":
        return `${baseClass} online`;
      case "popular":
        return `${baseClass} popular`;
      case "free":
        return `${baseClass} free`;
      default:
        return baseClass;
    }
  };

  return (
    <div className="event-card" onClick={() => handleViewDetails()}>
      <div className="event-image">
        <img src={event.image} alt={event.title} loading="lazy" />
        {event.badge && (
          <span className={getBadgeClass(event.badge.type)}>
            {event.badge.text}
          </span>
        )}
      </div>
      <div className="event-content">
        <h3>{event.title}</h3>
        <div className="event-meta">
          <span className="event-date">
            <i className="fas fa-calendar"></i>
            {event.date}
          </span>
          <span className="event-location">
            <i className="fas fa-map-marker-alt"></i>
            {event.location}
          </span>
        </div>
        <p className="event-description">{event.description}</p>
        {showActions && (
          <div className="event-actions">
            <button
              className="btn btn-secondary"
              onClick={handleViewDetails}
              aria-label={`View details for ${event.title}`}
            >
              Details
            </button>
            <button
              className={`btn ${isRegistered ? "btn-success" : "btn-primary"} ${
                isLoading ? "loading" : ""
              }`}
              onClick={handleRegister}
              disabled={isLoading || isRegistered}
              aria-label={
                isRegistered
                  ? `Registered for ${event.title}`
                  : `Register for ${event.title}`
              }
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Registering...
                </>
              ) : isRegistered ? (
                <>
                  <i className="fas fa-check"></i>
                  Registered!
                </>
              ) : (
                "Register"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
