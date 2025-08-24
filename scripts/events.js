// Events page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeEventsPage();
    initializeViewToggle();
    initializeFiltersToggle();
    initializeSortingAndPricing();
    initializePagination();
    initializeAdvancedFilters();
});

// Initialize events page functionality
function initializeEventsPage() {
    console.log('Events page initialized');
    
    // Load events data (in a real app, this would come from an API)
    loadEventsData();
    
    // Initialize filter interactions
    initializeFilterInteractions();
}

// View toggle functionality (Grid/List)
function initializeViewToggle() {
    const viewButtons = document.querySelectorAll('.view-btn');
    const eventsGrid = document.getElementById('eventsGrid');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            viewButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Toggle view
            const viewType = this.getAttribute('data-view');
            if (viewType === 'list') {
                eventsGrid.classList.add('list-view');
            } else {
                eventsGrid.classList.remove('list-view');
            }
            
            // Animate the transition
            eventsGrid.style.opacity = '0.5';
            setTimeout(() => {
                eventsGrid.style.opacity = '1';
            }, 150);
        });
    });
}

// Filters toggle for mobile
function initializeFiltersToggle() {
    const filtersToggle = document.querySelector('.filters-toggle');
    const filtersSidebar = document.querySelector('.filters-sidebar');
    
    if (filtersToggle && filtersSidebar) {
        filtersToggle.addEventListener('click', function() {
            filtersSidebar.classList.toggle('active');
            
            // Update button text
            const isActive = filtersSidebar.classList.contains('active');
            this.innerHTML = isActive ? 
                '<i class="fas fa-times"></i> Close' : 
                '<i class="fas fa-filter"></i> Filters';
        });
        
        // Close filters when clicking outside
        document.addEventListener('click', function(e) {
            if (!filtersSidebar.contains(e.target) && !filtersToggle.contains(e.target)) {
                filtersSidebar.classList.remove('active');
                filtersToggle.innerHTML = '<i class="fas fa-filter"></i> Filters';
            }
        });
    }
}

// Sorting and pricing dropdowns
function initializeSortingAndPricing() {
    const sortSelect = document.querySelector('.sort-select');
    const priceSelect = document.querySelector('.price-select');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortBy = this.value;
            sortEvents(sortBy);
        });
    }
    
    if (priceSelect) {
        priceSelect.addEventListener('change', function() {
            const priceFilter = this.value;
            filterEventsByPrice(priceFilter);
        });
    }
}

// Sort events
function sortEvents(sortBy) {
    const eventsGrid = document.getElementById('eventsGrid');
    const eventCards = Array.from(eventsGrid.querySelectorAll('.event-card'));
    
    eventCards.sort((a, b) => {
        switch (sortBy) {
            case 'Date':
                return compareDates(a, b);
            case 'Price':
                return comparePrices(a, b);
            case 'Popularity':
                return comparePopularity(a, b);
            default: // Recommended
                return 0;
        }
    });
    
    // Re-append sorted cards
    eventCards.forEach(card => eventsGrid.appendChild(card));
    
    // Add animation
    eventsGrid.style.opacity = '0.5';
    setTimeout(() => {
        eventsGrid.style.opacity = '1';
    }, 200);
}

// Compare functions for sorting
function compareDates(a, b) {
    const dateA = getEventDate(a);
    const dateB = getEventDate(b);
    return dateA - dateB;
}

function comparePrices(a, b) {
    const priceA = getEventPrice(a);
    const priceB = getEventPrice(b);
    return priceA - priceB;
}

function comparePopularity(a, b) {
    const popA = getEventPopularity(a);
    const popB = getEventPopularity(b);
    return popB - popA; // Descending order
}

// Helper functions to extract event data
function getEventDate(card) {
    const dateText = card.querySelector('.event-meta span')?.textContent || '';
    const dateMatch = dateText.match(/(\w+)\s+(\d+)/);
    if (dateMatch) {
        const month = getMonthNumber(dateMatch[1]);
        const day = parseInt(dateMatch[2]);
        return new Date(2024, month, day);
    }
    return new Date();
}

function getEventPrice(card) {
    const badge = card.querySelector('.event-badge');
    if (badge && badge.textContent.toLowerCase().includes('free')) return 0;
    // Simulate price based on event type
    const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
    if (title.includes('summit') || title.includes('conference')) return 100;
    if (title.includes('workshop')) return 50;
    if (title.includes('festival')) return 75;
    return 25;
}

