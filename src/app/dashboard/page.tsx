'use client';

import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Goal } from '../../types/goal';
import { getGoals } from '../../lib/goals';
import CreateGoalForm from '../../components/CreateGoalForm';
import GoalCard from '../../components/GoalCard';
import { supabase } from '../../../lib/supabase';

export default function Dashboard() {
  const { user, signOut, loading } = useAuth();
  const router = useRouter();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loadingGoals, setLoadingGoals] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      loadGoals();
    }
  }, [user]);

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

  const handleGoalCreated = () => {
    setShowCreateForm(false);
    loadGoals();
  };

  const handleGoalUpdated = () => {
    loadGoals();
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
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
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-indigo-700">Your Goals Dashboard</h1>
            <button
              onClick={handleSignOut}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Sign Out
            </button>
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
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                Upgrade to Pro
              </button>
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