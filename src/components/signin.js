"use client";
import React from "react";
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from "next/navigation";

export default function SignIn() {
  const { user, error } = useUser();
  const router = useRouter();

  if (user) {
    router.push("/app");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fafafa] to-[#f5f5f5] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-center items-center mb-1">
          <img
            src="https://i.imgur.com/yJVTPfj.png"
            alt="logo"
            className="w-8 h-9 object-cover"
          />
        </div>
        
        <h1 className="text-2xl font-roboto font-medium mb-6 text-center">Sign-In</h1>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <a
          href="/api/auth/login"
          className="block w-full bg-black text-white px-4 py-2 text-center rounded hover:bg-opacity-90 font-roboto font-medium mb-4"
        >
          Sign In
        </a>

        <a
          href="/api/auth/login/google"
          className="block w-full bg-blue-500 text-white px-4 py-2 text-center rounded hover:bg-blue-600 font-roboto font-medium mb-4"
        >
          Sign In with Google
        </a>

        <p className="text-sm text-[#6F6F6F] font-roboto font-light mt-4 text-center">
          Don't have an account?{" "}
          <a href="/signup" className="text-black hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
