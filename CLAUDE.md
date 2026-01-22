# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CC Lab is a research lab website for Structural Bioinformatics & Molecular Dynamics built with React, TypeScript, and Vite. It's hosted on GitHub Pages and uses hash-based routing (HashRouter) to work without a backend server.

## Commands

### Development
- `npm run dev` - Start development server (Vite dev server)
- `npm run build` - Build for production (outputs to `dist/` directory)
- `npm run preview` - Preview production build locally

### Linting and Type Checking
TypeScript strict mode is enabled in `tsconfig.json` with:
- `strict: true` - Full strict type checking
- `noUnusedLocals: true` - Error on unused variables
- `noUnusedParameters: true` - Error on unused parameters
- `noFallthroughCasesInSwitch: true` - Error on missing switch cases

Run type checking with your IDE or build process. No separate lint/test commands are currently configured.

## Architecture

### Routing
The app uses **React Router v6 with HashRouter** (`App.tsx:2`). This is essential for GitHub Pages deployment since it's a static host.

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
The main layout is defined in `App.tsx` with:
1. **Navbar** - Sticky header with mobile menu using Framer Motion animations
2. **Main content area** - Centered max-width container with responsive padding
3. **Footer** - Bottom of page

All pages follow this layout structure. A `ScrollToTop` component automatically scrolls to top on route changes.

### Styling
- **Tailwind CSS** - Loaded via CDN in `index.html` with custom config (not PostCSS)
- **Custom Tailwind config** in `index.html:12-30`:
  - Primary color: `#004a99`
  - Background light: `#FFFFFF`
  - Background dark: `#0f1923`
  - Font: Inter (Google Fonts)
  - Custom font size: `huge` for large headings
- **Dark mode** - Class-based dark mode support with `dark:` prefix
- **No CSS files** - All styling via Tailwind utility classes

### Component Organization
All components are in the `components/` directory. Most are page-level components, except:
- `Hero.tsx` - Landing section on home page
- `RecentPosts.tsx` - Recent posts section on home page
- `Breadcrumb.tsx` - Breadcrumb navigation component (context-driven)

Navigation state is derived from React Router's `useLocation()` hook in `Navbar.tsx`.

### Data Management
**Centralized data structure** in `src/data/`:
- `types.ts` - TypeScript interfaces for all data types (Member, Publication, NewsItem, ContactInfo)
- `members.ts` - Lab members (PI, current members, alumni)
- `publications.ts` - Research publications grouped by year
- `news.ts` - News and events
- `labInfo.ts` - Lab contact information and metadata

**Key data types:**
- `Member` - Includes name, role, bio, social links (email, GitHub, Google Scholar, ORCID), and type (member/alumn)
- `Publication` - Includes title, journal, authors, DOI, preprint links (arXiv/bioRxiv)
- `NewsItem` - Date, title, category, excerpt
- `ContactInfo` - Email, office location, map URL

**Data usage pattern:**
```typescript
import { PI, MEMBERS } from '../src/data/members';
import { PUBLICATIONS_BY_YEAR } from '../src/data/publications';
```

### Context System
**BreadcrumbContext** (`src/context/BreadcrumbContext.tsx`):
- Global breadcrumb state management
- Pages set breadcrumbs via `setBreadcrumbs()` in `useEffect`
- Home page sets empty array to hide breadcrumbs
- Breadcrumb display is centralized in `App.tsx` (conditionally rendered when `items.length > 0`)

**Usage in pages:**
```typescript
const { setBreadcrumbs } = useBreadcrumb();
React.useEffect(() => {
  setBreadcrumbs([{ label: 'Page Name' }]);
}, [setBreadcrumbs]);
```

### Data
- `metadata.json` - Site name and description
- All content data centralized in `src/data/` directory
- No database or API integration
- Type-safe data management with TypeScript interfaces

