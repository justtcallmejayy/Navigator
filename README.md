# Film Theory Navigator

Film Theory Navigator is a React app for browsing and studying published film theory entries.
It provides a searchable theory library, per-theory detail pages, and scaffolding for admin and vocabulary workflows.

## Features

- Browse a curated library of published theories.
- Search by title with debounced input.
- Filter theories by category.
- Open a detailed view for each theory by slug.
- Navigate through dedicated routes for Home, Theory Library, Vocabulary, and Admin placeholders.

## Tech Stack

- React 19 + TypeScript
- Vite 7
- React Router 7
- TanStack Query 5
- Supabase JavaScript client 2
- Tailwind CSS 3
- ESLint + Prettier

## Project Structure

```text
src/
  app/
    layout/
    queryClient.ts
    router.tsx
  components/
    common/
    theory/
    ui/
  hooks/
  lib/
    queries/
    supabase/
  pages/
  styles/
  types/
  utils/
```

## Routes

- `/` Home screen
- `/theory` Theory Library
- `/theory/:slug` Theory Detail
- `/vocabulary` Vocabulary Hub (placeholder)
- `/admin/login` Admin Login (placeholder)
- `/admin` Admin Dashboard (placeholder)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Then set:

```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Run the app

```bash
npm run dev
```

The app starts on the Vite dev server (typically `http://localhost:5173`).

## Available Scripts

- `npm run dev` Start local development server.
- `npm run build` Type-check and build for production.
- `npm run preview` Preview the production build locally.
- `npm run lint` Run ESLint.

## Data Model (Theory)

The app expects a `theories` table in Supabase with fields used by the UI, including:

- `id`, `title`, `slug`, `category`
- `overview`, `history`
- `key_points`, `key_thinkers`, `representative_films`, `citations`
- `status` (`draft` or `published`)
- `created_at`, `updated_at`

The public library currently reads rows where `status = published`.

## Notes

- Admin and vocabulary screens are currently placeholders.
- Supabase Row Level Security and policies are documented in `src/lib/supabase/policies.md`.
