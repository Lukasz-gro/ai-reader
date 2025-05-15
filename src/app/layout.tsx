import type { Metadata } from "next";
import "./globals.css";
import React from "react";

export const metadata: Metadata = {
  title: "AI Reader - Interactive Learning Platform",
  description: "An interactive platform for learning and testing with AI assistance",
  keywords: ["AI", "learning", "tests", "education", "interactive"],
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  themeColor: '#4299E1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header/Nav */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-6 py-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">TestGenie</h1>
          <nav className="space-x-6">
            <a href="#features" className="text-gray-600 hover:text-blue-600">Features</a>
            <a href="#about" className="text-gray-600 hover:text-blue-600">About</a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600">Contact</a>
            <a href="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">Sign Up</a>
          </nav>
        </div>
      </header>

      {/* Page Content */}
      <div className="flex-grow">
        {children}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 py-6">
        <div className="container mx-auto px-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} TestGenie. All rights reserved.</p>
        </div>
      </footer>
    </body>
  </html>
  );
}
