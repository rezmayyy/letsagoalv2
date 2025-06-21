'use client';

import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PublicGoal, GoalComment } from '../../types/goal';
import { getPublicGoals, getGoalComments, createComment, likeGoal, unlikeGoal, checkIfUserIsPro } from '../../lib/goals';
import Link from 'next/link';

export default function GoalBoard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [publicGoals, setPublicGoals] = useState<PublicGoal[]>([]);
  const [loadingGoals, setLoadingGoals] = useState(true);
  const [isPro, setIsPro] = useState(false);
  const [error, setError] = useState('');
  const [selectedGoal, setSelectedGoal] = useState<PublicGoal | null>(null);
  const [comments, setComments] = useState<GoalComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      checkProStatus();
      loadPublicGoals();
    }
  }, [user]);

  const checkProStatus = async () => {
    try {
      const proStatus = await checkIfUserIsPro();
      setIsPro(proStatus);
    } catch (error) {
      console.error('Error checking Pro status:', error);
      // Don't set error, just continue as non-Pro user
    }
  };

  const loadPublicGoals = async () => {
    try {
      setLoadingGoals(true);
      const goals = await getPublicGoals();
      setPublicGoals(goals);
    } catch (error) {
      setError('Failed to load shared goals');
      console.error('Error loading public goals:', error);
    } finally {
      setLoadingGoals(false);
    }
  };

  const handleGoalClick = async (goal: PublicGoal) => {
    setSelectedGoal(goal);
    try {
      const goalComments = await getGoalComments(goal.id);
      setComments(goalComments);
    } catch (error) {
      console.error('Error loading comments:', error);
    }
  };

  const handleLike = async (goalId: string) => {
    try {
      const goal = publicGoals.find(g => g.id === goalId);
      if (goal?.is_liked) {
        await unlikeGoal(goalId);
      } else {
        await likeGoal(goalId);
      }
      // Refresh goals to update like counts
      loadPublicGoals();
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGoal || !newComment.trim()) return;

    try {
      setSubmittingComment(true);
      await createComment({
        public_goal_id: selectedGoal.id,
        content: newComment.trim()
      });
      setNewComment('');
      // Refresh comments
      const updatedComments = await getGoalComments(selectedGoal.id);
      setComments(updatedComments);
    } catch (error) {
      console.error('Error creating comment:', error);
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-indigo-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-purple-700">GoalBoard</h1>
              <p className="text-purple-600 mt-2">Community shared goals and encouragement</p>
              {!isPro && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-700 text-sm">
                    💡 <strong>Upgrade to Pro</strong> to share your own goals on the GoalBoard!
                  </p>
                </div>
              )}
            </div>
            <Link 
              href="/home" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              ← Back to Goals
            </Link>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}
        </div>

        {/* Goals Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Public Goals List */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-indigo-700 mb-4">Shared Goals</h2>
            
            {loadingGoals ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-2 text-indigo-600">Loading goals...</p>
              </div>
            ) : publicGoals.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No goals have been shared yet.</p>
                <p className="text-gray-400 text-sm mt-2">
                  {isPro ? "Be the first to share your goal!" : "Upgrade to Pro to be the first to share!"}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {publicGoals.map((goal) => (
                  <div 
                    key={goal.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedGoal?.id === goal.id 
                        ? 'border-purple-300 bg-purple-50' 
                        : 'border-gray-200 hover:border-purple-200'
                    }`}
                    onClick={() => handleGoalClick(goal)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-800">{goal.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        goal.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {goal.status}
                      </span>
                    </div>
                    
                    {goal.description && (
                      <p className="text-gray-600 text-sm mb-3">{goal.description}</p>
                    )}
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>by {goal.user?.username || 'Unknown User'}</span>
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLike(goal.id);
                          }}
                          className={`flex items-center space-x-1 ${
                            goal.is_liked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                          }`}
                        >
                          <span>❤️</span>
                          <span>{goal.likes_count}</span>
                        </button>
                        <div className="flex items-center space-x-1">
                          <span>💬</span>
                          <span>{goal.comments_count}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Comments Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-indigo-700 mb-4">Comments & Encouragement</h2>
            
            {selectedGoal ? (
              <div>
                <div className="mb-4 p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-semibold text-purple-800">{selectedGoal.title}</h3>
                  {selectedGoal.description && (
                    <p className="text-purple-600 text-sm mt-1">{selectedGoal.description}</p>
                  )}
                </div>

                {/* Comment Form - Available to all users */}
                <form onSubmit={handleComment} className="mb-6">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share some encouragement..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    rows={3}
                  />
                  <button
                    type="submit"
                    disabled={!newComment.trim() || submittingComment}
                    className="mt-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    {submittingComment ? 'Posting...' : 'Post Comment'}
                  </button>
                </form>

                {/* Comments List */}
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="border-b border-gray-200 pb-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-gray-800">
                          {comment.user?.username || 'Unknown User'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(comment.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-600">{comment.content}</p>
                    </div>
                  ))}
                  
                  {comments.length === 0 && (
                    <p className="text-gray-500 text-center py-4">
                      No comments yet. Be the first to encourage!
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Select a goal to view comments and encouragement.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 