"use client";
import React, { useState, useEffect, useRef } from "react";
import { useUser } from '@auth0/nextjs-auth0';
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null); // Store the map instance

  useEffect(() => {
    // Ensure the map container is available
    if (!mapRef.current) return;

    // Initialize the map
    mapInstance.current = L.map(mapRef.current).setView([0, 0], 13); // Default center and zoom

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstance.current);

    // Ask for user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          mapInstance.current.setView([latitude, longitude], 13);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to retrieve your location. Using default map view.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser. Using default map view.");
    }

    // Cleanup map on unmount
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
      }
    };
  }, []);

  return <div ref={mapRef} className="w-full h-full" />;
};

function MainComponent() {
  // State and hooks
  const { user, isLoading } = useUser();
  const [activeTab, setActiveTab] = useState("map");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [accessLogs, setAccessLogs] = useState([]);
  const [isOffline, setIsOffline] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Control Room",
      senderAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      message: "Alert! Suspicious activity detected at the south entrance.",
      time: "5 minutes ago",
    },
    {
      id: 2,
      sender: "Officer John",
      senderAvatar: "https://randomuser.me/api/portraits/men/45.jpg",
      message: "Roger that. Heading to the location now.",
      time: "3 minutes ago",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const dropdownRef = useRef(null);
  const incidents = [
    {
      id: 1,
      type: "Suspicious Activity",
      time: "10 minutes ago",
      description: "A suspicious vehicle was spotted near the parking lot.",
    },
    {
      id: 2,
      type: "Unauthorized Access",
      time: "15 minutes ago",
      description: "An unauthorized individual was seen near the main gate.",
    },
    {
      id: 3,
      type: "Fire Alarm Triggered",
      time: "20 minutes ago",
      description: "The fire alarm was triggered in Building A.",
    },
    {
      id: 4,
      type: "CCTV Camera Down",
      time: "30 minutes ago",
      description: "CCTV Camera 12 in the south wing is offline.",
    },
    {
      id: 5,
      type: "Theft Reported",
      time: "1 hour ago",
      description: "A theft was reported in the storage room.",
    },
    {
      id: 6,
      type: "Vandalism Detected",
      time: "2 hours ago",
      description: "Graffiti was found on the west wall.",
    },
    {
      id: 7,
      type: "Power Outage",
      time: "3 hours ago",
      description: "A power outage was reported in the east wing.",
    },
    {
      id: 8,
      type: "Medical Emergency",
      time: "4 hours ago",
      description: "A medical emergency was reported in the cafeteria.",
    },
  ];
  
  const inspections = [
    {
      id: 1,
      type: "Perimeter Check",
      time: "1 hour ago",
      description: "Inspect the perimeter for any breaches.",
    },
    {
      id: 2,
      type: "Fire Extinguisher Check",
      time: "2 hours ago",
      description: "Inspect all fire extinguishers in Building B.",
    },
    {
      id: 3,
      type: "Security Camera Audit",
      time: "3 hours ago",
      description: "Audit all security cameras for functionality.",
    },
    {
      id: 4,
      type: "Door Lock Inspection",
      time: "4 hours ago",
      description: "Check all door locks in the facility.",
    },
    {
      id: 5,
      type: "Emergency Exit Check",
      time: "5 hours ago",
      description: "Ensure all emergency exits are accessible.",
    },
    {
      id: 6,
      type: "Lighting Inspection",
      time: "6 hours ago",
      description: "Inspect all outdoor lighting for functionality.",
    },
    {
      id: 7,
      type: "Parking Lot Patrol",
      time: "7 hours ago",
      description: "Patrol the parking lot for suspicious activity.",
    },
    {
      id: 8,
      type: "Server Room Check",
      time: "8 hours ago",
      description: "Inspect the server room for any anomalies.",
    },
  ];
  
  const patrols = [
    {
      id: 1,
      type: "Night Patrol",
      time: "8:00 PM",
      description: "Patrol the east and west wings of the facility.",
    },
    {
      id: 2,
      type: "Morning Patrol",
      time: "6:00 AM",
      description: "Patrol the north and south wings of the facility.",
    },
    {
      id: 3,
      type: "Afternoon Patrol",
      time: "12:00 PM",
      description: "Patrol the perimeter of the facility.",
    },
    {
      id: 4,
      type: "Evening Patrol",
      time: "6:00 PM",
      description: "Patrol the parking lot and main entrance.",
    },
    {
      id: 5,
      type: "Building A Patrol",
      time: "10:00 AM",
      description: "Patrol all floors of Building A.",
    },
    {
      id: 6,
      type: "Building B Patrol",
      time: "2:00 PM",
      description: "Patrol all floors of Building B.",
    },
    {
      id: 7,
      type: "Warehouse Patrol",
      time: "4:00 PM",
      description: "Patrol the warehouse for any suspicious activity.",
    },
    {
      id: 8,
      type: "Perimeter Patrol",
      time: "9:00 PM",
      description: "Patrol the outer perimeter of the facility.",
    },
  ];
  
  const access = [
    {
      id: 1,
      user: "John Doe",
      action: "Login",
      timestamp: "2025-03-07T08:15:00Z",
    },
    {
      id: 2,
      user: "Jane Smith",
      action: "Login",
      timestamp: "2025-03-07T09:30:00Z",
    },
    {
      id: 3,
      user: "Alex Johnson",
      action: "Logout",
      timestamp: "2025-03-07T10:45:00Z",
    },
    {
      id: 4,
      user: "Emily Davis",
      action: "Login",
      timestamp: "2025-03-07T11:20:00Z",
    },
    {
      id: 5,
      user: "Michael Brown",
      action: "Access Denied",
      timestamp: "2025-03-07T12:10:00Z",
    },
    {
      id: 6,
      user: "Sarah Wilson",
      action: "Login",
      timestamp: "2025-03-07T13:05:00Z",
    },
    {
      id: 7,
      user: "David Martinez",
      action: "Logout",
      timestamp: "2025-03-07T14:50:00Z",
    },
    {
      id: 8,
      user: "Laura Garcia",
      action: "Login",
      timestamp: "2025-03-07T15:30:00Z",
    },
  ];
  
  const emergencyContacts = [
    {
      id: 1,
      name: "Control Room",
      role: "Security Supervisor",
      phone: "+1 (123) 456-7890",
    },
    {
      id: 2,
      name: "Fire Department",
      role: "Emergency Services",
      phone: "+1 (234) 567-8901",
    },
    {
      id: 3,
      name: "Police Department",
      role: "Law Enforcement",
      phone: "+1 (345) 678-9012",
    },
    {
      id: 4,
      name: "Medical Emergency",
      role: "Health Services",
      phone: "+1 (456) 789-0123",
    },
    {
      id: 5,
      name: "Facility Manager",
      role: "Administration",
      phone: "+1 (567) 890-1234",
    },
    {
      id: 6,
      name: "IT Support",
      role: "Technical Assistance",
      phone: "+1 (678) 901-2345",
    },
    {
      id: 7,
      name: "Maintenance Team",
      role: "Facility Maintenance",
      phone: "+1 (789) 012-3456",
    },
    {
      id: 8,
      name: "Security Officer",
      role: "On-Duty Security",
      phone: "+1 (890) 123-4567",
    },
  ];

  const [isRecording, setIsRecording] = useState(false);

  // Handle Push-to-Talk button press
  const handlePushToTalk = () => {
    setIsRecording(true);
    console.log("Recording started...");
  };

  // Handle Push-to-Talk button release
  const handlePushToTalkRelease = () => {
    setIsRecording(false);
    setShowPopup(true); // Show popup when recording stops
    console.log("Recording stopped.");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  // Fetch initial data
  useEffect(() => {
    if (!user) return;

    // Simulate fetching data
    setAlerts([
      { id: 1, type: "Unauthorized Access", time: "5 minutes ago", description: "An unauthorized access attempt was detected at the main entrance." },
    ]);
    setIncidents([
      { id: 1, type: "Suspicious Activity", time: "10 minutes ago", description: "A suspicious vehicle was spotted near the parking lot." },
    ]);
    setAccessLogs([
      { id: 1, user: "John Doe", action: "Login", timestamp: "2025-03-07T08:15:00Z" },
    ]);

    // Check offline status
    setIsOffline(!navigator.onLine);
    window.addEventListener("online", () => setIsOffline(false));
    window.addEventListener("offline", () => setIsOffline(true));
  }, [user]);

  const [showPanicPopup, setShowPanicPopup] = useState(false);
  const [showPushToTalkPopup, setShowPushToTalkPopup] = useState(false);

  // Handle panic button
  const handlePanicButton = () => {
    // Simulate sending panic alert with location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Panic alert sent with location:", { latitude, longitude });
        setShowPanicPopup(true); // Show popup
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to retrieve your location. Panic alert sent without location.");
        setShowPanicPopup(true); // Show popup even if location is unavailable
      }
    );
  };

  // Send message
  const sendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        sender: "Officer",
        senderAvatar: "https://randomuser.me/api/portraits/men/12.jpg",
        message: newMessage,
        time: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen animate-pulse">
        <div className="text-white text-2xl font-bold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen font-roboto bg-gray-100">
      {/* Top Navigation */}
      <div className="fixed top-0 left-0 w-full bg-white shadow-lg z-50">
        <div className="flex justify-between items-center p-3">
          {/* Logo and Brand Name */}
          <a href="/" className="flex items-center space-x-2">
            <img
              src="https://i.imgur.com/yJVTPfj.png"
              alt="logo"
              className="w-8 h-9 object-cover"
            />
            <h1 className="text-3xl font-bold">ArmorX</h1>
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
            <p className="flex items-center justify-center text-xl my-4">Menu</p>
            <button onClick={() => setActiveTab("incidents")} className="w-full text-left p-2 hover:bg-gray-100 rounded-lg">
              <i className="fas fa-exclamation-triangle mr-2"></i> Incidents
            </button>
            <button onClick={() => setActiveTab("inspections")} className="w-full text-left p-2 hover:bg-gray-100 rounded-lg">
              <i className="fas fa-walking mr-2"></i> Inspections
            </button>
            <button onClick={() => setActiveTab("patrols")} className="w-full text-left p-2 hover:bg-gray-100 rounded-lg">
              <i className="fas fa-map-marker-alt mr-2"></i> Patrols
            </button>
            <button onClick={() => setActiveTab("access")} className="w-full text-left p-2 hover:bg-gray-100 rounded-lg">
              <i className="fas fa-key mr-2"></i> Access
            </button>
            <button onClick={() => setActiveTab("contacts")} className="w-full text-left p-2 hover:bg-gray-100 rounded-lg">
              <i className="fas fa-phone-alt mr-2"></i> Contacts
            </button>
            <button onClick={() => setActiveTab("settings")} className="w-full text-left p-2 hover:bg-gray-100 rounded-lg">
              <i className="fas fa-cog mr-2"></i> Settings
            </button>
            <hr className="my-2" />
            <button onClick={() => alert("Signing out...")} className="w-full text-left p-2 hover:bg-gray-100 rounded-lg text-red-600">
              <i className="fas fa-sign-out-alt mr-2"></i> Sign Out
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto relative mt-16 mb-16">
        {activeTab === "map" && (
          <div className="h-full relative">
            <div className="absolute inset-0 z-0">
              <MapComponent />
            </div>

            <div className="absolute bottom-20 right-5 space-y-2 z-10">
              <button
                onMouseDown={handlePushToTalk}
                onMouseUp={handlePushToTalkRelease}
                onTouchStart={handlePushToTalk}
                onTouchEnd={handlePushToTalkRelease}
                className={`w-12 h-12 ${
                  isRecording ? "bg-blue-700" : "bg-blue-600"
                } text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition`}
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

        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-12 rounded-lg shadow-lg text-center w-80 relative">
              {/* Close button in the top-right corner */}
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-2 right-4 text-gray-500 hover:text-gray-700 transition"
              >
                <i className="fas fa-times text-xl"></i>
              </button>

              {/* Pulse border and exclamation mark icon */}
              <div className="relative flex items-center justify-center mb-4">
                <div className="absolute w-16 h-16 bg-blue-100 rounded-full animate-ping"></div>
                <div className="relative w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <i className="fas fa-exclamation text-white text-2xl"></i>
                </div>
              </div>

              {/* Text below the icon */}
              <p className="text-gray-600 mb-4">Start talking</p>
            </div>
          </div>
        )}

        {showPanicPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
              <i className="fas fa-exclamation-triangle text-6xl text-red-600 mb-4"></i>
              <h2 className="text-xl font-semibold mb-2">Panic Alert Sent!</h2>
              <p className="text-gray-600 mb-4">
                Your panic alert has been sent to the control room with your current location.
              </p>
              <button
                onClick={() => setShowPanicPopup(false)}
                className="bg-blue-600 px-12 py-3 text-white rounded-lg hover:bg-blue-700 transition"
              >
                OK
              </button>
            </div>
          </div>
        )}

        {activeTab === "alerts" && (
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <div className="p-3 bg-white border-b border-gray-200 rounded-t-lg">
                <h1 className="text-xl font-semibold flex items-center text-gray-800 space-x-1">
                  <i className="fas fa-exclamation-circle text-2xl"></i>
                  <span>Alerts</span>
                </h1>
              </div>
              <div className="flex space-x-4">
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100">
                  <i className="fas fa-filter mr-2"></i>
                  Filter
                </button>
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100">
                  <i className="fas fa-sort mr-2"></i>
                  Sort
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {[
                {
                  id: 1,
                  type: "Suspicious Login Attempt",
                  description: "A login attempt was detected from an unrecognized device in New York, USA.",
                  time: "2 minutes ago",
                  severity: "High",
                },
                {
                  id: 2,
                  type: "Password Change Detected",
                  description: "Your account password was changed successfully.",
                  time: "15 minutes ago",
                  severity: "Medium",
                },
                {
                  id: 3,
                  type: "New Device Login",
                  description: "A new device (iPhone 14) logged into your account.",
                  time: "1 hour ago",
                  severity: "Low",
                },
                {
                  id: 4,
                  type: "Unusual Activity Detected",
                  description: "Unusual activity was detected in your account. Please verify your recent actions.",
                  time: "3 hours ago",
                  severity: "High",
                },
                {
                  id: 5,
                  type: "Two-Factor Authentication Enabled",
                  description: "Two-factor authentication was enabled for your account.",
                  time: "5 hours ago",
                  severity: "Info",
                },
                {
                  id: 6,
                  type: "Failed Login Attempt",
                  description: "A failed login attempt was detected from an unrecognized IP address.",
                  time: "1 day ago",
                  severity: "Medium",
                },
                {
                  id: 7,
                  type: "Account Recovery Initiated",
                  description: "An account recovery process was initiated. Check your email for further instructions.",
                  time: "2 days ago",
                  severity: "High",
                },
                {
                  id: 8,
                  type: "Security Settings Updated",
                  description: "Your security settings were updated successfully.",
                  time: "3 days ago",
                  severity: "Info",
                },
                {
                  id: 9,
                  type: "Phishing Attempt Detected",
                  description: "A phishing attempt was detected and blocked. Do not click on suspicious links.",
                  time: "4 days ago",
                  severity: "High",
                },
                {
                  id: 10,
                  type: "Account Locked",
                  description: "Your account was temporarily locked due to multiple failed login attempts.",
                  time: "5 days ago",
                  severity: "Critical",
                },
              ].map((alert) => (
                <div
                  key={alert.id}
                  className="bg-white p-4 rounded-lg shadow-sm border-l-4"
                  style={{
                    borderLeftColor:
                      alert.severity === "Critical"
                        ? "red"
                        : alert.severity === "High"
                        ? "orange"
                        : alert.severity === "Medium"
                        ? "yellow"
                        : "blue",
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-800">{alert.type}</h3>
                      <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                      <span className="text-xs text-gray-500 mt-2 block">{alert.time}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200">
                        Dismiss
                      </button>
                      <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-6">
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100">
                Load More
              </button>
            </div>
          </div>
        )}

        {activeTab === "inbox" && (
          <div className="flex flex-col h-[80vh] bg-gray-100 rounded-lg shadow-sm">
            <div className="p-3 bg-white border-b border-gray-200 rounded-t-lg">
              <h1 className="text-xl font-semibold flex items-center text-gray-800 space-x-2">
                <i className="fas fa-envelope text-2xl"></i>
                <span>Inbox</span>
              </h1>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-white">
              {messages.map((msg) => (
                <div key={msg.id} className="flex items-start space-x-3">
                  <img
                    src={msg.senderAvatar}
                    alt={msg.sender}
                    className="w-8 h-8 rounded-full border-2 border-gray-300"
                  />
                  <div className="flex flex-col space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-700 text-sm">{msg.sender}</span>
                      <span className="text-xs text-gray-500">{msg.time}</span>
                    </div>
                    <div className="bg-gray-100 p-2 rounded-lg text-sm text-gray-700">
                      {msg.message}
                    </div>
                    <div className="flex space-x-2 mt-1">
                      <button className="text-xs">
                        <i className="fas fa-reply text-gray-500"></i> Reply
                      </button>
                      <button className="text-xs">
                        <i className="fas fa-trash text-gray-500"></i> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input Area */}
            <div className="bg-gray-50 p-3 border-t border-gray-200 rounded-b-lg">
              <div className="flex items-center">
                {/* Input Field */}
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="Type your message..."
                />
                {/* Send Button */}
                <button
                  onClick={sendMessage}
                  className="ml-2 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-1 text-sm"
                >
                  <i className="fas fa-paper-plane"></i> {/* Send Icon */}
                  <span>Send</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="space-y-4 p-4 bg-gray-100 rounded-lg shadow-sm">
            {/* Header */}
            <h1 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
              <i className="fas fa-user text-2xl"></i>
              <span>Profile</span>
            </h1>

            {/* Profile Card */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center space-x-4">
                {/* Profile Picture */}
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH87TKQrWcl19xly2VNs0CjBzy8eaKNM-ZpA&s"
                  alt="Profile"
                  className="w-16 h-16 rounded-full border-2 border-gray-300"
                />
                <div className="flex-1">
                  {/* Name */}
                  <p className="text-lg font-semibold text-gray-900">John Doe</p>
                  {/* Email */}
                  <p className="text-sm text-gray-600 flex items-center space-x-1">
                    <i className="fas fa-envelope text-gray-400"></i> {/* Email Icon */}
                    <span>admin@armorx.com</span>
                  </p>
                  {/* Role */}
                  <p className="text-sm text-gray-500 flex items-center space-x-1">
                    <i className="fas fa-briefcase text-gray-400"></i> {/* Role Icon */}
                    <span>Security Supervisor</span>
                  </p>
                  {/* Edit Profile Button */}
                  <button
                    className="mt-2 text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                    onClick={() => alert("Edit profile")}
                  >
                    <i className="fas fa-edit"></i> {/* Edit Icon */}
                    <span>Edit Profile</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Security Settings</h3>

              {/* Two-Factor Authentication (2FA) */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <i className="fas fa-shield-alt"></i> {/* 2FA Icon */}
                  <span className="text-sm text-gray-700">Two-Factor Authentication</span>
                </div>
                <button
                  className="text-sm text-blue-600 hover:text-blue-700"
                  onClick={() => alert("Enable/Disable 2FA")}
                >
                  Enable 2FA
                </button>
              </div>

              {/* Password */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <i className="fas fa-key"></i> {/* Password Icon */}
                  <span className="text-sm text-gray-700">Password</span>
                </div>
                <button
                  className="text-sm text-blue-600 hover:text-blue-700"
                  onClick={() => alert("Change Password")}
                >
                  Change Password
                </button>
              </div>

              {/* Device Management */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <i className="fas fa-laptop"></i> {/* Device Icon */}
                  <span className="text-sm text-gray-700">Manage Devices</span>
                </div>
                <button
                  className="text-sm text-blue-600 hover:text-blue-700"
                  onClick={() => alert("Manage Devices")}
                >
                  View Devices
                </button>
              </div>
            </div>

            {/* Activity Logs */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Recent Activity</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center space-x-2">
                  <i className="fas fa-sign-in-alt text-gray-400"></i> {/* Login Icon */}
                  <span>Logged in from Chrome on Windows - 2 hours ago</span>
                </li>
                <li className="flex items-center space-x-2">
                  <i className="fas fa-lock text-gray-400"></i> {/* Lock Icon */}
                  <span>Changed password - 3 days ago</span>
                </li>
                <li className="flex items-center space-x-2">
                  <i className="fas fa-shield-alt text-gray-400"></i> {/* Security Icon */}
                  <span>Enabled Two-Factor Authentication - 1 week ago</span>
                </li>
              </ul>
            </div>

            {/* Security Tips */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Security Tips</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center space-x-2">
                  <i className="fas fa-check-circle"></i> {/* Check Icon */}
                  <span>Use a strong, unique password for your account.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <i className="fas fa-check-circle"></i> {/* Check Icon */}
                  <span>Enable Two-Factor Authentication for added security.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <i className="fas fa-check-circle"></i> {/* Check Icon */}
                  <span>Regularly review your login activity and connected devices.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Incidents Tab */}
{activeTab === "incidents" && (
  <div className="flex flex-col h-[80vh] bg-gray-100 rounded-lg shadow-sm">
    <div className="p-3 bg-white border-b border-gray-200 rounded-t-lg">
      <h1 className="text-xl font-semibold flex items-center text-gray-800 space-x-2">
        <i className="fas fa-exclamation-triangle text-2xl"></i>
        <span>Incidents</span>
      </h1>
      <div className="flex space-x-4">
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100">
                  <i className="fas fa-filter mr-2"></i>
                  Filter
                </button>
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100">
                  <i className="fas fa-sort mr-2"></i>
                  Sort
                </button>
              </div>
    </div>
    

    <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-white">
      {incidents.map((incident) => (
        <div key={incident.id} className="flex items-start space-x-3">
          <div className="flex flex-col space-y-1 flex-1">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700 text-sm">{incident.type}</span>
              <span className="text-xs text-gray-500">{incident.time}</span>
            </div>
            <div className="bg-gray-100 p-2 rounded-lg text-sm text-gray-700">
              {incident.description}
            </div>
            <div className="flex space-x-2 mt-1">
              <button className="text-xs">
                <i className="fas fa-eye"></i> View
              </button>
              <button className="text-xs">
                <i className="fas fa-trash"></i> Resolve
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

{/* Inspections Tab */}
{activeTab === "inspections" && (
  <div className="flex flex-col h-[80vh] bg-gray-100 rounded-lg shadow-sm">
    <div className="p-3 bg-white border-b border-gray-200 rounded-t-lg">
      <h1 className="text-xl font-semibold flex items-center text-gray-800 space-x-2">
        <i className="fas fa-walking text-2xl"></i>
        <span>Inspections</span>
      </h1>
    </div>
    <div className="flex space-x-4">
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100">
                  <i className="fas fa-filter mr-2"></i>
                  Filter
                </button>
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100">
                  <i className="fas fa-sort mr-2"></i>
                  Sort
                </button>
              </div>

    <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-white">
      {inspections.map((inspection) => (
        <div key={inspection.id} className="flex items-start space-x-3">
          <div className="flex flex-col space-y-1 flex-1">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700 text-sm">{inspection.type}</span>
              <span className="text-xs text-gray-500">{inspection.time}</span>
            </div>
            <div className="bg-gray-100 p-2 rounded-lg text-sm text-gray-700">
              {inspection.description}
            </div>
            <div className="flex space-x-2 mt-1">
              <button className="text-xs">
                <i className="fas fa-eye"></i> View
              </button>
              <button className="text-xs">
                <i className="fas fa-check"></i> Mark Complete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

{/* Patrols Tab */}
{activeTab === "patrols" && (
  <div className="flex flex-col h-[80vh] bg-gray-100 rounded-lg shadow-sm">
    <div className="p-3 bg-white border-b border-gray-200 rounded-t-lg">
      <h1 className="text-xl font-semibold flex items-center text-gray-800 space-x-2">
        <i className="fas fa-map-marker-alt text-2xl"></i>
        <span>Patrols</span>
      </h1>
    </div>
    <div className="flex space-x-4">
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100">
                  <i className="fas fa-filter mr-2"></i>
                  Filter
                </button>
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100">
                  <i className="fas fa-sort mr-2"></i>
                  Sort
                </button>
              </div>

    <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-white">
      {patrols.map((patrol) => (
        <div key={patrol.id} className="flex items-start space-x-3">
          <div className="flex flex-col space-y-1 flex-1">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700 text-sm">{patrol.type}</span>
              <span className="text-xs text-gray-500">{patrol.time}</span>
            </div>
            <div className="bg-gray-100 p-2 rounded-lg text-sm text-gray-700">
              {patrol.description}
            </div>
            <div className="flex space-x-2 mt-1">
              <button className="text-xs">
                <i className="fas fa-eye"></i> View
              </button>
              <button className="text-xs">
                <i className="fas fa-check"></i> Mark Complete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

{/* Access Control Tab */}
{activeTab === "access" && (
  <div className="flex flex-col h-[80vh] bg-gray-100 rounded-lg shadow-sm">
    <div className="p-3 bg-white border-b border-gray-200 rounded-t-lg">
      <h1 className="text-xl font-semibold flex items-center text-gray-800 space-x-2">
        <i className="fas fa-key text-2xl"></i>
        <span>Access Control</span>
      </h1>
    </div>
    <div className="flex space-x-4">
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100">
                  <i className="fas fa-filter mr-2"></i>
                  Filter
                </button>
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100">
                  <i className="fas fa-sort mr-2"></i>
                  Sort
                </button>
              </div>

    <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-white">
      {access.map((log) => (
        <div key={log.id} className="flex items-start space-x-3">
          <div className="flex flex-col space-y-1 flex-1">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700 text-sm">{log.user}</span>
              <span className="text-xs text-gray-500">{log.timestamp}</span>
            </div>
            <div className="bg-gray-100 p-2 rounded-lg text-sm text-gray-700">
              {log.action}
            </div>
            <div className="flex space-x-2 mt-1">
              <button className="text-xs text-blue-500 hover:text-blue-600">
                <i className="fas fa-eye"></i> View
              </button>
              <button className="text-xs text-red-500 hover:text-red-600">
                <i className="fas fa-ban"></i> Revoke Access
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

{/* Emergency Contacts Tab */}
{activeTab === "contacts" && (
  <div className="flex flex-col h-[80vh] bg-gray-100 rounded-lg shadow-sm">
    <div className="p-3 bg-white border-b border-gray-200 rounded-t-lg">
      <h1 className="text-xl font-semibold flex items-center text-gray-800 space-x-2">
        <i className="fas fa-phone-alt text-2xl"></i>
        <span>Contacts</span>
      </h1>
    </div>

    <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-white">
      {emergencyContacts.map((contact) => (
        <div key={contact.id} className="flex items-start space-x-3">
          <div className="flex flex-col space-y-1 flex-1">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-700 text-sm">{contact.name}</span>
              <span className="text-xs text-gray-500">{contact.role}</span>
            </div>
            <div className="bg-gray-100 p-2 rounded-lg text-sm text-gray-700">
              {contact.phone}
            </div>
            <div className="flex space-x-2 mt-1">
              <button className="text-xs">
                <i className="fas fa-phone"></i> Call
              </button>
              <button className="text-xs">
                <i className="fas fa-envelope"></i> Message
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

{/* Settings Tab */}
{activeTab === "settings" && (
  <div className="flex flex-col h-[80vh] bg-gray-100 rounded-lg shadow-sm">
    <div className="p-3 bg-white border-b border-gray-200 rounded-t-lg">
      <h1 className="text-xl font-semibold flex items-center text-gray-800 space-x-2">
        <i className="fas fa-cog text-2xl"></i>
        <span>Settings</span>
      </h1>
    </div>

    <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-white">
      <div className="flex items-center justify-between p-2">
        <span className="text-sm text-gray-700">Notifications</span>
        <button className="text-sm text-blue-600 hover:text-blue-700">
          <i className="fas fa-bell"></i> Manage
        </button>
      </div>
      <div className="flex items-center justify-between p-2">
        <span className="text-sm text-gray-700">Privacy</span>
        <button className="text-sm text-blue-600 hover:text-blue-700">
          <i className="fas fa-lock"></i> Manage
        </button>
      </div>
      <div className="flex items-center justify-between p-2">
        <span className="text-sm text-gray-700">Account</span>
        <button className="text-sm text-blue-600 hover:text-blue-700">
          <i className="fas fa-user"></i> Manage
        </button>
      </div>
    </div>
  </div>
)}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg z-50">
        <nav className="flex justify-around p-2">
          <button onClick={() => setActiveTab("map")} className="flex flex-col items-center p-2 text-gray-600">
            <i className="fas fa-home text-xl"></i>
            <span className="text-xs">Home</span>
          </button>
          <button onClick={() => setActiveTab("alerts")} className="flex flex-col items-center p-2 text-gray-600">
            <i className="fas fa-exclamation-circle text-xl"></i>
            <span className="text-xs">Alerts</span>
          </button>
          <button onClick={() => setActiveTab("inbox")} className="flex flex-col items-center p-2 text-gray-600">
            <i className="fas fa-envelope text-xl"></i>
            <span className="text-xs">Inbox</span>
          </button>
          <button onClick={() => setActiveTab("profile")} className="flex flex-col items-center p-2 text-gray-600">
            <i className="fas fa-user text-xl"></i>
            <span className="text-xs">Profile</span>
          </button>
        </nav>
      </div>
    </div>
  );
}

export default MainComponent;
