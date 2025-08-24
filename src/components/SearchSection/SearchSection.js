import React, { useState } from 'react';
import { useNotification } from '../../contexts/NotificationContext';
import './SearchSection.css';

const SearchSection = ({ onSearch, showFilters = true }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('This week');
  const { showNotification } = useNotification();

  const filters = ['This week', 'Nearby', 'Free'];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch && onSearch(value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch && onSearch(searchTerm);
      showNotification(`Searching for "${searchTerm}"...`, 'info');
    }
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    showNotification(`Filter applied: ${filter}`, 'success');
  };

  const handleAdvancedFilters = () => {
    showNotification('Advanced filters opened!', 'info');
  };

  return (
    <section className="search-section">
      <div className="container">
        <div className="search-content">
          <h2>Search events</h2>
          <p>Find events by title, category, location, or date</p>
          
          <form className="search-container" onSubmit={handleSearchSubmit}>
            <div className="search-input-wrapper">
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Search for events, keywords..."
                className="search-input"
                value={searchTerm}
                onChange={handleSearchChange}
                aria-label="Search events"
              />
              {searchTerm && (
                <button
                  type="button"
                  className="clear-search"
                  onClick={() => {
                    setSearchTerm('');
                    onSearch && onSearch('');
                  }}
                  aria-label="Clear search"
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>
            
            {showFilters && (
              <div className="search-filters">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    className={`filter-tag ${activeFilter === filter ? 'active' : ''}`}
                    onClick={() => handleFilterClick(filter)}
                    aria-pressed={activeFilter === filter}
                  >
                    {filter}
                  </button>
                ))}
                <button
                  type="button"
                  className="btn btn-primary filters-btn"
                  onClick={handleAdvancedFilters}
                  aria-label="Open advanced filters"
                >
                  <i className="fas fa-filter"></i>
                  <span className="btn-text">Filters</span>
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
