import { supabase } from '../../lib/supabase';
import { Goal, PublicGoal, GoalComment, CreateGoalData, UpdateGoalData, CreateCommentData } from '../types/goal';

export async function getGoals(): Promise<Goal[]> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('No authenticated user found');
  }

  const { data, error } = await supabase
    .from('goals')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data || [];
}

export async function createGoal(goalData: CreateGoalData): Promise<Goal> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('No authenticated user found');
  }

  const { data, error } = await supabase
    .from('goals')
    .insert([{
      ...goalData,
      user_id: user.id
    }])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateGoal(id: string, goalData: UpdateGoalData): Promise<Goal> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('No authenticated user found');
  }

  const { data, error } = await supabase
    .from('goals')
    .update(goalData)
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteGoal(id: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('No authenticated user found');
  }

  const { error } = await supabase
    .from('goals')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) {
    throw error;
  }
}

export async function toggleGoalStatus(id: string, currentStatus: string): Promise<Goal> {
  const isActive = currentStatus === 'in_progress' || currentStatus === 'active';
  const newStatus = isActive ? 'completed' : 'in_progress';
  return updateGoal(id, { status: newStatus as 'in_progress' | 'completed' | 'active' });
}

export async function getPublicGoals(): Promise<PublicGoal[]> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    // This page is protected, but as a safeguard, return empty array if no user.
    return [];
  }

  // Step 1: Get all shared goals with their like/comment counts.
  const { data: goalsData, error: goalsError } = await supabase
    .from('goals')
    .select('*, goal_likes(count), goal_comments(count)')
    .not('shared_at', 'is', null)
    .order('shared_at', { ascending: false });

  if (goalsError) {
    console.error('Error fetching shared goals:', goalsError);
    throw goalsError;
  }

  if (!goalsData || goalsData.length === 0) {
    return [];
  }

  // Step 2: Get the user profiles for the authors of the goals.
  const userIds = [...new Set(goalsData.map(g => g.user_id))];
  
  // Only query profiles if we have user IDs
  let profilesMap = new Map();
  if (userIds.length > 0) {
    const { data: profilesData, error: profilesError } = await supabase
      .from('profiles')
      .select('user_id, username')
      .in('user_id', userIds);

    if (profilesError) {
      console.error('Error fetching profiles:', profilesError);
      // Continue with empty profiles map instead of throwing
    } else {
      profilesMap = new Map(profilesData?.map(p => [p.user_id, p]));
    }
  }

  // Step 3: Get the likes for the current user to determine which goals are already liked.
  const { data: likedGoals } = await supabase
    .from('goal_likes')
    .select('public_goal_id')
    .eq('user_id', user.id);

  const likedGoalIds = new Set(likedGoals?.map(like => like.public_goal_id));

  // Step 4: Combine all the data into the final shape.
  const publicGoals: PublicGoal[] = goalsData.map(goal => ({
    id: goal.id,
    user_id: goal.user_id,
    title: goal.title,
    description: goal.description,
    status: goal.status,
    deadline: goal.deadline,
    likes_count: (Array.isArray(goal.goal_likes) && goal.goal_likes[0]?.count) || 0,
    comments_count: (Array.isArray(goal.goal_comments) && goal.goal_comments[0]?.count) || 0,
    created_at: goal.created_at,
    updated_at: goal.updated_at,
    shared_at: goal.shared_at,
    user: profilesMap.get(goal.user_id) || { username: 'Unknown User' },
    is_liked: likedGoalIds.has(goal.id),
  }));

  return publicGoals;
}

export async function shareGoal(goalId: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('No authenticated user found');
  }

  // Check if user is Pro
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_pro')
    .eq('user_id', user.id)
    .single();

  if (!profile?.is_pro) {
    throw new Error('Only Pro users can share goals');
  }

  const { error } = await supabase
    .from('goals')
    .update({ shared_at: new Date().toISOString() })
    .eq('id', goalId)
    .eq('user_id', user.id);

  if (error) {
    throw error;
  }
}

export async function unshareGoal(goalId: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('No authenticated user found');
  }

  const { error } = await supabase
    .from('goals')
    .update({ shared_at: null })
    .eq('id', goalId)
    .eq('user_id', user.id);

  if (error) {
    throw error;
  }
}

export async function getGoalComments(publicGoalId: string): Promise<GoalComment[]> {
  const { data: comments, error: commentsError } = await supabase
    .from('goal_comments')
    .select('*')
    .eq('public_goal_id', publicGoalId)
    .order('created_at', { ascending: true });

  if (commentsError) {
    throw commentsError;
  }

  if (!comments || comments.length === 0) {
    return [];
  }

  // Get user profiles for the comments
  const userIds = [...new Set(comments.map(c => c.user_id))];
  const { data: profilesData, error: profilesError } = await supabase
    .from('profiles')
    .select('user_id, username')
    .in('user_id', userIds);

  if (profilesError) {
    console.error('Error fetching profiles for comments:', profilesError);
    // Return comments without user data if profiles fetch fails
    return comments.map(comment => ({
      ...comment,
      user: { username: 'Unknown User' }
    }));
  }

  const profilesMap = new Map(profilesData?.map(p => [p.user_id, p]));

  // Combine comments with user data
  return comments.map(comment => ({
    ...comment,
    user: profilesMap.get(comment.user_id) || { username: 'Unknown User' }
  }));
}

export async function createComment(commentData: CreateCommentData): Promise<GoalComment> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('No authenticated user found');
  }

  const { data, error } = await supabase
    .from('goal_comments')
    .insert([{
      ...commentData,
      user_id: user.id
    }])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteComment(commentId: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('No authenticated user found');
  }

  const { error } = await supabase
    .from('goal_comments')
    .delete()
    .eq('id', commentId)
    .eq('user_id', user.id);

  if (error) {
    throw error;
  }
}

export async function likeGoal(publicGoalId: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('No authenticated user found');
  }

  const { error } = await supabase
    .from('goal_likes')
    .insert([{ 
      public_goal_id: publicGoalId,
      user_id: user.id
    }]);

  if (error) {
    throw error;
  }
}

export async function unlikeGoal(publicGoalId: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('No authenticated user found');
  }

  const { error } = await supabase
    .from('goal_likes')
    .delete()
    .eq('public_goal_id', publicGoalId)
    .eq('user_id', user.id);

  if (error) {
    throw error;
  }
}

export async function checkIfUserIsPro(): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return false;
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('is_pro')
    .eq('user_id', user.id)
    .single();

  if (error || !data) {
    console.error('Error checking pro status:', error);
    return false;
  }

  return data.is_pro;
} 