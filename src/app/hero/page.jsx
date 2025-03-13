"use client";
import React, { useState, useEffect, useRef } from "react";
import { useUser } from '@auth0/nextjs-auth0';

function MainComponent() {
  const { user, isLoading } = useUser();
  const [activeTab, setActiveTab] = useState("map");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [incidents, setIncidents] = useState([]);
  const [liveCameras, setLiveCameras] = useState([]);
  const [accessLogs, setAccessLogs] = useState([]);
  const [isOffline, setIsOffline] = useState(false);

  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    // Attach event listener when dropdown is open
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  // Dummy data for notifications
  const [notification, setNotification] = useState({
    icon: 'fas fa-bell',
    title: 'Unauthorized Access Attempt',
    message: 'An unauthorized access attempt was detected at the main entrance.',
    time: '5 minutes ago',
    officerName: 'Officer John Doe',
    location: 'Main Entrance, Building A',
    additionalDetails: 'The individual tried to use a forged access card but was detected by the surveillance system.',
  });

  // Handle push-to-talk button click
  const handlePushToTalk = () => {
    alert("Push-to-talk activated. Speak now.");
  };

  // Handle panic button click
  const handlePanicButton = () => {
    alert("Panic button pressed! Emergency services have been notified.");
  };

  // Report a new incident
  const handleReportIncident = () => {
    const newIncident = {
      id: incidents.length + 1,
      type: "Unauthorized Access",
      location: "Main Gate",
      timestamp: new Date().toLocaleString(),
      status: "Active",
    };
    setIncidents([...incidents, newIncident]);
    alert("Incident reported successfully!");
  };

  // Fetch initial data for the app
  useEffect(() => {
    if (!user) return;
    
    // Simulate fetching access logs
    setAccessLogs([
      { id: 1, user: "John Doe", action: "Login", timestamp: "2025-03-07T08:15:00Z" },
      { id: 2, user: "Jane Smith", action: "Logout", timestamp: "2025-03-07T09:00:00Z" },
    ]);

    // Check offline status
    setIsOffline(!navigator.onLine);
    window.addEventListener("online", () => setIsOffline(false));
    window.addEventListener("offline", () => setIsOffline(true));
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen font-roboto bg-gray-100">

      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 w-full bg-white shadow-lg z-50">
        <div className="flex justify-between items-center p-4">
          <a href="/" className="flex items-center space-x-2">
            <img
              src="https://raw.githubusercontent.com/TheOptimisticDev/images/refs/heads/main/IMG_1608.jpeg?token=GHSAT0AAAAAAC7OCUUPLMXINMVSFLYT3RNCZ6S5UWA"
              alt="logo"
              className="w-11 h-11 object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold">ArmorX</h1>
            </div>
          </a>
          <button
            onClick={() => setShowDropdown((prev) => !prev)}
            className="text-gray-600 focus:outline-none"
          >
            <i className="fas fa-bars text-2xl"></i>
          </button>
        </div>

        {/* Dropdown Menu */}
        {showDropdown && (
        <div ref={dropdownRef} className="absolute right-0 mt-2 mr-2 w-56 bg-white border rounded-lg shadow-lg p-2">
          <p className="flex items-center justify-center text-xl my-4">
            Menu  
          </p>
          <button
            onClick={() => setShowDropdown(false)}
            className="absolute top-5 right-5 text-gray-600 hover:text-black"
          >
            <i className="fas fa-times"></i>
          </button>

          {/* Incidents */}
          <button
            onClick={() => setShowDropdown(false)}
            className="w-full text-left p-2 hover:bg-gray-100 rounded-lg"
          >
            <i className="fas fa-exclamation-triangle mr-2"></i> Incidents
          </button>

          {/* Inspections */}
          <button
            onClick={() => setShowDropdown(false)}
            className="w-full text-left p-2 hover:bg-gray-100 rounded-lg"
          >
            <i className="fas fa-walking mr-2"></i> Inspections
          </button>

          {/* Reports */}
          <button
            onClick={() => setShowDropdown(false)}
            className="w-full text-left p-2 hover:bg-gray-100 rounded-lg"
          >
            <i className="fas fa-file-alt mr-2"></i> Reports
          </button>

          {/* Profile */}
          <button
            onClick={() => setShowDropdown(false)}
            className="w-full text-left p-2 hover:bg-gray-100 rounded-lg"
          >
            <i className="fas fa-user mr-2"></i> Profile
          </button>

          {/* Settings */}
          <button
            onClick={() => setShowDropdown(false)}
            className="w-full text-left p-2 hover:bg-gray-100 rounded-lg"
          >
            <i className="fas fa-cog mr-2"></i> Settings
          </button>

          {/* Support */}
          <button
            onClick={() => setShowDropdown(false)}
            className="w-full text-left p-2 hover:bg-gray-100 rounded-lg"
          >
            <i className="fas fa-headset mr-2"></i> Support
          </button>

          <hr className="my-2" />

          {/* Sign Out */}
          <button
            onClick={() => alert("Signing out...")}
            className="w-full text-left p-2 hover:bg-gray-100 rounded-lg text-red-600"
          >
            <i className="fas fa-sign-out-alt mr-2"></i> Sign Out
          </button>
        </div>
      )}
      </div>

      {/* Hero Section */}
      <div className="flex-1 overflow-auto relative mt-16 mb-16">
        {activeTab === "map" && (
          <div className="h-full">
            {/* Map Container */}
            <div className="h-full bg-gray-300 flex items-center justify-center">
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBBJbV0x-oxHgi3ryNwlOoadiy86dnB2a9fA&s"
                alt="Map Placeholder"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Push-to-Talk and Panic Buttons */}
            <div className="absolute bottom-20 right-5 space-y-2">
              <button
                onClick={handlePushToTalk}
                className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition"
              >
                <i className="fas fa-microphone text-xl"></i>
              </button>
              <button
                onClick={handlePanicButton}
                className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 transition"
              >
                <i className="fas fa-exclamation-triangle text-xl"></i>
              </button>
            </div>
          </div>
        )}

        {activeTab === "alerts" && (
          <div className="space-y-4 p-4">
            <h2 className="text-xl font-semibold">Security Alerts</h2>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium">{notification.title}</h3>
              <p className="text-sm text-gray-600">{notification.message}</p>
              <span className="text-xs text-gray-500">{notification.time}</span>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium">Suspicious Activity Detected</h3>
              <p className="text-sm text-gray-600">A suspicious vehicle was spotted near the parking lot.</p>
              <span className="text-xs text-gray-500">10 minutes ago</span>
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="space-y-4 p-4">
            <h2 className="text-xl font-semibold">Profile</h2>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center space-x-4">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH87TKQrWcl19xly2VNs0CjBzy8eaKNM-ZpA&s"
                  alt="Profile"
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-gray-600">admin@armorx.com</p>
                </div>
              </div>
              <button className="w-full mt-4 bg-blue-600 text-white p-2 rounded-lg">
                Edit Profile
              </button>
            </div>
          </div>
        )}
      </div>

      {activeTab === "incidents" && <IncidentsComponent />}
      {activeTab === "reports" && <ReportsComponent />}
      {activeTab === "settings" && <SettingsComponent />}
      {activeTab === "support" && <SupportComponent />}

      {/* Popup for Notifications */}
      {showPopup && alert && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-80 text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-4 text-gray-600 hover:text-gray-800"
            >
              <i className="fas fa-times text-lg"></i>
            </button>
            <i className={`${notification.icon} text-3xl mb-3`}></i>
            <h3 className="text-lg font-semibold text-gray-800">
              {notification.title}
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              {notification.message}
            </p>
            <span className="text-xs text-gray-500 block mt-3">
              {notification.time}
            </span>
            <p className="font-semibold text-gray-800">Reported By:</p>
            <p className="text-sm text-gray-600">{notification.officerName}</p>
            <p className="font-semibold text-gray-800 mt-2">Location:</p>
            <p className="text-sm text-gray-600">{notification.location}</p>
            <p className="font-semibold text-gray-800 mt-2">Details:</p>
            <p className="text-sm text-gray-600">{notification.additionalDetails}</p>
          </div>
        </div>
      )}

      {/* Bottom Navigation Tab */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg z-50">
        <nav className="flex justify-around p-2">
          <button
            onClick={() => setActiveTab("map")}
            className={`flex flex-col items-center p-2 ${
              activeTab === "map" ? "text-gray-600" : "text-gray-600"
            }`}
          >
            <i className="fas fa-home text-xl"></i>
            <span className="text-xs">Home</span>
          </button>
          <button
            onClick={() => setActiveTab("alerts")}
            className={`flex flex-col items-center p-2 ${
              activeTab === "alerts" ? "text-gray-600" : "text-gray-600"
            }`}
          >
            <i className="fas fa-exclamation-circle text-xl"></i>
            <span className="text-xs">Alerts</span>
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex flex-col items-center p-2 ${
              activeTab === "profile" ? "text-gray-600" : "text-gray-600"
            }`}
          >
            <i className="fas fa-envelope text-xl"></i>
            <span className="text-xs">Inbox</span>
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex flex-col items-center p-2 ${
              activeTab === "profile" ? "text-gray-600" : "text-gray-600"
            }`}
          >
            <i className="fas fa-user text-xl"></i>
            <span className="text-xs">Profile</span>
          </button>
        </nav>
      </div>
    </div>
  );
}

export default MainComponent;
