'use client';

import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Profile() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-indigo-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-indigo-700">Profile Settings</h1>
            <Link 
              href="/dashboard" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              ← Back to Dashboard
            </Link>
          </div>

          <div className="space-y-6">
            {/* Profile Picture */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Picture</h2>
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👤</span>
                </div>
                <div>
                  <p className="text-gray-600 mb-2">Upload a profile picture to personalize your account</p>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
                    Upload Photo
                  </button>
                </div>
              </div>
            </div>

            {/* Display Name */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Display Name</h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
                  <input
                    type="text"
                    placeholder="Enter your display name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Save Changes
                </button>
              </div>
            </div>

            {/* Bio */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Bio</h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">About You</label>
                  <textarea
                    placeholder="Tell us a bit about yourself..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Save Changes
                </button>
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Privacy Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">Profile Visibility</p>
                    <p className="text-sm text-gray-600">Control who can see your profile</p>
                  </div>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option>Public</option>
                    <option>Private</option>
                  </select>
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Save Privacy Settings
                </button>
              </div>
            </div>

            {/* Coming Soon */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-blue-800 mb-4">Coming Soon</h2>
              <div className="space-y-3 text-blue-700">
                <p>• Social media links</p>
                <p>• Theme preferences</p>
                <p>• Language settings</p>
                <p>• Time zone preferences</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 