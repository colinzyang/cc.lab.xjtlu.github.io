# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CC Lab is a research lab website for Structural Bioinformatics & Molecular Dynamics built with React, TypeScript, and Vite. It's hosted on GitHub Pages and uses hash-based routing (HashRouter) to work without a backend server. Content is managed through Decap CMS, allowing non-technical users to edit data without modifying code.

## Commands

### Development
- `npm run dev` - Start development server (Vite dev server on http://localhost:5173)
- `npm run build` - Build for production (outputs to `dist/` directory)
- `npm run preview` - Preview production build locally

**Requirements:** Node.js v18 or higher.

**Note:** There are no separate test, lint, or format commands. Type checking is integrated into the build process.

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
│       ├── dataLoader.ts # Data fetching & type definitions
│       └── utils/
│           └── bibtexParser.ts # BibTeX parsing utilities
├── public/
│   ├── data/             # JSON data files (managed by Decap CMS)
│   ├── admin/            # Decap CMS configuration & interface
│   │   ├── config.yml    # CMS collection definitions
│   │   ├── index.html    # CMS entry point
│   │   └── bibtex-widget.js # Custom BibTeX import widget
│   └── assets/images/    # Team photos, paper thumbnails, etc.
├── src/index.css         # Tailwind CSS v4 theme configuration
├── App.tsx               # Main app component & routing
├── index.tsx             # React entry point
├── index.html            # HTML template
├── vite.config.ts        # Vite configuration
├── postcss.config.js     # PostCSS configuration (Tailwind CSS v4)
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

**Important:** Always use hash-based links when adding new routes. The base is set to `/` in `vite.config.ts`. For GitHub Pages deployment to a subdirectory (e.g., `/repo-name/`), change `base` to match the repository name.

### Layout Structure

The main layout is defined in `App.tsx`:
1. **Navbar** (`components/Navbar.tsx`) - Sticky header with mobile menu using Framer Motion animations
2. **Main content area** - Centered max-width container with responsive padding
3. **Footer** (`components/Footer.tsx`) - Bottom of page

All pages follow this layout structure. A `ScrollToTop` component automatically scrolls to the top when routes change.

### Styling

- **Tailwind CSS v4** - Uses PostCSS pipeline (`postcss.config.js`) with `@tailwindcss/postcss` plugin
- **Theme configuration** in `src/index.css` using `@theme` directive:
  - Primary color: `--color-primary: #004a99`
  - Background colors: `--color-background-light/dark`
  - Font: Inter (from Google Fonts)
  - Custom font size: `huge` (6.5rem) for large headings
- **Dark mode** - Class-based dark mode using `dark:` prefix (set `class="dark"` on `<html>`)
- **Usage**: Apply Tailwind classes directly in JSX (e.g., `bg-primary`, `text-slate-900 dark:text-white`)

When adding custom theme values, edit `src/index.css` within the `@theme` block.

### Component Organization

All page components are in the `components/` directory. Most are full-page components (Member, Publication, News, Contact, Resources, Home). Sub-components include:
- `Hero.tsx` - Landing section on home page
- `RecentPosts.tsx` - Recent posts section on home page
- `Team.tsx` - Team section component (used on home page)
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

**Publication data structure:** Publications are stored as an array of year groups, each containing a `year` and `papers` array:
```typescript
// publications.json structure
{
  "publications": [
    {
      "year": 2024,
      "papers": [
        {
          "id": 1,
          "title": "Paper Title",
          "journal": "Journal Name",
          "date": "Jan 2024",
          "year": 2024,
          "authors": "Author A, Author B",
          "link": "https://doi.org/10.xxxx",
          "doi": "10.xxxx/xxx",
          "image": "/assets/images/papers/paper1.jpg",
          "bibtexKey": "author2024paper",
          "preprint_url": "https://arxiv.org/abs/xxxx",
          "preprint_label": "arXiv"
        }
      ]
    }
  ]
}
```

**Data loading:** `src/lib/dataLoader.ts` provides:
- Type definitions for all data types (Member, Publication, NewsItem, ContactInfo, LabInfo)
- Async loader functions: `loadMembers()`, `loadPublications()`, `loadNews()`, `loadLabInfo()`
- Built-in caching to avoid redundant fetches
- `preloadAllData()` called on app startup in `App.tsx`

**BibTeX parsing utility:** `src/lib/utils/bibtexParser.ts` provides:
- `parseBibtexString(bibtex, startId)` - Parse BibTeX string into publication objects
- `convertAuthorFormat(authors)` - Convert BibTeX author format to display format
- `isDuplicate(pub, existingPubs)` - Check for duplicates by DOI or title
- `ParsedPublication` and `ParseResult` types for type-safe parsing

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

**Publication interface:** The `Publication` type in `dataLoader.ts` includes optional fields for preprints:
```typescript
interface Publication {
  id: number;
  title: string;
  journal: string;
  date: string;
  year: number;
  authors: string;
  link: string;
  doi?: string;
  preprint_url?: string;    // e.g., https://arxiv.org/abs/xxxx
  preprint_label?: string;  // e.g., "arXiv", "bioRxiv"
  image?: string;
  bibtexKey?: string;       // BibTeX citation key
}
```

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
- `lucide-react` - Icon library (primary UI icons)
- `tailwindcss` v4 & `@tailwindcss/postcss` - Styling via PostCSS pipeline
- `typescript` - Type safety
- `vite` - Build tool and dev server
- `@vitejs/plugin-react` - React support in Vite
- `@orcid/bibtex-parse-js` - BibTeX parsing library for publication imports

Icon libraries:
- `lucide-react` - Primary icon library (import as needed)
- Material Symbols - Secondary icons loaded via Google Fonts CDN in `index.html`

No additional runtime dependencies for state management, HTTP, or CSS-in-JS. This keeps the bundle small.

## Deployment

### Current Setup (GitHub Pages with GitHub Actions)

The site is deployed automatically to GitHub Pages using GitHub Actions. Configuration:
- **Base URL:** `/` (root path) - configured in `vite.config.ts:7`
- **Build output:** `dist/` directory - configured in `vite.config.ts:8-11`
- **Routing:** HashRouter enables client-side routing without backend requirements
- **No sourcemaps:** `sourcemap: false` in production for smaller bundle size

### GitHub Actions Workflow

**File:** `.github/workflows/deploy.yml`

The deployment workflow is triggered automatically on every push to the `main` branch:

1. **Checkout** - Clones the repository code
2. **Setup Node.js** - Installs Node.js v18 with npm dependency caching
3. **Install dependencies** - Runs `npm install`
4. **Build** - Runs `npm run build` to generate the `dist/` directory
5. **Deploy** - Pushes the built site to GitHub Pages using `peaceiris/actions-gh-pages@v3`

**Key points:**
- The workflow publishes from the `dist/` directory
- GitHub token authentication is automatic (uses `${{ secrets.GITHUB_TOKEN }}`)
- Deployment URL is set in the GitHub Pages environment
- npm dependencies are cached for faster builds
- A custom domain CNAME entry is commented out (uncomment if using a custom domain)

**To deploy:** Simply push commits to the `main` branch. The workflow runs automatically.

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

### Custom CMS Widgets

**BibTeX Import Widget** (`public/admin/bibtex-widget.js`)

A custom Decap CMS widget that enables batch importing of BibTeX entries into the publications collection.

**Features:**
- Parse multiple BibTeX entries at once
- Automatic author name format conversion (BibTeX "Last, First" → "First Last")
- DOI-based link generation
- Preprint detection (arXiv, bioRxiv, ChemRxiv)
- Duplicate detection (by DOI or normalized title)
- Edit/delete existing publications directly in CMS

**How it works:**
1. Access the CMS at `/admin/`
2. Navigate to Publications collection
3. Paste BibTeX entries into the import textarea
4. Click "Parse BibTeX" to preview entries
5. Edit parsed entries if needed, then click "Add to Publications"

**Supporting utility:** `src/lib/utils/bibtexParser.ts` provides TypeScript functions for BibTeX parsing (used in the widget and available for programmatic imports).

### Manual Data Editing

If you prefer to bypass the CMS:
- Edit JSON files in `public/data/` directly
- Data loading is automatic; no need to restart the dev server
- Changes are fetched dynamically by components

## Key Development Notes

1. **TypeScript is strict** - All files use strict type checking. Ensure proper typing for new components.
2. **Tailwind CSS v4** - Theme customization goes in `src/index.css` using `@theme {}` directive, not a separate config file.
3. **Dark mode** - Use `dark:` Tailwind classes. The `<html>` element toggles between `class="light"` and `class="dark"`.
4. **Mobile responsive** - The Navbar has a mobile menu. Test at breakpoints (md: 768px, etc.).
5. **Animations** - Framer Motion is used for Navbar mobile menu and page transitions.
6. **Icons** - Use `lucide-react` for most UI icons. Material Symbols are also available via `<span class="material-symbols-outlined">icon_name</span>`.
7. **Context for breadcrumbs** - All page-level components should use `useBreadcrumb()` to set breadcrumbs on mount. Home page sets empty array to hide breadcrumbs.
8. **Dynamic data loading** - Components must fetch data from JSON via `src/lib/dataLoader.ts`. Never import static data files directly.
9. **Data caching** - The dataLoader automatically caches fetched data. For development, hard-refresh the browser to see JSON changes.
10. **Decap CMS** - Non-technical users should use `/admin/` for content updates. Developers can edit JSON files directly for quick testing.

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

