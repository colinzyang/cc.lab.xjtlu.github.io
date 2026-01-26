# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CC Lab is a research lab website for Structural Bioinformatics & Molecular Dynamics built with React, TypeScript, and Vite. It's hosted on GitHub Pages and uses hash-based routing (HashRouter) to work without a backend server. Content is managed through Decap CMS, allowing non-technical users to edit data without modifying code.

## Commands

### Development
- `npm run dev` - Start development server (Vite dev server on http://localhost:5173)
- `npm run build` - Build for production (outputs to `dist/` directory)
- `npm run preview` - Preview production build locally

### Type Checking
TypeScript strict mode is enabled. Type checking happens automatically during development and build. The IDE will show errors in real-time. No separate type checking command is needed—the build will fail if there are type errors.

TypeScript configuration (`tsconfig.json`):
- `strict: true` - Full strict type checking
- `noUnusedLocals: true` - Error on unused variables
- `noUnusedParameters: true` - Error on unused parameters
- `noFallthroughCasesInSwitch: true` - Error on missing switch cases

## Architecture

### Project Structure

```
.
├── components/           # Page components (Member, Publication, News, Contact, etc.)
├── src/
│   ├── context/          # React Context (BreadcrumbContext)
│   └── lib/
│       └── dataLoader.ts # Data fetching & type definitions
├── public/
│   ├── data/             # JSON data files (managed by Decap CMS)
│   ├── admin/            # Decap CMS configuration & interface
│   └── assets/images/    # Team photos, paper thumbnails, etc.
├── App.tsx               # Main app component & routing
├── index.tsx             # React entry point
├── index.html            # HTML template (Tailwind CDN config)
├── vite.config.ts        # Vite configuration
└── tsconfig.json         # TypeScript configuration
```

### Routing

The app uses **React Router v6 with HashRouter** (`App.tsx:2`). This is essential for GitHub Pages deployment since it's a static host and doesn't support client-side routing natively.

Routes defined in `App.tsx`:
- `/` - Home (Hero + RecentPosts)
- `/member` - Members page
- `/publication` - Publications page
- `/resources` - Resources page
- `/news` - News page
- `/contact` - Contact page
- `*` - Catch-all redirects to home

**Important:** Always use hash-based links when adding new routes. The base is set to `./` in `vite.config.ts` for relative path handling on GitHub Pages.

### Layout Structure

The main layout is defined in `App.tsx`:
1. **Navbar** (`components/Navbar.tsx`) - Sticky header with mobile menu using Framer Motion animations
2. **Main content area** - Centered max-width container with responsive padding
3. **Footer** (`components/Footer.tsx`) - Bottom of page

All pages follow this layout structure. A `ScrollToTop` component automatically scrolls to the top when routes change.

### Styling

- **Tailwind CSS** - Loaded via CDN in `index.html` (not a PostCSS pipeline)
- **Custom Tailwind config** defined in `index.html:12-30`:
  - Primary color: `#004a99` (used for links, highlights)
  - Background light: `#FFFFFF`
  - Background dark: `#0f1923`
  - Font: Inter (from Google Fonts)
  - Custom font size: `huge` for large headings
- **Dark mode** - Class-based dark mode support using `dark:` prefix
- **No CSS files** - All styling via Tailwind utility classes (no `.css` files in the repo)

When adding styles, use Tailwind classes directly in JSX. To support dark mode, use `dark:` variants (e.g., `bg-white dark:bg-background-dark`).

### Component Organization

All page components are in the `components/` directory. Most are full-page components (Member, Publication, News, Contact, Resources, Home). Sub-components include:
- `Hero.tsx` - Landing section on home page
- `RecentPosts.tsx` - Recent posts section on home page
- `Breadcrumb.tsx` - Breadcrumb navigation (context-driven)
- `Navbar.tsx` - Header with navigation and mobile menu
- `Footer.tsx` - Footer

Navigation state is derived from React Router's `useLocation()` hook in `Navbar.tsx`.

### Data Management with Decap CMS

**Data source:** JSON files in `public/data/` (not a traditional database)
- `public/data/members.json` - Lab members (PI, current members, alumni)
- `public/data/publications.json` - Research publications grouped by year
- `public/data/news.json` - News and events
- `public/data/labInfo.json` - Lab contact information and metadata

**Data loading:** `src/lib/dataLoader.ts` provides:
- Type definitions for all data types (Member, Publication, NewsItem, ContactInfo, LabInfo)
- Async loader functions: `loadMembers()`, `loadPublications()`, `loadNews()`, `loadLabInfo()`
- Built-in caching to avoid redundant fetches
- `preloadAllData()` called on app startup in `App.tsx`

**Component pattern for data fetching:**
```typescript
import { useEffect, useState } from 'react';
import { loadMembers, Member } from '../src/lib/dataLoader';

export const MyComponent: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMembers().then(data => {
      setMembers(data.MEMBERS);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;
  return <div>{/* render members */}</div>;
};
```

**Development tip:** Data caching means hard-refreshing the browser (Cmd+Shift+R or Ctrl+Shift+R) is needed to see JSON file changes during development.

### Context System

**BreadcrumbContext** (`src/context/BreadcrumbContext.tsx`):
- Manages global breadcrumb state for page navigation
- Pages set breadcrumbs via `setBreadcrumbs()` in a `useEffect` hook
- Home page sets empty array to hide breadcrumbs
- Breadcrumb display is in `App.tsx` (conditionally rendered when `items.length > 0`)

**Usage pattern:**
```typescript
const { setBreadcrumbs } = useBreadcrumb();
useEffect(() => {
  setBreadcrumbs([{ label: 'Page Name' }]);
}, [setBreadcrumbs]);
```

### Dependencies

Core libraries:
- `react` & `react-dom` - UI framework
- `react-router-dom` - Client-side routing with HashRouter
- `framer-motion` - Animation library (used for Navbar mobile menu and component transitions)
- `lucide-react` - Icon library (used throughout for UI icons)
- `typescript` - Type safety
- `vite` - Build tool and dev server
- `@vitejs/plugin-react` - React support in Vite

No additional runtime dependencies for state management, HTTP, or CSS-in-JS. This keeps the bundle small.

## Deployment

### Current Setup (Netlify)

The site is deployed to Netlify with the following configuration:
- **Base URL:** `/` (root path) - configured in `vite.config.ts:7`
- **Build output:** `dist/` directory - configured in `vite.config.ts:8-11`
- **Routing:** HashRouter enables client-side routing without backend requirements
- **No sourcemaps:** `sourcemap: false` in production for smaller bundle size

Netlify automatically builds and deploys on push to the main branch. The build command runs `npm run build`, which outputs to `dist/`.

### GitHub Pages Alternative

For GitHub Pages deployment, change `base` in `vite.config.ts:7` to `'/repository-name/'` (adjust for your repository). HashRouter will continue to work since it's a static host.

## Content Management System (Decap CMS)

Decap CMS provides a visual interface for managing site content without writing code.

### Accessing the CMS

**Development (Local Testing):**
```bash
npm run dev
# Open: http://localhost:5173/admin/
# Decap will use the local "test-repo" backend (edit config.yml to enable)
```

**Production (Live Site):**
- Access: `https://your-domain.com/admin/`
- Requires GitHub authentication (via Netlify Identity if deployed on Netlify)
- All changes are auto-committed to the repository

### CMS Configuration

- **Config file:** `public/admin/config.yml` - Defines backend, collections, and fields
- **Interface:** `public/admin/index.html` - Loads Decap CMS from CDN and Netlify Identity widget

### CMS Collections

1. **Members** - Add/edit team members (PI, current members, alumni)
2. **Publications** - Manage research papers grouped by year
3. **News** - Create news and event entries
4. **Lab Info** - Update contact information and lab description

### Manual Data Editing

If you prefer to bypass the CMS:
- Edit JSON files in `public/data/` directly
- Data loading is automatic; no need to restart the dev server
- Changes are fetched dynamically by components

## Key Development Notes

1. **TypeScript is strict** - All files use strict type checking. Ensure proper typing for new components.
2. **Dark mode is integrated** - Use `dark:` Tailwind classes for dark mode support. Always test both light and dark themes.
3. **Mobile responsive** - The Navbar has a mobile menu. Test at breakpoints (md: 768px, etc.).
4. **Animations** - Framer Motion is used for Navbar mobile menu and page transitions. See `Navbar.tsx:63-67` for spring animation patterns.
5. **Icons** - lucide-react icons are available. See `Navbar.tsx:25` for usage example.
6. **Context for breadcrumbs** - All page-level components should use `useBreadcrumb()` to set breadcrumbs on mount. Home page sets empty array to hide breadcrumbs.
7. **Dynamic data loading** - Components must fetch data from JSON via `src/lib/dataLoader.ts`. Never import static data files directly.
8. **Data caching** - The dataLoader automatically caches fetched data. For development, hard-refresh the browser to see JSON changes.
9. **Decap CMS** - Non-technical users should use `/admin/` for content updates. Developers can edit JSON files directly for quick testing.

## Image Management

### Standard Image Directories

All images are stored in `public/assets/images/`:
- `public/assets/images/people/` - Team member photos (400x400px recommended)
- `public/assets/images/papers/` - Research paper thumbnails (500x300px recommended)
- `public/assets/images/posts/` - News and blog post images (800x600px or wider)

### Image Naming Conventions

- **People photos**: `bio-lastname.jpg` (e.g., `bio-chan.jpg`)
- **Paper thumbnails**: `paperX.jpg` (e.g., `paper1.jpg`, `paper2.jpg`)
- **Post images**: `descriptive-name.jpg`

### Image URL Format

Use absolute paths starting with `/assets/`:
```typescript
image: '/assets/images/people/bio-chan.jpg'
// Renders as: /assets/images/people/bio-chan.jpg
```

### Image Optimization

- **Format:** JPG for photos (85% quality for web)
- **File size:** Keep under 500KB
- **Dimensions:**
  - People photos: 400x400px (square)
  - Paper thumbnails: 500x300px
  - Post images: 800x600px or wider