function getEventPopularity(card) {
    // Simulate popularity based on badge and title
    const badge = card.querySelector('.event-badge');
    const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
    
    let popularity = Math.floor(Math.random() * 100);
    
    if (badge) {
        const badgeText = badge.textContent.toLowerCase();
        if (badgeText.includes('popular')) popularity += 50;
        if (badgeText.includes('limited')) popularity += 30;
        if (badgeText.includes('early')) popularity += 20;
    }
    
    return popularity;
}

function getMonthNumber(monthName) {
    const months = {
        'jan': 0, 'feb': 1, 'mar': 2, 'apr': 3, 'may': 4, 'jun': 5,
        'jul': 6, 'aug': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dec': 11
    };
    return months[monthName.toLowerCase().substring(0, 3)] || 0;
}

// Filter events by price
function filterEventsByPrice(priceFilter) {
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
        const price = getEventPrice(card);
        let showCard = true;
        
        switch (priceFilter) {
            case 'Free':
                showCard = price === 0;
                break;
            case 'Under $50':
                showCard = price < 50;
                break;
            case '$50-$100':
                showCard = price >= 50 && price <= 100;
                break;
            case 'Over $100':
                showCard = price > 100;
                break;
            default: // Any price
                showCard = true;
        }
        
        card.style.display = showCard ? 'block' : 'none';
    });
}

// Pagination functionality
function initializePagination() {
    const pageButtons = document.querySelectorAll('.page-btn');
    
    pageButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent === 'Prev' || this.textContent === 'Next') {
                handlePageNavigation(this.textContent);
            } else {
                // Page number
                pageButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                loadPage(parseInt(this.textContent));
            }
        });
    });
}

function handlePageNavigation(direction) {
    const activePageBtn = document.querySelector('.page-btn.active');
    const currentPage = parseInt(activePageBtn.textContent);
    const pageButtons = document.querySelectorAll('.page-btn:not([class*="Prev"]):not([class*="Next"])');
    
    let newPage;
    if (direction === 'Prev' && currentPage > 1) {
        newPage = currentPage - 1;
    } else if (direction === 'Next' && currentPage < pageButtons.length) {
        newPage = currentPage + 1;
    }
    
    if (newPage) {
        pageButtons.forEach(btn => btn.classList.remove('active'));
        pageButtons[newPage - 1].classList.add('active');
        loadPage(newPage);
    }
}

function loadPage(pageNumber) {
    // Simulate page loading
    const eventsGrid = document.getElementById('eventsGrid');
    eventsGrid.style.opacity = '0.5';
    
    setTimeout(() => {
        // In a real app, this would load different events
        console.log(`Loading page ${pageNumber}`);
        eventsGrid.style.opacity = '1';
        
        // Scroll to top of events
        eventsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 500);
}

// Advanced filters functionality
function initializeAdvancedFilters() {
    const resetBtn = document.querySelector('.reset-btn');
    const applyBtn = document.querySelector('.apply-btn');
    const dateInputs = document.querySelectorAll('.date-input');
    const priceInputs = document.querySelectorAll('.price-input');
    const locationInput = document.querySelector('.location-input');
    const nearbyToggle = document.querySelector('#nearby');
    
    // Reset filters
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            // Reset all filter inputs
            document.querySelectorAll('.filter-tag.active').forEach(tag => {
                tag.classList.remove('active');
            });
            
            dateInputs.forEach(input => input.value = '');
            priceInputs.forEach(input => input.value = '');
            if (locationInput) locationInput.value = '';
            if (nearbyToggle) nearbyToggle.checked = false;
            
            // Show all events
            document.querySelectorAll('.event-card').forEach(card => {
                card.style.display = 'block';
            });
            
            showNotification('Filters reset', 'info');
        });
    }
    
    // Apply filters
    if (applyBtn) {
        applyBtn.addEventListener('click', function() {
            applyAdvancedFilters();
            showNotification('Filters applied', 'success');
        });
    }
    
    // Date range validation
    dateInputs.forEach((input, index) => {
        input.addEventListener('change', function() {
            if (index === 0) { // Start date
                const endDateInput = dateInputs[1];
                if (endDateInput.value && this.value > endDateInput.value) {
                    endDateInput.value = this.value;
                }
                endDateInput.min = this.value;
            }
        });
    });
    
    // Price range validation
    priceInputs.forEach((input, index) => {
        input.addEventListener('input', function() {
            const value = parseInt(this.value);
            if (index === 0) { // Min price
                const maxPriceInput = priceInputs[1];
                if (maxPriceInput.value && value > parseInt(maxPriceInput.value)) {
                    maxPriceInput.value = value;
                }
            } else { // Max price
                const minPriceInput = priceInputs[0];
                if (minPriceInput.value && value < parseInt(minPriceInput.value)) {
                    minPriceInput.value = value;
                }
            }
        });
    });
}

