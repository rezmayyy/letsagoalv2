# Environment Setup for Supabase and Stripe

Create a `.env.local` file in your project root with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

## How to get Supabase values:

1. Go to your Supabase project dashboard
2. Click on "Settings" in the left sidebar
3. Click on "API"
4. Copy the "Project URL" and "anon public" key
5. Paste them in your `.env.local` file

## How to get Stripe values:

1. Go to your Stripe dashboard
2. Click on "Developers" in the left sidebar
3. Click on "API keys"
4. Copy the "Publishable key" and "Secret key"
5. Paste them in your `.env.local` file

## Example:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
STRIPE_SECRET_KEY=sk_test_51ABC123...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51ABC123...
```

## Important Notes:
- Use test keys for development
- Never commit your `.env.local` file to git
- The `STRIPE_SECRET_KEY` should only be used on the server side
- The `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is safe to use in the browser 