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