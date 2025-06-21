'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function ProfileDropdown() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // TODO: Implement account deletion
      alert('Account deletion feature coming soon!');
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-blue-700 hover:text-blue-900 transition-colors px-3 py-2 rounded-lg hover:bg-blue-50"
      >
        <span className="text-lg">👤</span>
        <span className="hidden sm:block font-medium">Profile</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">{user?.email}</p>
            <p className="text-xs text-gray-500">Signed in</p>
          </div>
          
          <Link
            href="/settings"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            ⚙️ Account Settings
          </Link>
          
          <Link
            href="/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            👤 Profile Settings
          </Link>
          
          <button
            onClick={handleDeleteAccount}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            🗑️ Delete Account
          </button>
          
          <div className="border-t border-gray-100 mt-2 pt-2">
            <button
              onClick={handleSignOut}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              🚪 Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 