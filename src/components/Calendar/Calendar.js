import React, { useState } from "react";
import { useNotification } from "../../contexts/NotificationContext";
import "./Calendar.css";

const Calendar = ({ events = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoveredDay, setHoveredDay] = useState(null);
  const [hoveredEvents, setHoveredEvents] = useState([]);
  const { showNotification } = useNotification();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  // Sample events for demonstration
  const sampleEvents = [
    {
      id: 1,
      title: "Tech Conference 2024",
      date: 5,
      time: "10:00 AM",
      location: "Main Auditorium",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 2,
      title: "Web Development Workshop",
      date: 12,
      time: "2:00 PM",
      location: "Computer Lab",
      image:
        "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 3,
      title: "Career Fair",
      date: 15,
      time: "9:00 AM",
      location: "Student Center",
      image:
        "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 4,
      title: "Music Festival",
      date: 22,
      time: "6:00 PM",
      location: "Campus Grounds",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 5,
      title: "Graduation Ceremony",
      date: 28,
      time: "11:00 AM",
      location: "Stadium",
      image:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
  ];

  const getEventsForDay = (day) => {
    if (!day) return [];
    return sampleEvents.filter((event) => event.date === day);
  };

  const hasEventOnDay = (day) => {
    return getEventsForDay(day).length > 0;
  };

  const isToday = (day) => {
    if (!day) return false;

    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const handleDayHover = (day) => {
    if (!day) return;

    const dayEvents = getEventsForDay(day);
    setHoveredDay(day);
    setHoveredEvents(dayEvents);
  };

  const handleDayLeave = () => {
    setHoveredDay(null);
    setHoveredEvents([]);
  };

  const handleDayClick = (day) => {
    if (!day) return;

    const dateStr = `${
      monthNames[currentDate.getMonth()]
    } ${day}, ${currentDate.getFullYear()}`;
    const dayEvents = getEventsForDay(day);

    if (dayEvents.length > 0) {
      showNotification(`${dayEvents.length} event(s) on ${dateStr}`, "info");
    } else {
      showNotification(`No events scheduled for ${dateStr}`, "info");
    }
  };

  const days = getDaysInMonth();

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button
          className="calendar-nav"
          onClick={() => changeMonth(-1)}
          aria-label="Previous month"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <h3 className="current-month">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <button
          className="calendar-nav"
          onClick={() => changeMonth(1)}
          aria-label="Next month"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>

      <div className="calendar-grid">
        {/* Day headers */}
        {dayNames.map((dayName) => (
          <div key={dayName} className="calendar-day header">
            {dayName}
          </div>
        ))}

        {/* Calendar days */}
        {days.map((day, index) => (
          <div
            key={index}
            className={`calendar-day ${day ? "clickable" : "empty"} ${
              isToday(day) ? "today" : ""
            } ${hasEventOnDay(day) ? "has-event" : ""} ${
              hoveredDay === day ? "hovered" : ""
            }`}
            onClick={() => handleDayClick(day)}
            onMouseEnter={() => handleDayHover(day)}
            onMouseLeave={handleDayLeave}
          >
            {day && (
              <>
                <span className="day-number">{day}</span>
                {hasEventOnDay(day) && <div className="event-dot"></div>}
              </>
            )}
          </div>
        ))}
      </div>

      {/* Event Cards on Hover */}
      {hoveredDay && hoveredEvents.length > 0 && (
        <div className="calendar-event-popup">
          <div className="popup-header">
            <h4>Events on {monthNames[currentDate.getMonth()]} {hoveredDay}</h4>
          </div>
          <div className="popup-events">
            {hoveredEvents.map((event) => (
              <div key={event.id} className="popup-event-card">
                <div className="event-image">
                  <img src={event.image} alt={event.title} />
                </div>
                <div className="event-info">
                  <h5>{event.title}</h5>
                  <div className="event-details">
                    <div className="detail">
                      <i className="fas fa-clock"></i>
                      <span>{event.time}</span>
                    </div>
                    <div className="detail">
                      <i className="fas fa-map-marker-alt"></i>
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Calendar;
