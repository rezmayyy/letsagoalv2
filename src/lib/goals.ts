import { supabase } from '../../lib/supabase';
import { Goal, CreateGoalData, UpdateGoalData } from '../types/goal';

export async function getGoals(): Promise<Goal[]> {
  const { data, error } = await supabase
    .from('goals')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Error fetching goals: ${error.message}`);
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
    throw new Error(`Error creating goal: ${error.message}`);
  }

  return data;
}

export async function updateGoal(id: string, updates: UpdateGoalData): Promise<Goal> {
  const { data, error } = await supabase
    .from('goals')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Error updating goal: ${error.message}`);
  }

  return data;
}

export async function deleteGoal(id: string): Promise<void> {
  const { error } = await supabase
    .from('goals')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`Error deleting goal: ${error.message}`);
  }
}

export async function toggleGoalStatus(id: string, currentStatus: string): Promise<Goal> {
  const newStatus = currentStatus === 'active' ? 'completed' : 'active';
  return updateGoal(id, { status: newStatus as 'active' | 'completed' });
} 