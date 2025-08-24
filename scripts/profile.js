// Profile page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeProfilePage();
    initializeProfileNavigation();
    initializeEventTabs();
    initializeCalendar();
    initializeProfileActions();
});

// Initialize profile page
function initializeProfilePage() {
    console.log('Profile page initialized');
    
    // Load user data
    loadUserData();
    
    // Initialize dashboard
    initializeDashboard();
}

// Profile navigation
function initializeProfileNavigation() {
    const navItems = document.querySelectorAll('.profile-nav .nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all nav items and sections
            navItems.forEach(nav => nav.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked nav item
            this.classList.add('active');
            
            // Show corresponding content section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Special handling for calendar section
                if (targetId === 'calendar') {
                    generateCalendar();
                }
            }
        });
    });
}

// Event tabs functionality
function initializeEventTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Filter events based on tab
            const tabType = this.getAttribute('data-tab');
            filterEventsByTab(tabType);
        });
    });
}

// Filter events by tab
function filterEventsByTab(tabType) {
    const eventCards = document.querySelectorAll('#my-events .event-card');
    
    eventCards.forEach(card => {
        const badge = card.querySelector('.event-badge');
        let showCard = true;
        
        switch (tabType) {
            case 'upcoming':
                showCard = badge && (badge.textContent.toLowerCase().includes('upcoming'));
                break;
            case 'past':
                showCard = badge && (badge.textContent.toLowerCase().includes('completed'));
                break;
            case 'drafts':
                showCard = badge && (badge.textContent.toLowerCase().includes('draft'));
                break;
            default: // all
                showCard = true;
        }
        
        card.style.display = showCard ? 'block' : 'none';
    });
    
    // Add animation
    const eventsGrid = document.querySelector('#my-events .events-grid');
    if (eventsGrid) {
        eventsGrid.style.opacity = '0.7';
        setTimeout(() => {
            eventsGrid.style.opacity = '1';
        }, 200);
    }
}

// Calendar functionality
function initializeCalendar() {
    const prevBtn = document.getElementById('prevMonth');
    const nextBtn = document.getElementById('nextMonth');
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => changeMonth(-1));
        nextBtn.addEventListener('click', () => changeMonth(1));
    }
    
    // Generate initial calendar
    generateCalendar();
}

let currentDate = new Date();

function changeMonth(direction) {
    currentDate.setMonth(currentDate.getMonth() + direction);
    generateCalendar();
}

function generateCalendar() {
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const currentMonthElement = document.getElementById('currentMonth');
    const calendarGrid = document.querySelector('.calendar-grid');
    
    if (!currentMonthElement || !calendarGrid) return;
    
    // Update month display
    currentMonthElement.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    
    // Clear existing calendar days (keep headers)
    const existingDays = calendarGrid.querySelectorAll('.calendar-day:not(.header)');
    existingDays.forEach(day => day.remove());
    
    // Get first day of month and number of days
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDate = firstDay.getDay(); // Day of week (0 = Sunday)
    const daysInMonth = lastDay.getDate();
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startDate; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        calendarGrid.appendChild(emptyDay);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        
        // Highlight today
        const today = new Date();
        if (currentDate.getFullYear() === today.getFullYear() &&
            currentDate.getMonth() === today.getMonth() &&
            day === today.getDate()) {
            dayElement.classList.add('today');
            dayElement.style.background = '#4f46e5';
            dayElement.style.color = 'white';
            dayElement.style.borderRadius = '8px';
        }
        
        // Add event indicators (sample events)
        if (hasEventOnDay(day)) {
            dayElement.classList.add('has-event');
            dayElement.style.position = 'relative';
            
            const eventDot = document.createElement('div');
            eventDot.style.cssText = `
                position: absolute;
                bottom: 5px;
                right: 5px;
                width: 6px;
                height: 6px;
                background: #10b981;
                border-radius: 50%;
            `;
            dayElement.appendChild(eventDot);
        }
        
        // Add click handler
        dayElement.addEventListener('click', function() {
            showDayEvents(day);
        });
        
        calendarGrid.appendChild(dayElement);
    }
}

// Check if day has events (sample data)
function hasEventOnDay(day) {
    const eventDays = [5, 12, 15, 22, 28]; // Sample event days
    return eventDays.includes(day);
}

// Show events for a specific day
function showDayEvents(day) {
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const dateStr = `${monthNames[currentDate.getMonth()]} ${day}, ${currentDate.getFullYear()}`;
    
    // Sample events for the day
    const dayEvents = getDayEvents(day);
    
    if (dayEvents.length === 0) {
        showNotification(`No events scheduled for ${dateStr}`, 'info');
        return;
    }
    
    // Create modal to show day events
    const modal = document.createElement('div');
    modal.className = 'day-events-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Events for ${dateStr}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    ${dayEvents.map(event => `
                        <div class="day-event-item">
                            <div class="event-time">${event.time}</div>
                            <div class="event-details">
                                <h4>${event.title}</h4>
                                <p>${event.location}</p>
                            </div>
                            <div class="event-status ${event.status}">${event.status}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeModal = () => modal.remove();
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', function(e) {
        if (e.target === this) closeModal();
    });
}

