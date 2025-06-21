'use client';

import { useAuth } from '../../contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Goal } from '../../types/goal';
import { getGoals } from '../../lib/goals';
import CreateGoalForm from '../../components/CreateGoalForm';
import GoalCard from '../../components/GoalCard';
import ProUpgradeButton from '../../components/ProUpgradeButton';
import ProfileDropdown from '../../components/ProfileDropdown';
import { supabase } from '../../../lib/supabase';
import Link from 'next/link';

interface UserProfile {
  is_pro: boolean;
}

export default function Dashboard() {
  const { user, signOut, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loadingGoals, setLoadingGoals] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [error, setError] = useState('');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      loadGoals();
      loadUserProfile();
    }
  }, [user]);

  // Handle payment success
  useEffect(() => {
    const success = searchParams.get('success');
    const sessionId = searchParams.get('session_id');
    
    if (success === 'true' && sessionId && user) {
      handlePaymentSuccess(sessionId);
    }
  }, [searchParams, user]);

  const handlePaymentSuccess = async (sessionId: string) => {
    try {
      // Update user's Pro status
      const { error } = await supabase
        .from('profiles')
        .update({ is_pro: true })
        .eq('user_id', user?.id);

      if (error) {
        console.error('Error updating Pro status:', error);
      } else {
        setSuccessMessage('🎉 Payment successful! You are now a Pro user!');
        loadUserProfile(); // Refresh profile data
        // Clear the URL parameters
        router.replace('/dashboard');
      }
    } catch (error) {
      console.error('Error handling payment success:', error);
    }
  };

  const loadGoals = async () => {
    try {
      setLoadingGoals(true);
      const goalsData = await getGoals();
      setGoals(goalsData);
    } catch (error) {
      setError('Failed to load goals');
      console.error('Error loading goals:', error);
    } finally {
      setLoadingGoals(false);
    }
  };

  const loadUserProfile = async () => {
    try {
      setLoadingProfile(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('is_pro')
        .eq('user_id', user?.id)
        .single();

      if (error) {
        console.error('Error loading profile:', error);
      } else {
        setUserProfile(data);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleGoalCreated = () => {
    setShowCreateForm(false);
    loadGoals();
  };

  const handleGoalUpdated = () => {
    loadGoals();
  };

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
    return null; // Will redirect to login
  }

  const activeGoals = goals.filter(goal => goal.status === 'active');
  const completedGoals = goals.filter(goal => goal.status === 'completed');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
            {successMessage}
          </div>
        )}

        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-indigo-700">Your Goals Dashboard</h1>
            <div className="flex items-center space-x-4">
              <Link 
                href="/dashboard" 
                className="text-blue-700 hover:text-blue-900 transition-colors hidden sm:block"
              >
                Dashboard
              </Link>
              <ProfileDropdown />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-indigo-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-indigo-700 mb-4">Welcome!</h2>
              <p className="text-indigo-600 mb-2">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="text-indigo-600">
                <strong>Account Created:</strong> {new Date(user.created_at).toLocaleDateString()}
              </p>
            </div>

            <div className="bg-purple-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-purple-700 mb-4">Goal Summary</h2>
              <p className="text-purple-600 mb-2">
                <strong>Active Goals:</strong> {activeGoals.length}
              </p>
              <p className="text-purple-600 mb-4">
                <strong>Completed Goals:</strong> {completedGoals.length}
              </p>
              
              {!loadingProfile && (
                <div className="mb-4">
                  <p className="text-purple-600 mb-2">
                    <strong>Status:</strong> {userProfile?.is_pro ? 'Pro User' : 'Free User'}
                  </p>
                  {userProfile?.is_pro && (
                    <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                      ✨ Pro Features Unlocked
                    </span>
                  )}
                </div>
              )}
              
              {!loadingProfile && !userProfile?.is_pro && (
                <ProUpgradeButton>
                  Upgrade to Pro - $4.99
                </ProUpgradeButton>
              )}
            </div>
          </div>
        </div>

        {/* Goals Section */}
        <div className="space-y-8">
          {/* Create Goal Button */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Your Goals</h2>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              + Create New Goal
            </button>
          </div>

          {/* Create Goal Form */}
          {showCreateForm && (
            <CreateGoalForm
              onGoalCreated={handleGoalCreated}
              onCancel={() => setShowCreateForm(false)}
            />
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Loading State */}
          {loadingGoals && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading goals...</p>
            </div>
          )}

          {/* Goals List */}
          {!loadingGoals && goals.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No goals yet</h3>
              <p className="text-gray-600 mb-4">Start by creating your first goal!</p>
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Create Your First Goal
              </button>
            </div>
          )}

          {/* Active Goals */}
          {!loadingGoals && activeGoals.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Active Goals ({activeGoals.length})</h3>
              <div className="space-y-4">
                {activeGoals.map((goal) => (
                  <GoalCard key={goal.id} goal={goal} onGoalUpdated={handleGoalUpdated} />
                ))}
              </div>
            </div>
          )}

          {/* Completed Goals */}
          {!loadingGoals && completedGoals.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Completed Goals ({completedGoals.length})</h3>
              <div className="space-y-4">
                {completedGoals.map((goal) => (
                  <GoalCard key={goal.id} goal={goal} onGoalUpdated={handleGoalUpdated} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 