# Supabase Database Setup Guide

## Step 1: Create the Profiles Table

1. Go to your Supabase project dashboard
2. Click on **"Table Editor"** in the left sidebar
3. Click **"New Table"**
4. Fill in the details:

**Table Name**: `profiles`

**Columns**:
- `id` 
  - Type: `uuid`
  - Primary Key: ✅
  - References: `auth.users.id`
  - Default Value: (leave empty)

- `display_name`
  - Type: `text`
  - Nullable: ✅
  - Default Value: (leave empty)

- `is_pro`
  - Type: `boolean`
  - Nullable: ❌
  - Default Value: `false`

- `created_at`
  - Type: `timestamp with time zone`
  - Nullable: ❌
  - Default Value: `now()`

## Step 2: Enable Row Level Security (RLS)

1. In the Table Editor, click on your `profiles` table
2. Click the **"RLS"** tab
3. Toggle **"Enable Row Level Security"** to ON

## Step 3: Create RLS Policies

Click **"New Policy"** and create these three policies:

### Policy 1: Users can view own profile
- **Policy Name**: `Users can view own profile`
- **Operation**: `SELECT`
- **Using expression**: `auth.uid() = id`

### Policy 2: Users can update own profile
- **Policy Name**: `Users can update own profile`
- **Operation**: `UPDATE`
- **Using expression**: `auth.uid() = id`

### Policy 3: Users can insert own profile
- **Policy Name**: `Users can insert own profile`
- **Operation**: `INSERT`
- **With check expression**: `auth.uid() = id`

## Step 4: Create the Trigger

1. Go to **"SQL Editor"** in the left sidebar
2. Click **"New Query"**
3. Paste this SQL and click **"Run"**:

```sql
-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, is_pro)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'display_name', FALSE);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call function on new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## Step 5: Test the Setup

1. Go to **"Authentication"** → **"Users"**
2. Click **"Add User"** to create a test user
3. Go to **"Table Editor"** → **"profiles"** table
4. You should see a new profile record automatically created

## What This Setup Does:

- **Profiles table**: Stores user profile data
- **RLS**: Ensures users can only access their own data
- **Trigger**: Automatically creates a profile when a user signs up
- **Pro feature gating**: `is_pro` field controls access to premium features

## Next Steps:

After completing this setup, you can:
1. Add authentication components to your app
2. Query user data from your components
3. Implement Pro feature gating
4. Add goal tracking functionality 

# Supabase Setup for LetsAGoal

## Database Schema

### 1. Enable Row Level Security (RLS)
```sql
-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE goal_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE goal_likes ENABLE ROW LEVEL SECURITY;
```

### 2. Profiles Table
```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  is_pro BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can view profiles of users with shared goals" ON profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM goals 
      WHERE goals.user_id = profiles.id 
      AND goals.shared_at IS NOT NULL
    )
  );

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
```

### 3. Goals Table
```sql
-- Create goals table
CREATE TABLE goals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed')),
  shared_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies for goals
CREATE POLICY "Users can view their own goals" ON goals
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view shared goals" ON goals
  FOR SELECT USING (shared_at IS NOT NULL);

CREATE POLICY "Users can insert their own goals" ON goals
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own goals" ON goals
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own goals" ON goals
  FOR DELETE USING (auth.uid() = user_id);

-- Policy to restrict sharing goals to Pro users only
CREATE POLICY "Only Pro users can share goals" ON goals
  FOR UPDATE USING (
    auth.uid() = user_id AND 
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() AND profiles.is_pro = true
    )
  );
```

### 4. Goal Comments Table
```sql
-- Create goal_comments table
CREATE TABLE goal_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  public_goal_id UUID REFERENCES goals(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies for goal_comments
CREATE POLICY "Anyone can view comments on shared goals" ON goal_comments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM goals 
      WHERE goals.id = goal_comments.public_goal_id 
      AND goals.shared_at IS NOT NULL
    )
  );

CREATE POLICY "Authenticated users can comment on shared goals" ON goal_comments
  FOR INSERT WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM goals 
      WHERE goals.id = goal_comments.public_goal_id 
      AND goals.shared_at IS NOT NULL
    )
  );

CREATE POLICY "Users can delete their own comments" ON goal_comments
  FOR DELETE USING (auth.uid() = user_id);
```

### 5. Goal Likes Table
```sql
-- Create goal_likes table
CREATE TABLE goal_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  public_goal_id UUID REFERENCES goals(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(public_goal_id, user_id)
);

-- RLS Policies for goal_likes
CREATE POLICY "Anyone can view likes on shared goals" ON goal_likes
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM goals 
      WHERE goals.id = goal_likes.public_goal_id 
      AND goals.shared_at IS NOT NULL
    )
  );

CREATE POLICY "Authenticated users can like shared goals" ON goal_likes
  FOR INSERT WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM goals 
      WHERE goals.id = goal_likes.public_goal_id 
      AND goals.shared_at IS NOT NULL
    )
  );

CREATE POLICY "Users can unlike goals they liked" ON goal_likes
  FOR DELETE USING (auth.uid() = user_id);
```

## Triggers and Functions

### 1. Profile Creation Trigger
```sql
-- Function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### 2. Updated At Trigger
```sql
-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for profiles table
CREATE TRIGGER handle_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Trigger for goals table
CREATE TRIGGER handle_goals_updated_at
  BEFORE UPDATE ON goals
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
```

## Environment Variables

Add these to your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Key Changes Made

1. **Pro Sharing Restriction**: Only Pro users can share their goals to the GoalBoard
2. **Open Community**: All authenticated users can comment and like shared goals
3. **Better User Experience**: Free users can participate in the community without restrictions
4. **Clear Value Proposition**: Pro upgrade is focused on sharing your own goals, not participating

## Usage

1. Run the SQL commands in your Supabase SQL editor
2. Update your environment variables
3. The GoalBoard will now allow all users to comment and like, but only Pro users can share their goals 