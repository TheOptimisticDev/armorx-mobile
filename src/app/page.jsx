"use client";
import React, { useState, useEffect } from "react";
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from "next/navigation";

function MainComponent() {
  const { data: user } = useUser(); // Use the useUser hook
  const [quoteIndex, setQuoteIndex] = useState(0);
  const router = useRouter(); // Initialize useRouter

  const quotes = [
    "Security is not the absence of danger, but the presence of preparedness. - Unknown",
    "The first line of defense is awareness. - Unknown",
    "A locked door only keeps out the honest. - Unknown",
    "Security is everyone's responsibility. - Unknown",
    "A strong security system is built on layers, not luck. - Unknown",
    "The best security measures are the ones that work when no one is watching. - Unknown",
    "Preparedness today prevents crises tomorrow. - Unknown",
    "Complacency is the enemy of security. - Unknown",
    "The safest place is the one that is well-guarded and well-managed. - Unknown",
  ];  

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Handle Sign In navigation
  const handleSignIn = () => {
    router.push("/signin"); // Navigate to the sign-in page
  };

  // Handle Sign Up navigation
  const handleSignUp = () => {
    router.push("/signup"); // Navigate to the sign-up page
  };

  // Handle hero navigation
  const handleHero = () => {
    router.push("/hero"); // Navigate to the hero page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fafafa] to-[#f5f5f5] relative flex flex-col">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(#00000009 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      ></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-r from-blue-100/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-1/4 w-1/2 h-1/2 bg-gradient-to-l from-purple-100/30 to-transparent rounded-full blur-3xl"></div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/30"></div>

      <nav className="relative border-b border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => user && (window.location.href = "/app")}
            >
              <i className="fas fa-shield-alt text-5xl md:text-6xl text-gray-700"></i>
              <div>
                <h1 className="text-xl font-roboto font-medium">ArmorX</h1>
                <p className="text-xs text-[#6F6F6F] font-roboto font-light">
                  Security Management
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleSignIn}
                className="block w-full md:w-auto px-4 py-2 text-center border border-black rounded hover:bg-black hover:text-white font-roboto font-medium"
              >
                Sign In
              </button>
              <button
                onClick={handleSignUp}
                className="block w-full md:w-auto bg-black text-white px-4 py-2 text-center rounded hover:bg-opacity-90 font-roboto font-medium"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex items-center justify-center flex-1 relative px-4">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-12">
            <i className="fas fa-shield-alt text-1xl md:text-2xl text-gray-700"></i>
            <p className="text-sm uppercase tracking-wider font-roboto font-light mb-3 text-[#6F6F6F]">
              Security Management Reimagined
            </p>
            <h1 className="text-4xl md:text-5xl font-roboto-mono font-medium mb-4">
              Stay Organized, Achieve More
            </h1>
            <p className="text-lg md:text-xl text-[#6F6F6F] font-roboto font-light mb-6">
              with powerful productivity insights
            </p>
            <button
              onClick={handleHero}
              className="inline-block w-full md:w-auto bg-black text-white px-8 py-3 rounded hover:bg-opacity-90 text-lg font-roboto font-medium"
            >
              Try ArmorX Free
            </button>
          </div>

          <div className="h-12 mt-20">
            <p className="text-sm italic text-[#6F6F6F] font-roboto font-light transition-opacity duration-500 px-4">
              {quotes[quoteIndex]}
            </p>
          </div>
        </div>
      </main>

      <footer className="relative py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-[#6F6F6F] hover:text-black">
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a href="#" className="text-[#6F6F6F] hover:text-black">
              <i className="fab fa-linkedin text-xl"></i>
            </a>
            <a href="#" className="text-[#6F6F6F] hover:text-black">
              <i className="fab fa-github text-xl"></i>
            </a>
            <a href="#" className="text-[#6F6F6F] hover:text-black">
              <i className="fab fa-instagram text-xl"></i>
            </a>
          </div>
          <div className="mt-6 text-center text-sm text-[#6F6F6F] font-roboto font-light">
            ArmorX &copy; {new Date().getFullYear()} All Rights Reserved
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MainComponent;
