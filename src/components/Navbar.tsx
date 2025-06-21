'use client';

import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import ProfileDropdown from "./ProfileDropdown";
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  const navLinks = [
    { href: user ? '/home' : '/', label: 'Home' },
    { href: '/goalboard', label: 'GoalBoard' },
    { href: '/about', label: 'About' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-indigo-600">
              <span>🎯</span>
              <span>LetsAGoal</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === link.href
                      ? 'text-white bg-indigo-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            {loading ? (
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            ) : user ? (
              <ProfileDropdown />
            ) : (
              <div className="hidden md:block space-x-2">
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
          {/* Mobile menu button can be added here */}
        </div>
      </div>
    </nav>
  );
} 