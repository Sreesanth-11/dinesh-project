import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [registeredEvents, setRegisteredEvents] = useState([]);

  // Check for existing user session on app load
  useEffect(() => {
    const savedUser = localStorage.getItem("evently_user");
    const savedEvents = localStorage.getItem("evently_registered_events");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error parsing saved user:", error);
        localStorage.removeItem("evently_user");
      }
    }

    if (savedEvents) {
      try {
        setRegisteredEvents(JSON.parse(savedEvents));
      } catch (error) {
        console.error("Error parsing saved events:", error);
        localStorage.removeItem("evently_registered_events");
      }
    }

    setIsLoading(false);
  }, []);

  // Save user to localStorage whenever user state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("evently_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("evently_user");
    }
  }, [user]);

  // Save registered events to localStorage
  useEffect(() => {
    localStorage.setItem(
      "evently_registered_events",
      JSON.stringify(registeredEvents)
    );
  }, [registeredEvents]);

  const login = async (email, password) => {
    setIsLoading(true);

    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simple validation for demo
        if (email && password) {
          const userData = {
            id: Date.now(),
            email: email,
            name: email.split("@")[0],
            university: email.includes(".edu")
              ? email.split("@")[1]
              : "University",
            avatar: `https://ui-avatars.com/api/?name=${
              email.split("@")[0]
            }&background=667eea&color=fff`,
            joinedDate: new Date().toISOString(),
            isVerified: email.includes(".edu"),
            role: email === "admin@university.edu" ? "admin" : "user", // Simple admin check
          };

          setUser(userData);
          setIsLoading(false);
          resolve(userData);
        } else {
          setIsLoading(false);
          reject(new Error("Invalid credentials"));
        }
      }, 1500);
    });
  };

  const signup = async (userData) => {
    setIsLoading(true);

    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (
          userData.email &&
          userData.password &&
          userData.firstName &&
          userData.lastName
        ) {
          const newUser = {
            id: Date.now(),
            email: userData.email,
            name: `${userData.firstName} ${userData.lastName}`,
            firstName: userData.firstName,
            lastName: userData.lastName,
            university: userData.email.includes(".edu")
              ? userData.email.split("@")[1]
              : "University",
            avatar: `https://ui-avatars.com/api/?name=${userData.firstName}+${userData.lastName}&background=667eea&color=fff`,
            joinedDate: new Date().toISOString(),
            isVerified: userData.email.includes(".edu"),
            role: userData.email === "admin@university.edu" ? "admin" : "user",
          };

          setUser(newUser);
          setIsLoading(false);
          resolve(newUser);
        } else {
          setIsLoading(false);
          reject(new Error("Please fill in all required fields"));
        }
      }, 1500);
    });
  };

  const updateProfile = async (updatedData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const updatedUser = { ...user, ...updatedData };
          setUser(updatedUser);
          localStorage.setItem("evently_user", JSON.stringify(updatedUser));
          resolve(updatedUser);
        } catch (error) {
          reject(error);
        }
      }, 1000); // Simulate API delay
    });
  };

  const logout = () => {
    setUser(null);
    setRegisteredEvents([]);
    localStorage.removeItem("evently_user");
    localStorage.removeItem("evently_registered_events");
  };

  const registerForEvent = (event) => {
    if (!user) {
      throw new Error("Must be logged in to register for events");
    }

    const registration = {
      id: Date.now(),
      eventId: event.id,
      event: event,
      registeredAt: new Date().toISOString(),
      status: "confirmed",
    };

    setRegisteredEvents((prev) => [...prev, registration]);
    return registration;
  };

  const unregisterFromEvent = (eventId) => {
    setRegisteredEvents((prev) =>
      prev.filter((reg) => reg.eventId !== eventId)
    );
  };

  const isRegisteredForEvent = (eventId) => {
    return registeredEvents.some((reg) => reg.eventId === eventId);
  };

  const value = {
    user,
    isLoading,
    registeredEvents,
    login,
    signup,
    logout,
    updateProfile,
    registerForEvent,
    unregisterFromEvent,
    isRegisteredForEvent,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
