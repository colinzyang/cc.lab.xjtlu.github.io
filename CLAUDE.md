# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CC Lab is a research lab website for Structural Bioinformatics & Molecular Dynamics at XJTLU, built with React, TypeScript, and Vite. Deployed on Netlify with hash-based routing (HashRouter). Content is managed through Decap CMS at `/admin/`.

## Commands

- `npm run dev` - Start development server (http://localhost:5173)
- `npm run build` - Build for production (outputs to `dist/`)
- `npm run preview` - Preview production build locally

**Requirements:** Node.js v18+. No separate test, lint, or format commands—TypeScript strict mode catches errors at build time.

**TypeScript config** (`tsconfig.json`): `strict: true`, `noUnusedLocals: true`, `noUnusedParameters: true`, `noFallthroughCasesInSwitch: true`

## Architecture

### Routing

**React Router v6 with HashRouter** (`App.tsx:2`) - required for static hosting without server-side routing.

Routes: `/` (Home), `/member`, `/research`, `/publication`, `/resources`, `/news`, `/contact`. Catch-all redirects to home.

**Base URL:** `/` in `vite.config.ts`. For subdirectory deployment, update `base`.

### Layout

`App.tsx` wraps pages with: Navbar → Main content → Footer. `ScrollToTop` resets scroll on route change.

### Styling

**Tailwind CSS v4** via PostCSS (`postcss.config.js`). Theme in `src/index.css`:
```css
@theme {
  --color-primary: #004a99;
  --color-background-light: #ffffff;
  --color-background-dark: #0f1923;
  --font-family-sans: Inter, sans-serif;
  --font-size-huge: 6.5rem;
}
```

**Dark mode:** Class-based (`class="dark"` on `<html>`). Use `dark:` prefix in classes.

### Data Management

**Data source:** JSON files in `public/data/`:
- `members.json` - PI, members, alumni
- `publications.json` - Papers grouped by year (`{ publications: [{ year, papers: [...] }] }`)
- `news.json` - News items
- `labInfo.json` - Lab metadata and contact info

**Data loading:** `src/lib/dataLoader.ts` provides typed loaders with caching:
```typescript
const [members, setMembers] = useState<Member[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  loadMembers().then(data => {
    setMembers(data.MEMBERS);
    setLoading(false);
  });
}, []);
```

**Types:** `Member`, `Publication`, `NewsItem`, `ContactInfo`, `LabInfo` exported from `dataLoader.ts`.

**Hard-refresh browser** (Cmd+Shift+R) to see JSON changes during dev (caching).

**Content patterns:** Some pages load from JSON (Member, Publication, News), while others have hardcoded content (Research, Resources, Contact). Choose based on whether content needs CMS editing.

### Context

**BreadcrumbContext** (`src/context/BreadcrumbContext.tsx`):
```typescript
const { setBreadcrumbs } = useBreadcrumb();
useEffect(() => {
  setBreadcrumbs([{ label: 'Page Name' }]);
}, [setBreadcrumbs]);
```
Home sets empty array to hide breadcrumbs.

## Deployment

**Netlify** with auto-deploy on push to `main`. Config in `netlify.toml`:
- Build command: `npm run build`
- Publish directory: `dist/`
- SPA redirects: `/* → /index.html`

Live site: https://cc-lab-xjtlu.netlify.app

## Content Management (Decap CMS)

Access at `/admin/` to manage content visually. Collections: Members, Publications, News, Lab Info.

**Config:** `public/admin/config.yml`

**BibTeX Import Widget** (`public/admin/bibtex-widget.js`): Batch import publications with:
- Author name format conversion
- DOI-based link generation
- Preprint detection (arXiv, bioRxiv, ChemRxiv)
- Duplicate detection

**Manual editing:** Edit JSON files in `public/data/` directly. Supporting utility: `src/lib/utils/bibtexParser.ts`.

## Key Notes

1. **TypeScript strict** - Build fails on type errors
2. **Tailwind v4** - Theme in `src/index.css` via `@theme {}`, not separate config
3. **Dark mode** - Class-based (`dark:` prefix)
4. **Mobile** - Navbar has mobile menu; test at breakpoints (md: 768px)
5. **Animations** - Framer Motion for Navbar and page transitions
6. **Icons** - `lucide-react` primary; Material Symbols via `<span class="material-symbols-outlined">`
7. **Breadcrumbs** - Page components use `useBreadcrumb()` in `useEffect`
8. **Data loading** - Always use `dataLoader.ts`, never import JSON directly
9. **License** - MIT

## Images

Store in `public/assets/images/`:
- `people/` - Team photos (400×400px, named `bio-lastname.jpg`)
- `papers/` - Paper thumbnails (500×300px, named `paper1.jpg`)
- `posts/` - News images (800×600px+, descriptive names)

Use absolute paths: `/assets/images/people/bio-chan.jpg`. Optimize: JPG @ 85%, <500KB.