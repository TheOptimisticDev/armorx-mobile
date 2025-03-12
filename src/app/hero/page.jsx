"use client";
import React, { useState, useEffect } from "react";
import { useUser } from '@auth0/nextjs-auth0';

function MainComponent() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("map");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [alert, setAlert] = useState(true);

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

  // Fetch initial data for the Hero Section
  useEffect(() => {
    if (!user) return;

    // Fetch data logic here (if needed)
  }, [user]);

  return (
    <div className="flex flex-col h-screen font-roboto bg-gray-100">

      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 w-full bg-white shadow-lg z-50">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center">
            <i className="fas fa-shield-alt text-2xl text-blue-600"></i>
            <h1 className="text-xl font-bold ml-2">ArmorX</h1>
          </div>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="text-gray-600 focus:outline-none"
          >
            <i className="fas fa-bars text-2xl"></i>
          </button>
        </div>

        {/* Dropdown Menu */}
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg p-2">
            <button
              onClick={() => setActiveTab("map")}
              className="w-full text-left p-2 hover:bg-gray-100 rounded-lg"
            >
              <i className="fas fa-map-marker-alt mr-2"></i> Map
            </button>
            <button
              onClick={() => setActiveTab("alerts")}
              className="w-full text-left p-2 hover:bg-gray-100 rounded-lg"
            >
              <i className="fas fa-bell mr-2"></i> Alerts
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className="w-full text-left p-2 hover:bg-gray-100 rounded-lg"
            >
              <i className="fas fa-user mr-2"></i> Profile
            </button>
            <hr className="my-2" />
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
              <p className="text-gray-600">Map will be displayed here</p>
            </div>

            {/* Push-to-Talk and Panic Buttons */}
            <div className="absolute bottom-20 right-4 space-y-2">
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
              activeTab === "map" ? "text-blue-600" : "text-gray-600"
            }`}
          >
            <i className="fas fa-home text-xl"></i>
            <span className="text-xs">Home</span>
          </button>
          <button
            onClick={() => setActiveTab("alerts")}
            className={`flex flex-col items-center p-2 ${
              activeTab === "alerts" ? "text-blue-600" : "text-gray-600"
            }`}
          >
            <i className="fas fa-bell text-xl"></i>
            <span className="text-xs">Alerts</span>
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex flex-col items-center p-2 ${
              activeTab === "profile" ? "text-blue-600" : "text-gray-600"
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
