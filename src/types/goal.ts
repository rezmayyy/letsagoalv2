export interface Goal {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  deadline?: string;
  status: 'active' | 'completed' | 'cancelled';
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateGoalData {
  title: string;
  description?: string;
  deadline?: string;
}

export interface UpdateGoalData {
  title?: string;
  description?: string;
  deadline?: string;
  status?: 'active' | 'completed' | 'cancelled';
  is_public?: boolean;
} 