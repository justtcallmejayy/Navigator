# Film Theory Navigator

Film Theory Navigator is a React + TypeScript web app for browsing, searching, and studying curated film theory content.

It includes:
- a searchable theory library
- theory detail pages with key concepts, thinkers, films, and citations
- vocabulary exploration
- admin route scaffolding for future content management workflows

## Table of Contents

1. [Project Overview](#project-overview)
2. [Current Features](#current-features)
3. [Tech Stack](#tech-stack)
4. [Architecture Snapshot](#architecture-snapshot)
5. [Routes](#routes)
6. [Getting Started](#getting-started)
7. [Environment Variables](#environment-variables)
8. [Scripts](#scripts)
9. [Data Publishing Workflow](#data-publishing-workflow)
10. [Documentation Index](#documentation-index)
11. [Known Limitations](#known-limitations)
12. [Contributing](#contributing)

## Project Overview

The app is designed for both learning and future growth:
- end users can discover and study theories quickly
- instructors and researchers can use citation-aware theory pages
- maintainers can evolve data and content through Supabase-backed workflows

## Current Features

- Browse published theories in a card-based library view.
- Search theories by keyword with debounced input.
- Filter theories by category.
- Open dedicated theory detail routes by slug.
- View representative films and citation metadata when available.
- Access vocabulary and admin entry routes (UI present, expanded capabilities in progress).

## Tech Stack

- React 19
- TypeScript 5
- Vite 7
- React Router 7
- TanStack Query 5
- Supabase JavaScript client 2
- Sass (SCSS modules)
- ESLint + Prettier

## Architecture Snapshot

```text
src/
  app/
    queryClient.ts
    router.tsx
  components/
    common/
    layout/
    theory/
    ui/
  data/
    raw_data.json
  hooks/
  lib/
    queries/
    supabase/
  pages/
  scripts/
    publish_data.ts
  styles/
  types/
  utils/
```

## Routes

- /: Home
- /theory: Theory Library
- /theory/:slug: Theory Detail
- /vocabulary: Vocabulary Hub
- /admin/login: Admin Login
- /admin: Admin Dashboard

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create a local .env file

Create a .env file in the project root and add the required values from your Supabase project.

### 3. Start development server

```bash
npm run dev
```

Default local URL:

```text
http://localhost:5173
```

## Environment Variables

Required for the web app:

```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Also required for the publish script:

```bash
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

Notes:
- VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are used by the browser client.
- SUPABASE_SERVICE_ROLE_KEY is only for trusted server-side/data publishing tasks.
- Never expose service role keys in client code or public environments.

## Scripts

- npm run dev: Start local development server
- npm run build: Type-check and build production bundle
- npm run preview: Preview production build locally
- npm run lint: Run ESLint

## Data Publishing Workflow

Film theory data can be synced from source JSON into Supabase using:

```bash
npx tsx src/scripts/publish_data.ts
```

What the script currently processes:
- theories
- vocabulary terms
- films
- theorists
- citations

The script is designed to be re-runnable with upserts for idempotent sync behavior.

If you are extending schema objects, review and apply migration files in the migrations folder first.

## Documentation Index

- [User Guide](docs/USER_GUIDE.md)
- [Documentation Framework](docs/DOCUMENTATION_FRAMEWORK.md)
- [Changelog](docs/CHANGELOG.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Content Management](docs/CONTENT_MANAGEMENT.md)
- [Team Workflow](docs/TEAM_WORKFLOW.md)
- [Technical Debt](docs/TECHNICAL_DEBT.md)
- [Git Strategy](docs/GIT_STRATEGY.md)

## Known Limitations

- Some routes are scaffolds and will expand over subsequent iterations.
- Data richness varies by theory entry (not all entries have full film/citation coverage yet).
- Large production bundle warning may appear during build; this is currently non-blocking.

## Contributing

Before opening a PR:

1. Create a branch using the team branch strategy.
2. Run lint and build locally.
3. Update relevant docs when behavior or workflow changes.
4. Keep commits scoped and descriptive.

Suggested local validation:

```bash
npm run build
npm run dev
```
