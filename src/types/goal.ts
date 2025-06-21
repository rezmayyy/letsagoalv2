export interface Goal {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  status: 'in_progress' | 'completed' | 'active';
  deadline?: string;
  created_at: string;
  updated_at: string;
  shared_at?: string;
}

export interface PublicGoal {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  status: 'in_progress' | 'completed' | 'active';
  deadline?: string;
  likes_count: number;
  comments_count: number;
  created_at: string;
  updated_at: string;
  shared_at: string;
  // Joined data
  user?: {
    username: string;
  };
  is_liked?: boolean;
}

export interface GoalComment {
  id: string;
  public_goal_id: string;
  user_id: string;
  content: string;
  created_at: string;
  // Joined data
  user?: {
    username: string;
  };
}

export interface GoalLike {
  id: string;
  public_goal_id: string;
  user_id: string;
  created_at: string;
}

export interface CreateGoalData {
  title: string;
  description?: string;
  deadline?: string;
}

export interface UpdateGoalData {
  title?: string;
  description?: string;
  status?: 'in_progress' | 'completed' | 'active';
  deadline?: string;
}

export interface CreateCommentData {
  public_goal_id: string;
  content: string;
} 