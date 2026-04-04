# Polymash Next.js + Airtable Boilerplate

A production-ready starter template for building full-stack apps with **Next.js 16**, **Auth.js**, **Airtable**, and **shadcn/ui** — without writing a single database migration.

![Architecture Overview](docs/images/architecture-overview.png)

## Why Airtable?

Most Next.js starters pair with Supabase, Prisma, or Drizzle. This one uses **Airtable as the primary data store** — and that's the point.

- **Zero migrations** — add fields and tables visually, your API updates instantly
- **Built-in admin UI** — Airtable IS your back office. Filter, sort, bulk edit, share views with non-technical stakeholders
- **Collaborative by default** — your team can work in Airtable while your app reads/writes the same data
- **Rapid prototyping** — go from idea to working app in hours, not days
- **No DevOps overhead** — no database to provision, back up, or scale

This makes it ideal for **internal tools, admin dashboards, AI-powered apps, and MVPs** where speed matters more than scale.

## Features

- **Next.js 16** — App Router, React Server Components, TypeScript
- **Auth.js v5** — Custom credentials provider with env-based user management (no auth database needed)
- **Airtable** — Lazy-initialized client with full CRUD, zero-migration data layer
- **shadcn/ui** — 13+ pre-installed components (sidebar, cards, buttons, dropdowns, tooltips, etc.)
- **Tailwind CSS v4** — Utility-first styling with dark/light theme support
- **Dashboard layout** — Collapsible sidebar, theme switcher, responsive design
- **AI-ready** — Pre-configured env slots for Anthropic Claude, OpenAI, and Perplexity AI
- **Vercel-ready** — Deploy with zero configuration

## Origin Story

