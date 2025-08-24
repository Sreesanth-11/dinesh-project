import React, { useState, useEffect } from "react";
import { useNotification } from "../../contexts/NotificationContext";
import { useAuth } from "../../contexts/AuthContext";
import EventCard from "../../components/EventCard/EventCard";
import "./Events.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("recommended");
  const [priceFilter, setPriceFilter] = useState("any");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { showNotification } = useNotification();
  const { user } = useAuth();

  const eventsPerPage = 6;

  // Sample events data
  const sampleEvents = [
    {
      id: 1,
      title: "AI Leaders Summit",
      date: "Sep 12",
      location: "San Francisco",
      description:
        "Keynotes, panels, and networking with top AI practitioners.",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: { text: "Early Bird", type: "early-bird" },
      category: "tech",
      price: 150,
    },
    {
      id: 2,
      title: "Sunset Sounds Festival",
      date: "Oct 03",
      location: "Austin",
      description:
        "Live performances across multiple stages with food and art.",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: { text: "Limited", type: "limited" },
      category: "music",
      price: 75,
    },
    {
      id: 3,
      title: "Founder Workshop: GTM",
      date: "Aug 28",
      location: "Remote",
      description: "Practical playbooks to launch and scale your startup.",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: { text: "Online", type: "online" },
      category: "business",
      price: 0,
    },
    {
      id: 4,
      title: "Modern Art Expo",
      date: "Sep 20",
      location: "New York",
      description:
        "Immersive installations and contemporary artwork from 50+ artists.",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: { text: "Popular", type: "popular" },
      category: "art",
      price: 25,
    },
    {
      id: 5,
      title: "City Hackathon",
      date: "Sep 28",
      location: "Seattle",
      description:
        "Build innovative solutions with fellow developers in 24 hours.",
      image:
        "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: { text: "Team", type: "team" },
      category: "tech",
      price: 0,
    },
    {
      id: 6,
      title: "B2B Networking Night",
      date: "Oct 10",
      location: "Chicago",
      description: "Connect with industry peers and explore new partnerships.",
      image:
        "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      badge: { text: "Networking", type: "networking" },
      category: "business",
      price: 50,
    },
  ];

  // Load events on component mount
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setEvents(sampleEvents);
      setFilteredEvents(sampleEvents);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter and search events
  useEffect(() => {
    let filtered = [...events];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Price filter
    if (priceFilter !== "any") {
      switch (priceFilter) {
        case "free":
          filtered = filtered.filter((event) => event.price === 0);
          break;
        case "under-50":
          filtered = filtered.filter((event) => event.price < 50);
          break;
        case "50-100":
          filtered = filtered.filter(
            (event) => event.price >= 50 && event.price <= 100
          );
          break;
        case "over-100":
          filtered = filtered.filter((event) => event.price > 100);
          break;
        default:
          break;
      }
    }

    // Sort events
    switch (sortBy) {
      case "date":
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "price":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "popularity":
        filtered.sort((a, b) => b.id - a.id); // Simulate popularity
        break;
      default:
        // Keep recommended order
        break;
    }

    setFilteredEvents(filtered);
    setCurrentPage(1);
  }, [events, searchTerm, priceFilter, sortBy]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    // Remove notification for view mode changes
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    // Remove notification for sorting changes
  };

  const handlePriceFilterChange = (price) => {
    setPriceFilter(price);
    // Remove notification for filter changes
  };

  const handleFiltersToggle = () => {
    setShowFilters(!showFilters);
  };

  const handleEventRegister = (event) => {
    showNotification(`Successfully registered for ${event.title}!`, "success");
  };

  const handleEventDetails = (event) => {
    // Remove notification for viewing details - navigation is enough feedback
  };

  // Pagination
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const currentEvents = filteredEvents.slice(
    startIndex,
    startIndex + eventsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="events-loading">
        <div className="container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading events...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="events-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <div className="header-content">
            <div className="header-text">
              <h1>Explore Events</h1>
              <p>Filter by category, date, price, and location</p>
            </div>
            {user?.role === "admin" && (
              <button
                className="btn btn-primary"
                onClick={() =>
                  showNotification("Create Event feature coming soon!", "info")
                }
              >
                <i className="fas fa-plus"></i>
                New Event
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          <div className="content-layout">
            {/* Filter Sidebar - Mobile Only */}
            {showFilters && (
              <div className="filters-sidebar mobile-filters">
                <div className="filters-container">
                  <div className="filters-header">
                    <h3>Filters</h3>
                    <button
                      className="close-filters"
                      onClick={() => setShowFilters(false)}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                  {/* Filter content would go here */}
                  <p>Advanced filters coming soon!</p>
                </div>
              </div>
            )}

            {/* Events Content */}
            <div className="events-content">
              {/* Search and Controls */}
              <div className="events-controls">
                <div className="search-bar">
                  <div className="search-input-wrapper">
                    <i className="fas fa-search"></i>
                    <input
                      type="text"
                      placeholder="Search events..."
                      className="main-search"
                      value={searchTerm}
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                  </div>
                  <div className="quick-filters">
                    <span className="filter-tag active">This week</span>
                    <span className="filter-tag">Nearby</span>
                    <button
                      className="btn btn-primary filters-toggle"
                      onClick={handleFiltersToggle}
                    >
                      <i className="fas fa-filter"></i>
                      Filters
                    </button>
                  </div>
                </div>

                <div className="view-controls">
                  <div className="sort-dropdown">
                    <label>Sort by</label>
                    <select
                      className="sort-select"
                      value={sortBy}
                      onChange={(e) => handleSortChange(e.target.value)}
                    >
                      <option value="recommended">Recommended</option>
                      <option value="date">Date</option>
                      <option value="price">Price</option>
                      <option value="popularity">Popularity</option>
                    </select>
                  </div>
                  <div className="price-dropdown">
                    <select
                      className="price-select"
                      value={priceFilter}
                      onChange={(e) => handlePriceFilterChange(e.target.value)}
                    >
                      <option value="any">Any price</option>
                      <option value="free">Free</option>
                      <option value="under-50">Under $50</option>
                      <option value="50-100">$50-$100</option>
                      <option value="over-100">Over $100</option>
                    </select>
                  </div>
                  <div className="view-toggle">
                    <button
                      className={`view-btn ${
                        viewMode === "grid" ? "active" : ""
                      }`}
                      onClick={() => handleViewModeChange("grid")}
                    >
                      <i className="fas fa-th"></i>
                      Grid
                    </button>
                    <button
                      className={`view-btn ${
                        viewMode === "list" ? "active" : ""
                      }`}
                      onClick={() => handleViewModeChange("list")}
                    >
                      <i className="fas fa-list"></i>
                      List
                    </button>
                  </div>
                </div>
              </div>

              {/* Events Grid */}
              {currentEvents.length > 0 ? (
                <>
                  <div
                    className={`events-grid ${
                      viewMode === "list" ? "list-view" : ""
                    }`}
                  >
                    {currentEvents.map((event) => (
                      <EventCard
                        key={event.id}
                        event={event}
                        onRegister={handleEventRegister}
                        onViewDetails={handleEventDetails}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="pagination">
                      <button
                        className="page-btn"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Prev
                      </button>
                      {[...Array(totalPages)].map((_, index) => (
                        <button
                          key={index + 1}
                          className={`page-btn ${
                            currentPage === index + 1 ? "active" : ""
                          }`}
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </button>
                      ))}
                      <button
                        className="page-btn"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="no-events">
                  <i className="fas fa-search"></i>
                  <h3>No events found</h3>
                  <p>Try adjusting your search terms or filters</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Events;
