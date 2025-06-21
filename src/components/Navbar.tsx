'use client';

import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import ProfileDropdown from "./ProfileDropdown";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="bg-white/90 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🎯</span>
            <span className="font-bold text-xl text-blue-700">LetsAGoal</span>
          </Link>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/home" className="text-blue-700 hover:text-blue-900 transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-blue-700 hover:text-blue-900 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-blue-700 hover:text-blue-900 transition-colors">
              Contact
            </Link>
            <Link href="/pricing" className="text-blue-700 hover:text-blue-900 transition-colors">
              Go Pro
            </Link>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <ProfileDropdown />
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="text-blue-700 hover:text-blue-900 transition-colors hidden sm:block"
                >
                  Sign In
                </Link>
                <Link 
                  href="/signup" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 