// Get events for a specific day (sample data)
function getDayEvents(day) {
    const sampleEvents = {
        5: [
            { time: '10:00 AM', title: 'Team Meeting', location: 'Conference Room A', status: 'organizing' },
            { time: '2:00 PM', title: 'Workshop Planning', location: 'Office', status: 'organizing' }
        ],
        15: [
            { time: '9:00 AM', title: 'Tech Talk: AI in Healthcare', location: 'Engineering Building', status: 'organizing' }
        ],
        22: [
            { time: '6:00 PM', title: 'Startup Pitch Competition', location: 'Business School', status: 'attending' }
        ]
    };
    
    return sampleEvents[day] || [];
}

// Profile actions
function initializeProfileActions() {
    const editProfileBtn = document.querySelector('.profile-actions .btn-secondary');
    const createEventBtn = document.querySelector('.profile-actions .btn-primary');
    const avatarEdit = document.querySelector('.avatar-edit');
    
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function() {
            showEditProfileModal();
        });
    }
    
    if (createEventBtn) {
        createEventBtn.addEventListener('click', function() {
            showCreateEventModal();
        });
    }
    
    if (avatarEdit) {
        avatarEdit.addEventListener('click', function() {
            // Simulate file input click
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.addEventListener('change', function(e) {
                if (e.target.files[0]) {
                    handleAvatarUpload(e.target.files[0]);
                }
            });
            fileInput.click();
        });
    }
}

// Show edit profile modal
function showEditProfileModal() {
    const modal = document.createElement('div');
    modal.className = 'edit-profile-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Edit Profile</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <form class="edit-profile-form">
                        <div class="form-group">
                            <label>Full Name</label>
                            <input type="text" value="Alex Johnson" class="form-input">
                        </div>
                        <div class="form-group">
                            <label>Bio</label>
                            <textarea class="form-input" rows="3">Computer Science Student • University of California</textarea>
                        </div>
                        <div class="form-group">
                            <label>University</label>
                            <input type="text" value="University of California" class="form-input">
                        </div>
                        <div class="form-group">
                            <label>Major</label>
                            <input type="text" value="Computer Science" class="form-input">
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn-secondary cancel-btn">Cancel</button>
                            <button type="submit" class="btn-primary">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Modal functionality
    const closeModal = () => modal.remove();
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.cancel-btn').addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', function(e) {
        if (e.target === this) closeModal();
    });
    
    // Form submission
    modal.querySelector('.edit-profile-form').addEventListener('submit', function(e) {
        e.preventDefault();
        showNotification('Profile updated successfully!', 'success');
        closeModal();
    });
}

// Show create event modal
function showCreateEventModal() {
    showNotification('Redirecting to event creation...', 'info');
    // In a real app, this would redirect to event creation page
    setTimeout(() => {
        window.location.href = 'create-event.html';
    }, 1000);
}

// Handle avatar upload
function handleAvatarUpload(file) {
    if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const avatarImg = document.querySelector('.profile-avatar img');
            if (avatarImg) {
                avatarImg.src = e.target.result;
                showNotification('Avatar updated successfully!', 'success');
            }
        };
        reader.readAsDataURL(file);
    } else {
        showNotification('Please select a valid image file', 'error');
    }
}

// Initialize dashboard
function initializeDashboard() {
    // Animate stats on load
    animateStats();
    
    // Load recent activity
    loadRecentActivity();
    
    // Load upcoming events
    loadUpcomingEvents();
}

// Animate dashboard stats
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-info h3');
    
    statNumbers.forEach(stat => {
        const finalValue = parseInt(stat.textContent);
        let currentValue = 0;
        const increment = finalValue / 20;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                stat.textContent = finalValue;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(currentValue);
            }
        }, 50);
    });
}

// Load user data
function loadUserData() {
    // In a real app, this would fetch user data from an API
    console.log('Loading user data...');
}

// Load recent activity
function loadRecentActivity() {
    // In a real app, this would fetch recent activity from an API
    console.log('Loading recent activity...');
}

// Load upcoming events
function loadUpcomingEvents() {
    // In a real app, this would fetch upcoming events from an API
    console.log('Loading upcoming events...');
}

// Event management actions
document.addEventListener('click', function(e) {
    if (e.target.matches('.event-actions .btn-secondary')) {
        const eventCard = e.target.closest('.event-card');
        const eventTitle = eventCard.querySelector('h3').textContent;
        
        if (e.target.textContent.includes('Edit')) {
            showNotification(`Editing ${eventTitle}...`, 'info');
        } else if (e.target.textContent.includes('Manage')) {
            showNotification(`Managing ${eventTitle}...`, 'info');
        } else if (e.target.textContent.includes('View')) {
            showNotification(`Viewing ${eventTitle}...`, 'info');
        }
    }
    
    if (e.target.matches('.event-actions .btn-primary')) {
        const eventCard = e.target.closest('.event-card');
        const eventTitle = eventCard.querySelector('h3').textContent;
        
        if (e.target.textContent.includes('Manage')) {
            showNotification(`Opening management panel for ${eventTitle}...`, 'info');
        } else if (e.target.textContent.includes('Clone')) {
            showNotification(`Cloning ${eventTitle}...`, 'info');
        }
    }
});
