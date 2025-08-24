// Main JavaScript file for Evently

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeSearchFunctionality();
    initializeFilterTags();
    initializeEventCards();
    initializeMobileMenu();
});

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Mobile menu toggle
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Search functionality
function initializeSearchFunctionality() {
    const searchInputs = document.querySelectorAll('.search-input, .main-search, .filter-search');
    
    searchInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            handleSearch(searchTerm);
        });
        
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const searchTerm = e.target.value.toLowerCase();
                handleSearch(searchTerm);
            }
        });
    });
}

// Handle search functionality
function handleSearch(searchTerm) {
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
        const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
        const description = card.querySelector('p')?.textContent.toLowerCase() || '';
        
        if (title.includes(searchTerm) || description.includes(searchTerm) || searchTerm === '') {
            card.style.display = 'block';
            card.style.opacity = '1';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show "no results" message if needed
    const visibleCards = document.querySelectorAll('.event-card[style*="block"]');
    showNoResultsMessage(visibleCards.length === 0 && searchTerm !== '');
}

// Show/hide no results message
function showNoResultsMessage(show) {
    let noResultsMsg = document.querySelector('.no-results-message');
    
    if (show && !noResultsMsg) {
        noResultsMsg = document.createElement('div');
        noResultsMsg.className = 'no-results-message';
        noResultsMsg.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #64748b;">
                <i class="fas fa-search" style="font-size: 48px; margin-bottom: 20px; opacity: 0.5;"></i>
                <h3>No events found</h3>
                <p>Try adjusting your search terms or filters</p>
            </div>
        `;
        
        const eventsGrid = document.querySelector('.events-grid');
        if (eventsGrid) {
            eventsGrid.parentNode.insertBefore(noResultsMsg, eventsGrid.nextSibling);
        }
    } else if (!show && noResultsMsg) {
        noResultsMsg.remove();
    }
}

// Filter tags functionality
function initializeFilterTags() {
    const filterTags = document.querySelectorAll('.filter-tag, .category-tag');
    
    filterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // Toggle active state for filter tags
            if (tag.classList.contains('filter-tag')) {
                // For single-select filters
                if (tag.closest('.search-filters') || tag.closest('.quick-filters')) {
                    tag.parentNode.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
                    tag.classList.add('active');
                } else {
                    // For multi-select filters
                    tag.classList.toggle('active');
                }
            } else {
                // Category tags
                tag.classList.toggle('active');
            }
            
            applyFilters();
        });
    });
}

// Apply filters to events
function applyFilters() {
    const activeCategories = Array.from(document.querySelectorAll('.category-tag.active')).map(tag => tag.textContent.toLowerCase());
    const activeDateFilter = document.querySelector('.date-filters .filter-tag.active')?.textContent.toLowerCase();
    const activePriceFilter = document.querySelector('.price-filters .filter-tag.active')?.textContent.toLowerCase();
    
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
        let showCard = true;
        
        // Category filter
        if (activeCategories.length > 0) {
            const cardCategories = getCardCategories(card);
            showCard = showCard && activeCategories.some(cat => cardCategories.includes(cat));
        }
        
        // Date filter (simplified - in real app would check actual dates)
        if (activeDateFilter && activeDateFilter !== 'today') {
            // This would be implemented with actual date logic
        }
        
        // Price filter
        if (activePriceFilter) {
            const cardPrice = getCardPrice(card);
            if (activePriceFilter === 'free' && cardPrice > 0) {
                showCard = false;
            } else if (activePriceFilter === 'paid' && cardPrice === 0) {
                showCard = false;
            }
        }
        
        card.style.display = showCard ? 'block' : 'none';
    });
}

// Get categories for a card (simplified)
function getCardCategories(card) {
    const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
    const categories = [];
    
    if (title.includes('tech') || title.includes('ai') || title.includes('hackathon')) categories.push('tech');
    if (title.includes('music') || title.includes('festival') || title.includes('sounds')) categories.push('music');
    if (title.includes('business') || title.includes('startup') || title.includes('networking')) categories.push('business');
    if (title.includes('art') || title.includes('expo')) categories.push('art');
    if (title.includes('sport')) categories.push('sports');
    
    return categories;
}

// Get price for a card (simplified)
function getCardPrice(card) {
    const badge = card.querySelector('.event-badge');
    if (badge && badge.textContent.toLowerCase().includes('free')) return 0;
    return Math.floor(Math.random() * 100) + 10; // Random price for demo
}

// Event card interactions
function initializeEventCards() {
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Handle button clicks
        const detailsBtn = card.querySelector('.btn-secondary');
        const registerBtn = card.querySelector('.btn-primary');
        
        if (detailsBtn) {
            detailsBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                showEventDetails(card);
            });
        }
        
        if (registerBtn) {
            registerBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                handleEventRegistration(card);
            });
        }
    });
}

// Show event details modal (simplified)
function showEventDetails(card) {
    const title = card.querySelector('h3')?.textContent || 'Event';
    const description = card.querySelector('p')?.textContent || 'No description available';
    
    // Create a simple modal (in a real app, this would be more sophisticated)
    const modal = document.createElement('div');
    modal.className = 'event-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${title}</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>${description}</p>
                    <div class="modal-actions">
                        <button class="btn-secondary">Close</button>
                        <button class="btn-primary">Register</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeModal = () => modal.remove();
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.btn-secondary').addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', function(e) {
        if (e.target === this) closeModal();
    });
}

// Handle event registration
function handleEventRegistration(card) {
    const title = card.querySelector('h3')?.textContent || 'Event';
    const registerBtn = card.querySelector('.btn-primary');
    
    if (registerBtn) {
        const originalText = registerBtn.textContent;
        registerBtn.textContent = 'Registering...';
        registerBtn.disabled = true;
        
        // Simulate registration process
        setTimeout(() => {
            registerBtn.textContent = 'Registered!';
            registerBtn.style.background = '#10b981';
            
            // Show success message
            showNotification(`Successfully registered for ${title}!`, 'success');
            
            setTimeout(() => {
                registerBtn.textContent = originalText;
                registerBtn.disabled = false;
                registerBtn.style.background = '';
            }, 2000);
        }, 1000);
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#4f46e5'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading states for buttons
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function() {
        if (!this.disabled && !this.classList.contains('no-loading')) {
            const originalText = this.textContent;
            this.style.minWidth = this.offsetWidth + 'px';
            
            // Add loading state for certain actions
            if (this.textContent.includes('Create') || this.textContent.includes('Register')) {
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.minWidth = '';
                }, 1000);
            }
        }
    });
});

// Initialize tooltips (simplified)
function initializeTooltips() {
    const elementsWithTooltips = document.querySelectorAll('[data-tooltip]');
    
    elementsWithTooltips.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            tooltip.style.cssText = `
                position: absolute;
                background: #1e293b;
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 14px;
                z-index: 1000;
                pointer-events: none;
                white-space: nowrap;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) tooltip.remove();
        });
    });
}

// Initialize on load
initializeTooltips();