This boilerplate was inspired by [Bart Slodyczka](https://www.youtube.com/@BartSlodyczka)'s video **["Build 10X Faster With This Simple Claude Code Workflow"](https://www.youtube.com/watch?v=uHpUVBA8dWE)**, which demonstrates using Claude Code to scaffold full-stack apps from a boilerplate foundation. Bart's original [Next.js + Supabase + shadcn/ui boilerplate](https://github.com/Barty-Bart/nextjs-supabase-shadcn-boilerplate) uses Supabase as the data layer. This repo adapts that approach for **Airtable** — trading SQL flexibility for visual data management, instant schema changes, and zero-migration workflows.

We maintain both variants at Polymash:
- **This repo** — Airtable backend (visual data, rapid prototyping, non-technical collaboration)
- [polymash-nextjs-supabase-shadcn-boilerplate](https://github.com/JuergenB/polymash-nextjs-supabase-shadcn-boilerplate) — Supabase backend (SQL, RLS, real-time subscriptions)

## Quick Start

### Prerequisites

- Node.js 20+ (`node -v` to check)
- An [Airtable](https://airtable.com) account with a [Personal Access Token](https://airtable.com/create/tokens)

### Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/JuergenB/polymash-nextjs-airtable-boilerplate.git
   cd polymash-nextjs-airtable-boilerplate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your credentials:
   ```
   AUTH_SECRET=          # Generate with: openssl rand -base64 32
   AUTH_USERS=1:admin@example.com:yourpassword
   AIRTABLE_API_KEY=    # Personal Access Token from Airtable
   AIRTABLE_BASE_ID=    # From your Airtable URL: airtable.com/appXXXXXX/...
   ```

4. **Run the dev server**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:4000](http://localhost:4000)**

## Project Structure

```
app/
  page.tsx                → Landing / redirect to dashboard
  login/                  → Auth login page
  dashboard/              → Protected dashboard (sidebar layout)
  api/auth/               → Auth.js API routes
components/
  app-sidebar.tsx         → Sidebar navigation (customize menu items here)
  logo.tsx                → App logo component
  providers.tsx           → Theme & session providers
  theme-switcher.tsx      → Dark/light mode toggle
  ui/                     → shadcn/ui components (13+ pre-installed)
lib/
  airtable/client.ts      → Lazy-init Airtable client (env checked at query time)
  ai/config.ts            → AI provider configuration
  utils.ts                → Utility functions
auth.ts                   → Auth.js v5 configuration
```

## Customization

| What | Where |
|------|-------|
| Sidebar menu items | `components/app-sidebar.tsx` |
| Theme & colors | `app/globals.css` |
| Auth configuration | `auth.ts` |
| Airtable tables | `lib/airtable/client.ts` |
| Add shadcn components | `npx shadcn@latest add [component]` |

## Integrations

The boilerplate comes pre-wired for a curated set of APIs that cover the most common needs when building AI-powered apps. All keys are configured in `.env.local` (see `.env.example` for the full template).

### Core (required)

| Variable | What It Does |
|----------|-------------|
| `AUTH_SECRET` | Auth.js session encryption. Generate with `openssl rand -base64 32` |
| `AUTH_USERS` | User credentials in `id:email:password` format — no auth database needed |
| `AIRTABLE_API_KEY` | [Airtable Personal Access Token](https://airtable.com/create/tokens) for your data layer |
| `AIRTABLE_BASE_ID` | Target Airtable base (from your Airtable URL: `airtable.com/appXXXXXX/...`) |

### AI

| Variable | What It Does |
|----------|-------------|
| `ANTHROPIC_API_KEY` | [Anthropic Claude](https://console.anthropic.com/) — advanced reasoning, content generation, and code. The best general-purpose LLM for complex tasks |
| `OPENAI_API_KEY` | [OpenAI](https://platform.openai.com/api-keys) — GPT models for chat, embeddings, and structured output |
| `PERPLEXITY_API_KEY` | [Perplexity AI](https://www.perplexity.ai/settings/api) — web-grounded deep research. Unlike standard LLMs, Perplexity searches the live web and returns cited, up-to-date answers. Ideal for research pipelines, fact-checking, and competitor analysis |

### Content & Media

| Variable | What It Does |
|----------|-------------|
| `REPLICATE_API_TOKEN` | [Replicate](https://replicate.com/) — access to dozens of image generation models (Flux, SDXL, etc.) through a single API. Generate hero images, product shots, backgrounds, and visual content for websites and social media |
| `NAPKIN_API_KEY` | [Napkin AI](https://napkin.ai/) — generate infographics, flowcharts, process diagrams, and explanatory visuals from plain text. Unlike image generators, Napkin produces structured, editable graphics — perfect for "how it works" sections and documentation |
| `UNSPLASH_ACCESS_KEY` | [Unsplash](https://unsplash.com/oauth/applications) — free high-quality stock photography API |

### Data & Scraping

| Variable | What It Does |
|----------|-------------|
| `FIRECRAWL_API_KEY` | [Firecrawl](https://firecrawl.dev/) — extract structured data from any web page. Handles JavaScript rendering, anti-bot challenges, and returns clean markdown or structured JSON. Far more reliable than raw fetch/cheerio for modern websites |

### Communications

| Variable | What It Does |
|----------|-------------|
| `RESEND_API_KEY` | [Resend](https://resend.com/) — transactional email with React email templates |

## Built With This Boilerplate

These production apps were built on the Polymash boilerplate family, demonstrating what you can ship:

### [Visibility Labs](https://github.com/JuergenB/visibilitylabs-app) — [visibilitylabs.polymash.com](https://visibilitylabs.polymash.com)
AI-powered tools for podcasters and digital strategists to improve online visibility in the age of AI search. Features a GEO & SEO Visibility Audit, About Page Optimizer, Show Description Optimizer, Episode Title Optimizer, and FAQ Generator — all designed to make content citable by ChatGPT, Perplexity, and Google AI Overviews. Built on the [Supabase variant](https://github.com/JuergenB/polymash-nextjs-supabase-shadcn-boilerplate) of this boilerplate. **Demonstrates:** a live, public-facing SaaS product with subscription tools, AI integrations, and a companion [marketing site](https://github.com/JuergenB/visibilitylabs-marketing).

### [Formula One Fantasy Assistant](https://github.com/JuergenB/formula-one-fantasy-assistant)
AI-powered companion for the official F1 Fantasy 2026 game. Multi-archetype team management, streaming AI strategy advisor, 14-source RSS news pipeline with AI relevance scoring, OpenF1 live timing integration, and chip strategy engine. **Demonstrates:** scaling the boilerplate to a complex, real-time, AI-heavy application with Airtable as the data backbone.

### [Polymash Content Audit App](https://github.com/JuergenB/polymash-content-audit-app)
Multi-website content audit and pruning tool. Scores every URL against performance metrics, backlinks, and strategic fit to recommend KEEP, UPDATE, CONSOLIDATE, or DELETE actions. Integrates Google Search Console and DataForSEO. **Demonstrates:** adding external API integrations on top of the boilerplate's auth + Airtable foundation.

### [Artwork Archive Export Utility](https://github.com/JuergenB/artwork-archive)
Automated art submission pipeline for a 501(c)(3) nonprofit. Transforms AI-enriched Airtable data into Artwork Archive-compatible CSV files with visual field mapping, 14 data transforms, and duplicate detection across 40-column contacts and 69-column pieces templates. **Demonstrates:** using the boilerplate as a focused data transformation utility alongside a larger n8n + Airtable automation backend.

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.1 |
| Language | TypeScript | 5.x |
| Auth | Auth.js (NextAuth v5) | 5.0-beta |
| Database | Airtable SDK | 0.12.2 |
| UI Components | shadcn/ui + Radix UI | Latest |
| Styling | Tailwind CSS | 4.x |
| AI | Vercel AI SDK + Anthropic | Latest |
| Deployment | Vercel | — |

## License

MIT