### Dependencies
- `react` & `react-dom` - UI framework
- `react-router-dom` - Client-side routing
- `framer-motion` - Animation library (used in Navbar mobile menu)
- `lucide-react` - Icon library (Microscope icon in navbar)
- `typescript` - Type safety
- `vite` - Build tool and dev server
- `@vitejs/plugin-react` - React support in Vite

## GitHub Pages Deployment
The site is deployed to GitHub Pages with the following configuration:
- Base URL: `./` (relative paths) - configured in `vite.config.ts:7`
- Build output: `dist/` directory - configured in `vite.config.ts:8-11`
- Routing: HashRouter ensures client-side routing works on static host
- No sourcemaps in production (`sourcemap: false`)

To deploy, the `dist/` folder is pushed to the repo. See the build command above.

## Key Development Notes

1. **TypeScript is strict** - All files use strict type checking. Ensure proper typing for new components.
2. **Dark mode is integrated** - Use `dark:` Tailwind classes for dark mode support. Test both themes.
3. **Mobile responsive** - Navbar has mobile menu. Test at breakpoints (md: 768px).
4. **Animations** - Framer Motion is used for Navbar mobile menu and component transitions. Refer to `Navbar.tsx:63-67` for spring animation patterns.
5. **Icons** - lucide-react icons are available. See `Navbar.tsx:25` for usage example.
6. **Context for breadcrumbs** - All page-level components use `useBreadcrumb()` to set breadcrumbs. Home page sets empty array to hide breadcrumbs.
7. **Centralized data** - All content (members, publications, news, contact info) lives in `src/data/`. Update data there, not in components.

## Common Data Updates

### Adding a New Team Member
Edit `src/data/members.ts` and add to `MEMBERS` array:
```typescript
{
  id: 'firstname_lastname',
  name: 'Full Name, PhD',
  role: 'Position Title',
  title: 'Full Position Title',
  image: '/assets/images/people/bio-lastname.jpg',
  bio_long: 'Full biography...',
  interest: 'Research interests',
  email: 'email@xjtlu.edu.cn',
  type: 'member'
}
```

### Adding a New Publication
Edit `src/data/publications.ts` and add to appropriate year's papers array:
```typescript
{
  id: 6,
  title: 'Paper Title',
  journal: 'Journal Name',
  date: '2024 Feb',
  year: 2024,
  authors: 'Author List',
  link: 'https://doi.org/...',
  doi: '10.xxxx/xxxxx',
  preprint_url: 'https://arxiv.org/...',  // optional
  preprint_label: 'arXiv'  // optional
}
```

### Adding News/Events
Edit `src/data/news.ts` and add to `NEWS_ITEMS` array:
```typescript
{
  date: 'Month Year',
  title: 'News Title',
  category: 'Category',
  excerpt: 'Brief description'
}
```

### Updating Contact Information
Edit `src/data/labInfo.ts` and modify `CONTACT` object:
```typescript
export const CONTACT: ContactInfo = {
  email: 'email@xjtlu.edu.cn',
  office: 'Office location',
  mapUrl: 'https://maps.app.goo.gl/...'
};
```

## Image Management

### Standard Image Directories
All images are stored in `public/assets/images/`:
- `public/assets/images/people/` - Team member photos (400x400px recommended)
- `public/assets/images/papers/` - Research paper thumbnails (500x300px recommended)
- `public/assets/images/posts/` - News and blog post images

### Image Naming Conventions
- **People photos**: `bio-lastname.jpg` (e.g., `bio-chan.jpg`)
- **Paper thumbnails**: `paperX.jpg` (e.g., `paper1.jpg`, `paper2.jpg`)
- **Post images**: descriptive-name.jpg

### Image URL Format
Use absolute paths starting with `/assets/`:
```typescript
image: '/assets/images/people/bio-lastname.jpg'
// Renders as: /assets/images/people/bio-lastname.jpg
```

### Image Optimization
- JPG format for photos (85% quality for web)
- Keep file sizes under 500KB
- Recommended dimensions:
  - People photos: 400x400px (square)
  - Paper thumbnails: 500x300px
  - Post images: 800x600px or wider
