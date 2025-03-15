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
  const [incidents, setIncidents] = useState([]);
  const [inspections, setInspections] = useState([]);
  const [patrols, setPatrols] = useState([]);
  const [reports, setReports] = useState([]);
  const [cameras, setCameras] = useState([]);
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
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse">
        <div className="text-white text-2xl font-bold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen font-roboto bg-gray-100">
      {/* Top Navigation */}
      <div className="fixed top-0 left-0 w-full bg-white shadow-lg z-50">
        <div className="flex justify-between items-center p-4">
          <a href="/" className="flex items-center space-x-2">
            <img
              src="https://raw.githubusercontent.com/TheOptimisticDev/images/refs/heads/main/IMG_1608.jpeg?token=GHSAT0AAAAAAC7OCUUPLMXINMVSFLYT3RNCZ6S5UWA"
              alt="logo"
              className="w-11 h-11 object-cover"
            />
            <h1 className="text-2xl font-bold">ArmorX</h1>
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
            <button onClick={() => setActiveTab("reports")} className="w-full text-left p-2 hover:bg-gray-100 rounded-lg">
              <i className="fas fa-file-alt mr-2"></i> Reports
            </button>
            <button onClick={() => setActiveTab("cameras")} className="w-full text-left p-2 hover:bg-gray-100 rounded-lg">
              <i className="fas fa-video mr-2"></i> Cameras
            </button>
            <button onClick={() => setActiveTab("access-control")} className="w-full text-left p-2 hover:bg-gray-100 rounded-lg">
              <i className="fas fa-key mr-2"></i> Access Control
            </button>
            <button onClick={() => setActiveTab("emergency-contacts")} className="w-full text-left p-2 hover:bg-gray-100 rounded-lg">
              <i className="fas fa-phone-alt mr-2"></i> Emergency Contacts
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

      {showPushToTalkPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
            <i className="fas fa-microphone text-4xl text-blue-600 mb-4"></i>
            <h2 className="text-xl font-semibold mb-2">Recording Sent!</h2>
            <p className="text-gray-600 mb-4">
              Your audio recording has been sent to the control room.
            </p>
            <button
              onClick={() => setShowPushToTalkPopup(false)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              OK
            </button>
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
          <div className="space-y-4 p-4">
            <h2 className="text-xl font-semibold">Security Alerts</h2>
            {alerts.map((alert) => (
              <div key={alert.id} className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-medium">{alert.type}</h3>
                <p className="text-sm text-gray-600">{alert.description}</p>
                <span className="text-xs text-gray-500">{alert.time}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "inbox" && (
          <div className="flex flex-col h-screen bg-gray-100">
            <div className="p-4">
              <h1 className="text-2xl font-semibold">Inbox</h1>
            </div>
            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-white">
              {messages.map((msg) => (
                <div key={msg.id} className="flex items-start space-x-4">
                  <img src={msg.senderAvatar} alt={msg.sender} className="w-10 h-10 rounded-full border-2 border-gray-300" />
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center">
                      <span className="font-semibold text-gray-700">{msg.sender}</span>
                      <span className="text-xs text-gray-500 ml-2">{msg.time}</span>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg shadow-md text-sm text-gray-700">{msg.message}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 p-4 border-t border-gray-200">
              <div className="flex items-center">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 p-3 border border-gray-300 rounded-lg"
                  placeholder="Type your message..."
                />
                <button onClick={sendMessage} className="ml-3 bg-blue-500 text-white px-4 py-2 rounded-lg">
                  Send
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="space-y-6 p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-semibold text-gray-800">Profile</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-6">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH87TKQrWcl19xly2VNs0CjBzy8eaKNM-ZpA&s"
                  alt="Profile"
                  className="w-20 h-20 rounded-full border"
                />
                <div>
                  <p className="text-lg font-semibold text-gray-900">John Doe</p>
                  <p className="text-sm text-gray-600">admin@armorx.com</p>
                  <p className="text-sm text-gray-500">Security Supervisor</p>
                  <button className="mt-2 text-blue-600 hover:underline" onClick={() => alert("Edit profile")}>
                    Edit Profile
                  </button>
                </div>
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
