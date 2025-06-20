# Environment Setup for Supabase

Create a `.env.local` file in your project root with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## How to get these values:

1. Go to your Supabase project dashboard
2. Click on "Settings" in the left sidebar
3. Click on "API"
4. Copy the "Project URL" and "anon public" key
5. Paste them in your `.env.local` file

## Example:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
``` 