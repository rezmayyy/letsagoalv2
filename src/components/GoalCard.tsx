'use client';

import { useState } from 'react';
import { Goal } from '../types/goal';
import { toggleGoalStatus, deleteGoal, shareGoal } from '../lib/goals';

interface GoalCardProps {
  goal: Goal;
  onGoalUpdated: () => void;
  isPro?: boolean;
}

export default function GoalCard({ goal, onGoalUpdated, isPro = false }: GoalCardProps) {
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleToggleStatus = async () => {
    setLoading(true);
    try {
      await toggleGoalStatus(goal.id, goal.status);
      onGoalUpdated();
    } catch (error) {
      console.error('Error toggling goal status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteGoal(goal.id);
      onGoalUpdated();
    } catch (error) {
      console.error('Error deleting goal:', error);
    } finally {
      setLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleShare = async () => {
    setLoading(true);
    try {
      await shareGoal(goal.id);
      onGoalUpdated();
    } catch (error) {
      console.error('Error sharing goal:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDeadline = (deadline: string) => {
    return new Date(deadline).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isOverdue = goal.deadline && new Date(goal.deadline) < new Date() && goal.status === 'active';

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${
      goal.status === 'completed' 
        ? 'border-green-500 bg-green-50' 
        : isOverdue 
        ? 'border-red-500 bg-red-50' 
        : 'border-indigo-500'
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className={`text-lg font-semibold ${
            goal.status === 'completed' ? 'line-through text-gray-600' : 'text-gray-800'
          }`}>
            {goal.title}
          </h3>
          {goal.description && (
            <p className={`mt-2 text-sm ${
              goal.status === 'completed' ? 'text-gray-500' : 'text-gray-600'
            }`}>
              {goal.description}
            </p>
          )}
        </div>
        
        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={handleToggleStatus}
            disabled={loading}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              goal.status === 'completed'
                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                : 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'
            }`}
          >
            {goal.status === 'completed' ? 'Completed' : 'Mark Complete'}
          </button>
          
          {/* Share Button - Only for Pro users and unshared goals */}
          {isPro && !goal.shared_at && (
            <button
              onClick={handleShare}
              disabled={loading}
              className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors"
            >
              Share
            </button>
          )}
          
          <button
            onClick={() => setShowDeleteConfirm(true)}
            disabled={loading}
            className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 hover:bg-red-200 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          {goal.deadline && (
            <span className={`flex items-center ${
              isOverdue ? 'text-red-600 font-medium' : 'text-gray-500'
            }`}>
              📅 {formatDeadline(goal.deadline)}
              {isOverdue && <span className="ml-1">(Overdue)</span>}
            </span>
          )}
          <span className="flex items-center">
            📝 Created {new Date(goal.created_at).toLocaleDateString()}
          </span>
        </div>
        
        {goal.shared_at && (
          <span className="flex items-center text-purple-600">
            🌐 Shared on GoalBoard
          </span>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Delete Goal</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete "{goal.title}"? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                {loading ? 'Deleting...' : 'Delete'}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={loading}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 