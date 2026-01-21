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

Navigation state is derived from React Router's `useLocation()` hook in `Navbar.tsx`.

### Data
- `metadata.json` - Contains name and description metadata (currently minimal)
- No database or API integration
- Content is likely hardcoded in components or can be added to metadata.json

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
4. **Animations** - Framer Motion is used for Navbar mobile menu. Refer to `Navbar.tsx:63-67` for spring animation patterns.
5. **Icons** - lucide-react icons are available. See `Navbar.tsx:25` for usage example.
6. **No state management library** - Components manage their own state with `useState`. Use React context if global state is needed.
