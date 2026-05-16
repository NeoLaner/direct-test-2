# Main-Next: Dynamic Business Landing Pages

> A modern, type-safe Next.js application that generates dynamic, industry-specific landing pages with server-side rendering, real-time data fetching, and optimized performance.

## 🎯 Project Overview

**Main-Next** is the core web application of the **Direct** monorepo. It delivers dynamic business landing pages tailored to specific industries through a **server-first architecture**, ensuring optimal performance, SEO, and type safety across the entire stack.

### Key Characteristics
- ✅ **Server-Side Rendering (SSR)** - All content fetched and rendered on the server
- ✅ **Type-Safe API** - End-to-end TypeScript with oRPC
- ✅ **Persian/RTL Support** - Full Farsi interface with RTL layout
- ✅ **Dynamic Routing** - Industry & page-type slug-based routing
- ✅ **Composable Architecture** - Reusable, modular components
- ✅ **SEO Optimized** - Dynamic metadata and OpenGraph tags
- ✅ **Production Ready** - Monorepo integration with Turbo build system

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 16.1, React 19.2 |
| **Language** | TypeScript 5.9 |
| **Styling** | Tailwind CSS 4.1, PostCSS |
| **Database** | PostgreSQL + Drizzle ORM 0.44 |
| **API** | oRPC 1.12 (Object RPC) + TanStack Query 5.90 |
| **UI Components** | shadcn/ui (Radix UI, Lucide Icons) |
| **Build Tools** | Turbo (monorepo), Biome (linting/formatting) |
| **Package Manager** | pnpm 10.4+ |
| **Typography** | Vazirmatn (Persian Font) |

---

## 📁 Project Structure

```
src/
├── app/                           # Next.js App Router
│   ├── [page_type_slug]/
│   │   └── [industry_slug]/       # Dynamic page route
│   │       ├── page.tsx           # Server component (SSR)
│   │       ├── layout.tsx         # Page layout wrapper
│   │       └── _ui/               # Page-specific components
│   │           ├── hero/
│   │           ├── sections/
│   │           ├── cta/
│   │           ├── nav/
│   │           └── footer/
│   ├── api/
│   │   ├── rpc/[...rest]         # oRPC handler
│   │   └── v1/[[...rest]]        # Versioned API with CORS
│   ├── layout.tsx                 # Root layout
│   ├── not-found.tsx             # 404 page
│   └── fonts.ts                   # Font configuration
├── lib/
│   ├── orpc/                      # RPC setup
│   │   ├── router.ts             # Router definition
│   │   ├── server.ts             # Server client
│   │   └── client.ts             # Client utils
│   ├── db/                        # Database connection (from @workspace/db)
│   └── utils/                     # Shared utilities
├── hooks/                         # Custom React hooks
│   ├── use-create-pagination-url.ts
│   ├── use-mobile.ts
│   └── use-fullscreen.ts
├── actions/                       # Server Actions
│   └── say-my-name-action.ts
├── providers/                     # React Providers
│   ├── providers.tsx             # Root provider wrapper
│   └── page-ctx-provider.tsx     # Page context
└── styles/                        # Global styles

```

---

## 🔄 Data Flow Architecture

```
User Browser
    ↓
[pageTypeSlug]/[industrySlug]/page.tsx (Server Component)
    ↓
api.page.getPage({pageTypeSlug, industrySlug})
    ↓
/api/rpc/[...rest] Handler
    ↓
oRPC Page Router (packages/rpc-server)
    ↓
Drizzle ORM Query
    ↓
PostgreSQL Database
    ↓
page_contents + page_sections (with nested items)
    ↓
Server-side React Render → HTML + JSON → Browser
    ↓
Client Hydration + Theme/Query Providers
```

### Key Concept
All data fetching happens **before** React rendering on the server. The browser receives fully rendered HTML with embedded data, eliminating hydration mismatches and improving initial page load performance.

---

## 📊 Database Schema

### Core Tables

**`page_contents`**
```typescript
{
  pageTypeSlug: string;        // e.g., "landing", "pricing"
  industrySlug: string;        // e.g., "saas", "retail"
  heroHeadline: string;
  heroSubheadline: string;
  heroImage: string;
  title: string;               // SEO
  metaDescription: string;
  keywords: string[];
  ctaText: string;
  // ... more fields
}
```

**`page_sections`** (1-to-Many with page_contents)
```typescript
{
  pageId: number;
  sectionType: string;         // e.g., "features", "pricing", "testimonials"
  title: string;
  order: number;               // Section ordering
  items: JSONB;               // Flexible content structure
}
```

---


## 🔗 Monorepo Dependencies

This project connects to three workspace packages:

### **@workspace/db** (`packages/db`)
- Drizzle ORM schema definitions
- Database connection utilities
- Type definitions and relations

### **@workspace/rpc-server** (`packages/rpc-server`)
- oRPC router creators
- API procedure implementations
- Error middleware & schema validation

### **@workspace/ui** (`packages/ui`)
- 50+ shadcn/ui components
- Theme provider (next-themes)
- Shared utilities and hooks
- Global styles and Tailwind configuration

---

## 🎨 Component Architecture

All components follow a **composable pattern**, built with:
- **Tailwind CSS** for styling
- **TypeScript** for type safety
- **Responsive Design** (mobile-first)
- **Server/Client boundary** awareness


---

## 🌍 SEO & Metadata

The application **automatically generates SEO metadata** per page:

```typescript
// Dynamic metadata generation
export async function generateMetadata({
  params: { pageTypeSlug, industrySlug },
}): Promise<Metadata> {
  const page = await api.page.getPage({
    pageTypeSlug,
    industrySlug,
  });

  return {
    title: page.title,
    description: page.metaDescription,
    keywords: page.keywords,
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      images: [{ url: page.heroImage }],
      locale: "fa_IR",
    },
    twitter: { card: "summary_large_image" },
  };
}
```

Features:
- ✅ Dynamic title and description
- ✅ OpenGraph tags (for social sharing)
- ✅ Twitter card support
- ✅ Canonical URLs
- ✅ Persian locale support (fa_IR)
- ✅ Fallback metadata for 404 pages


---

## 🛠️ Development Workflow

### Adding a New Page Type

1. **Add to database schema** (`packages/db/src/tables/`)
2. **Create procedure** (`packages/rpc-server/src/procedures/`)
3. **Register router** (`packages/rpc-server/src/routers/`)
4. **Create page component** (`src/app/[page_type_slug]/[industry_slug]/`)
5. **Add sub-components** (`src/app/[page_type_slug]/[industry_slug]/_ui/`)

### Adding a New Component

1. **Create component file** in `src/app/*/*/\_ui/`
2. **Export from component index**
3. **Use with TypeScript props interface**
4. **Style with Tailwind CSS**

---

## 📚 Related Documentation

- **oRPC Documentation**: [orpc.io](https://orpc.io)
- **Next.js Guide**: [nextjs.org](https://nextjs.org)
- **Drizzle ORM**: [drizzle.orm](https://orm.drizzle.team)
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com)
- **shadcn/ui**: [ui.shadcn.com](https://ui.shadcn.com)