// Apply advanced filters
function applyAdvancedFilters() {
    const eventCards = document.querySelectorAll('.event-card');
    const activeCategories = Array.from(document.querySelectorAll('.category-filters .category-tag.active')).map(tag => tag.textContent.toLowerCase());
    const activeDateFilters = Array.from(document.querySelectorAll('.date-filters .filter-tag.active')).map(tag => tag.textContent.toLowerCase());
    const activePriceFilters = Array.from(document.querySelectorAll('.price-filters .filter-tag.active')).map(tag => tag.textContent.toLowerCase());
    const activeFormatFilters = Array.from(document.querySelectorAll('.format-filters .filter-tag.active')).map(tag => tag.textContent.toLowerCase());
    
    const dateInputs = document.querySelectorAll('.date-input');
    const priceInputs = document.querySelectorAll('.price-input');
    const locationInput = document.querySelector('.location-input');
    const nearbyToggle = document.querySelector('#nearby');
    
    const startDate = dateInputs[0]?.value ? new Date(dateInputs[0].value) : null;
    const endDate = dateInputs[1]?.value ? new Date(dateInputs[1].value) : null;
    const minPrice = priceInputs[0]?.value ? parseInt(priceInputs[0].value) : null;
    const maxPrice = priceInputs[1]?.value ? parseInt(priceInputs[1].value) : null;
    const locationFilter = locationInput?.value.toLowerCase() || '';
    const nearbyOnly = nearbyToggle?.checked || false;
    
    let visibleCount = 0;
    
    eventCards.forEach(card => {
        let showCard = true;
        
        // Category filter
        if (activeCategories.length > 0) {
            const cardCategories = getCardCategories(card);
            showCard = showCard && activeCategories.some(cat => cardCategories.includes(cat));
        }
        
        // Price filters
        const cardPrice = getEventPrice(card);
        if (activePriceFilters.includes('free') && cardPrice > 0) showCard = false;
        if (activePriceFilters.includes('paid') && cardPrice === 0) showCard = false;
        if (minPrice !== null && cardPrice < minPrice) showCard = false;
        if (maxPrice !== null && cardPrice > maxPrice) showCard = false;
        
        // Location filter
        if (locationFilter) {
            const cardLocation = card.querySelector('.event-meta span:last-child')?.textContent.toLowerCase() || '';
            if (!cardLocation.includes(locationFilter)) showCard = false;
        }
        
        // Format filter
        if (activeFormatFilters.length > 0) {
            const cardFormat = getCardFormat(card);
            if (!activeFormatFilters.includes(cardFormat)) showCard = false;
        }
        
        // Date range filter
        if (startDate || endDate) {
            const cardDate = getEventDate(card);
            if (startDate && cardDate < startDate) showCard = false;
            if (endDate && cardDate > endDate) showCard = false;
        }
        
        card.style.display = showCard ? 'block' : 'none';
        if (showCard) visibleCount++;
    });
    
    // Show no results message if needed
    showNoResultsMessage(visibleCount === 0);
}

// Get card format
function getCardFormat(card) {
    const badge = card.querySelector('.event-badge');
    const location = card.querySelector('.event-meta span:last-child')?.textContent.toLowerCase() || '';
    
    if (badge && badge.textContent.toLowerCase().includes('online')) return 'online';
    if (location.includes('remote')) return 'online';
    return 'in-person';
}

// Filter interactions
function initializeFilterInteractions() {
    const categoryTags = document.querySelectorAll('.category-filters .category-tag');
    const dateFilterTags = document.querySelectorAll('.date-filters .filter-tag');
    const priceFilterTags = document.querySelectorAll('.price-filters .filter-tag');
    const formatFilterTags = document.querySelectorAll('.format-filters .filter-tag');
    
    // Category filters (multi-select)
    categoryTags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.classList.toggle('active');
            applyAdvancedFilters();
        });
    });
    
    // Date filters (single-select)
    dateFilterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            dateFilterTags.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            applyAdvancedFilters();
        });
    });
    
    // Price filters (multi-select)
    priceFilterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.classList.toggle('active');
            applyAdvancedFilters();
        });
    });
    
    // Format filters (multi-select)
    formatFilterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.classList.toggle('active');
            applyAdvancedFilters();
        });
    });
}

// Load events data (placeholder)
function loadEventsData() {
    // In a real application, this would fetch data from an API
    console.log('Loading events data...');
}
