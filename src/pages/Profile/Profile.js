import React, { useState, useEffect } from "react";
import { useNotification } from "../../contexts/NotificationContext";
import { useAuth } from "../../contexts/AuthContext";
import EventCard from "../../components/EventCard/EventCard";
import Calendar from "../../components/Calendar/Calendar";
import EditProfileModal from "../../components/EditProfile/EditProfileModal";
import "./Profile.css";

const Profile = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [showEditProfile, setShowEditProfile] = useState(false);

  const { showNotification } = useNotification();
  const { user, registeredEvents } = useAuth();

  // Use actual user data from auth context
  const userProfile = {
    name: user?.name || "User",
    bio: `Student • ${user?.university || "University"}`,
    avatar:
      user?.avatar ||
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    stats: {
      eventsAttended: registeredEvents.length,
      eventsOrganized: 0, // This would come from backend
      connections: 0, // This would come from backend
    },
  };

  const dashboardStats = [
    {
      icon: "fas fa-calendar-check",
      number: registeredEvents.length,
      label: "Registered Events",
    },
    {
      icon: "fas fa-users",
      number: registeredEvents.reduce(
        (total, reg) => total + (reg.event?.attendees || 0),
        0
      ),
      label: "Total Attendees",
    },
    {
      icon: "fas fa-star",
      number: user?.isVerified ? "✓ Verified" : "Unverified",
      label: "Account Status",
    },
  ];

  const recentActivity = [
    {
      icon: "fas fa-plus-circle",
      action: "Created",
      event: "Tech Talk: AI in Healthcare",
      time: "2 hours ago",
    },
    {
      icon: "fas fa-user-plus",
      action: "Registered",
      event: "Startup Pitch Competition",
      time: "1 day ago",
    },
    {
      icon: "fas fa-edit",
      action: "Updated",
      event: "Music Festival 2024",
      time: "3 days ago",
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Tech Talk: AI in Healthcare",
      date: "Sep 15",
      location: "Engineering Building, Room 101",
      status: "organizing",
      type: "organizing",
    },
    {
      id: 2,
      title: "Startup Pitch Competition",
      date: "Sep 22",
      location: "Business School Auditorium",
      status: "attending",
      type: "attending",
    },
    {
      id: 3,
      title: "Music Festival 2024",
      date: "Oct 05",
      location: "Campus Quad",
      status: "organizing",
      type: "organizing",
    },
  ];

  const myEvents = [
    {
      id: 1,
      title: "Tech Talk: AI in Healthcare",
      date: "Sep 15",
      location: "Engineering Building",
      description:
        "Exploring the intersection of AI and healthcare innovation.",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: { text: "Upcoming", type: "upcoming" },
      attendees: 45,
      status: "upcoming",
    },
    {
      id: 2,
      title: "Music Festival 2024",
      date: "Oct 05",
      location: "Campus Quad",
      description:
        "Annual music festival featuring local and international artists.",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: { text: "Upcoming", type: "upcoming" },
      attendees: 156,
      status: "upcoming",
    },
    {
      id: 3,
      title: "Web Development Workshop",
      date: "Aug 20",
      location: "Computer Lab",
      description:
        "Hands-on workshop covering modern web development practices.",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: { text: "Completed", type: "completed" },
      attendees: 32,
      status: "completed",
    },
  ];

  const navigationItems = [
    { id: "dashboard", icon: "fas fa-tachometer-alt", label: "Dashboard" },
    { id: "my-events", icon: "fas fa-calendar", label: "My Events" },
    { id: "registered", icon: "fas fa-ticket-alt", label: "Registered Events" },
    { id: "calendar", icon: "fas fa-calendar-alt", label: "Calendar" },
    { id: "settings", icon: "fas fa-cog", label: "Settings" },
  ];

  const eventTabs = [
    { id: "all", label: "All Events" },
    { id: "upcoming", label: "Upcoming" },
    { id: "past", label: "Past" },
    { id: "drafts", label: "Drafts" },
  ];

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    // Remove notification for section changes to reduce noise
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleEditProfile = () => {
    showNotification("Edit profile feature coming soon!", "info");
  };

  const handleCreateEvent = () => {
    showNotification("Create event feature coming soon!", "info");
  };

  const handleAvatarChange = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      if (e.target.files[0]) {
        showNotification("Avatar updated successfully!", "success");
      }
    };
    input.click();
  };

  const handleEventAction = (action, event) => {
    // Only show notifications for important actions, not hover
    if (action !== "Viewing") {
      showNotification(`${action} ${event.title}`, "info");
    }
  };

  const handleEventHover = (event, isHovering) => {
    if (isHovering) {
      setHoveredEvent(event);
    } else {
      setHoveredEvent(null);
    }
  };

  const getFilteredEvents = () => {
    switch (activeTab) {
      case "upcoming":
        return myEvents.filter((event) => event.status === "upcoming");
      case "past":
        return myEvents.filter((event) => event.status === "completed");
      case "drafts":
        return []; // No drafts in sample data
      default:
        return myEvents;
    }
  };

  const renderDashboard = () => (
    <section className="content-section">
      <h2>Dashboard</h2>

      {/* Quick Stats */}
      <div className="dashboard-stats">
        {dashboardStats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">
              <i className={stat.icon}></i>
            </div>
            <div className="stat-info">
              <h3>{stat.number}</h3>
              <p>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          {recentActivity.map((activity, index) => (
            <div key={index} className="activity-item">
              <div className="activity-icon">
                <i className={activity.icon}></i>
              </div>
              <div className="activity-content">
                <p>
                  <strong>{activity.action}</strong> "{activity.event}"
                </p>
                <span className="activity-time">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="upcoming-events">
        <h3>Your Upcoming Events</h3>
        <div className="events-list">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="event-item">
              <div className="event-date">
                <span className="month">{event.date.split(" ")[0]}</span>
                <span className="day">{event.date.split(" ")[1]}</span>
              </div>
              <div className="event-info">
                <h4>{event.title}</h4>
                <p>{event.location}</p>
                <span className={`event-status ${event.status}`}>
                  {event.type === "organizing" ? "Organizing" : "Attending"}
                </span>
              </div>
              <div className="event-actions">
                <button
                  className="btn btn-secondary btn-small"
                  onClick={() => handleEventAction("Managing", event)}
                >
                  {event.type === "organizing" ? "Manage" : "View"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderMyEvents = () => (
    <section className="content-section">
      <div className="section-header">
        <h2>My Events</h2>
        {user?.role === "admin" && (
          <button className="btn btn-primary" onClick={handleCreateEvent}>
            <i className="fas fa-plus"></i>
            Create New Event
          </button>
        )}
      </div>

      <div className="events-tabs">
        {eventTabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="events-grid">
        {getFilteredEvents().map((event) => (
          <div key={event.id} className="my-event-card">
            <EventCard event={event} showActions={false} />
            <div className="event-meta-info">
              <span className="attendees">
                <i className="fas fa-users"></i>
                {event.attendees}{" "}
                {event.status === "completed" ? "attended" : "registered"}
              </span>
              <div className="event-actions">
                <button
                  className="btn btn-secondary btn-small"
                  onClick={() => handleEventAction("Editing", event)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-primary btn-small"
                  onClick={() => handleEventAction("Managing", event)}
                >
                  {event.status === "completed" ? "View Report" : "Manage"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {getFilteredEvents().length === 0 && (
        <div className="no-events">
          <i className="fas fa-calendar-plus"></i>
          <h3>No events found</h3>
          <p>
            {activeTab === "drafts"
              ? "You have no draft events."
              : `You have no ${activeTab === "all" ? "" : activeTab} events.`}
          </p>
          <button className="btn btn-primary" onClick={handleCreateEvent}>
            Create Your First Event
          </button>
        </div>
      )}
    </section>
  );

  const renderRegisteredEvents = () => (
    <section className="content-section">
      <h2>My Tickets</h2>
      {registeredEvents.length > 0 ? (
        <div className="tickets-grid">
          {registeredEvents.map((registration) => (
            <div
              key={registration.id}
              className="ticket-card"
              onMouseEnter={() => handleEventHover(registration.event, true)}
              onMouseLeave={() => handleEventHover(registration.event, false)}
            >
              <div className="ticket-header">
                <div className="ticket-type">
                  <span className="ticket-label">ADMIT ONE</span>
                  <span className="ticket-id">
                    #{registration.id.toString().slice(-6)}
                  </span>
                </div>
                <div className="ticket-status">
                  <i className="fas fa-check-circle"></i>
                  <span>CONFIRMED</span>
                </div>
              </div>

              <div className="ticket-body">
                <div className="event-image-small">
                  <img
                    src={registration.event.image}
                    alt={registration.event.title}
                  />
                </div>
                <div className="event-details">
                  <h3 className="event-title">{registration.event.title}</h3>
                  <div className="event-meta">
                    <div className="meta-item">
                      <i className="fas fa-calendar"></i>
                      <span>{registration.event.date}</span>
                    </div>
                    <div className="meta-item">
                      <i className="fas fa-map-marker-alt"></i>
                      <span>{registration.event.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ticket-footer">
                <div className="registration-date">
                  <small>
                    Registered:{" "}
                    {new Date(registration.registeredAt).toLocaleDateString()}
                  </small>
                </div>
                <div className="ticket-actions">
                  <button
                    className="btn btn-outline btn-small"
                    onClick={() =>
                      handleEventAction(
                        "Viewing details for",
                        registration.event
                      )
                    }
                  >
                    <i className="fas fa-eye"></i>
                    View Details
                  </button>
                  <button
                    className="btn btn-primary btn-small"
                    onClick={() =>
                      handleEventAction(
                        "Downloading ticket for",
                        registration.event
                      )
                    }
                  >
                    <i className="fas fa-download"></i>
                    Download
                  </button>
                </div>
              </div>

              <div className="ticket-perforation"></div>

              {hoveredEvent?.id === registration.event.id && (
                <div className="event-hover-tooltip">
                  <p>Your ticket for this event</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="no-events">
          <i className="fas fa-ticket-alt"></i>
          <h3>No tickets yet</h3>
          <p>
            You haven't registered for any events yet. Start exploring events to
            get your first ticket!
          </p>
          <button
            className="btn btn-primary"
            onClick={() => (window.location.href = "/events")}
          >
            Explore Events
          </button>
        </div>
      )}
    </section>
  );

  const renderCalendar = () => (
    <section className="content-section">
      <h2>Calendar</h2>
      <Calendar events={upcomingEvents} />
    </section>
  );

  const renderSettings = () => (
    <section className="content-section">
      <h2>Settings</h2>
      <div className="settings-placeholder">
        <i className="fas fa-cog"></i>
        <h3>Settings</h3>
        <p>Account settings and preferences coming soon!</p>
      </div>
    </section>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return renderDashboard();
      case "my-events":
        return renderMyEvents();
      case "registered":
        return renderRegisteredEvents();
      case "calendar":
        return renderCalendar();
      case "settings":
        return renderSettings();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="profile-page">
      {/* Profile Header */}
      <section className="profile-header">
        <div className="container">
          <div className="profile-info">
            <div className="profile-avatar">
              <img src={userProfile.avatar} alt="User Avatar" />
              <button className="avatar-edit" onClick={handleAvatarChange}>
                <i className="fas fa-camera"></i>
              </button>
            </div>
            <div className="profile-details">
              <h1>{userProfile.name}</h1>
              <p>{userProfile.bio}</p>
              <div className="profile-stats">
                <div className="stat">
                  <span className="stat-number">
                    {userProfile.stats.eventsAttended}
                  </span>
                  <span className="stat-label">Events Attended</span>
                </div>
                <div className="stat">
                  <span className="stat-number">
                    {userProfile.stats.eventsOrganized}
                  </span>
                  <span className="stat-label">Events Organized</span>
                </div>
                <div className="stat">
                  <span className="stat-number">
                    {userProfile.stats.connections}
                  </span>
                  <span className="stat-label">Connections</span>
                </div>
              </div>
            </div>
            <div className="profile-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setShowEditProfile(true)}
              >
                <i className="fas fa-edit"></i>
                Edit Profile
              </button>
              {user?.role === "admin" && (
                <button className="btn btn-primary" onClick={handleCreateEvent}>
                  <i className="fas fa-plus"></i>
                  Create Event
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="profile-main">
        <div className="container">
          <div className="profile-layout">
            {/* Sidebar */}
            <aside className="profile-sidebar">
              <nav className="profile-nav">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    className={`nav-item ${
                      activeSection === item.id ? "active" : ""
                    }`}
                    onClick={() => handleSectionChange(item.id)}
                  >
                    <i className={item.icon}></i>
                    {item.label}
                  </button>
                ))}
              </nav>
            </aside>

            {/* Content Area */}
            <div className="profile-content">{renderContent()}</div>
          </div>
        </div>
      </main>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={showEditProfile}
        onClose={() => setShowEditProfile(false)}
      />
    </div>
  );
};

export default Profile;
