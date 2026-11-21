# [Project Name]: Standing Instructions

@AGENTS.md

## Rule 1: Read code before answering

**NEVER answer questions about how something works from memory alone.** Read every file in the chain first. Memory and plan files may be stale; the code is the source of truth. When the user asks "how does X work?", read the actual implementation files before responding.

This applies to Next.js too. This repo runs Next.js 16.4, which differs from most training data (for example `proxy.ts` replaced `middleware.ts`). Read the matching guide in `node_modules/next/dist/docs/` before changing Next config, the proxy or routes.

---

## Rule 2: GitHub Issues are the source of truth

**At the start of every session, run this first, before anything else:**

```bash
gh issue list --repo [OWNER]/[REPO] --state open --limit 100
```

**When a design or feature is discussed:** Create a GitHub issue immediately with the full spec. Design documents belong in GitHub Issues, not in conversation history. Conversation history is lost when context compresses. GitHub Issues are permanent.

**When closing an issue:** Add a comment summarising what was built and which files changed.

---

## Rule 3: Internal docs first

The `docs/` folder contains all curated knowledge. Read it before any web search.

---

## Rule 4: Never ask the user to do what you can do yourself

CLI tools are pre-approved: `git`, `gh`, `npm`, `npx`, `node`, `python3`, `curl`, `vercel`, `lsof`, `kill`, `jq`, `open`, `tree`.
Airtable tables/fields: use the Metadata API directly, never ask the user to create them manually.

---

## Rule 5: Execute ALL user instructions in a single pass

When the user gives multiple instructions in one message (e.g., "move X above Y, left-align Z, make W more subtle"), implement ALL of them before responding. Do not skip any. If you're unsure about one, implement the ones you understand and ask about the ambiguous one, but never silently drop instructions.

---

## Dev Environment

- **Node:** 24.x (`engines` in `package.json`, `.nvmrc`)
- **Port:** [PORT] (`npm run dev -- -p [PORT]`). Next.js ignores `PORT` in `.env.local`.
- **Stack:** Next.js 16.4 App Router, TypeScript, Tailwind v4, Airtable, shadcn/ui on Radix
- **Auth:** Auth.js v5 (`next-auth@beta`) custom credentials | `AUTH_USERS` env: `id:username:password`, comma-separated
- **Session cookie:** named by `AUTH_COOKIE_NAME`, falling back to `<package.json name>.session-token`. Keep it unique per app so apps on other localhost ports do not log each other out.
- **Dependencies:** exact versions only (`.npmrc` has `save-exact=true`). Never `npm audit fix --force`.
- **Repo:** github.com/[OWNER]/[REPO]
- **User Timezone:** America/New_York (Eastern Time). Convert all API/UTC timestamps to ET before discussing with user.

---

## Key Files

<!-- List architecturally significant files here as the project grows. Examples: -->
<!-- - `lib/airtable/client.ts`: lazy init, getBase() and getTable() -->
<!-- - `app/api/...`: API routes -->
<!-- - `components/...`: key UI components -->

---

## Airtable

- **Base ID:** [BASE_ID]
- **Tables:** [list tables as they are created]
- **API key** (a personal access token) is in `.env.local`. Use Bash+curl for all schema changes. NEVER ask the user to edit Airtable manually.
- **Metadata API:** `GET/PATCH https://api.airtable.com/v0/meta/bases/{baseId}/tables`, bearer auth with `AIRTABLE_API_KEY`. Needs the `schema.bases:read` / `schema.bases:write` scopes on the token.

---

## Key Architectural Rules

- Airtable client is lazy-init: `getBase()` and `getTable()` in `lib/airtable/client.ts` check the env vars at query time, not at import, so builds work without them.
- Register every AI agent in `lib/ai/config.ts`. Current Claude ids: `claude-opus-5-5`, `claude-sonnet-5-5`, `claude-haiku-5-5`, `claude-fable-5-2`. They reject `temperature` and forced tool calls; set `effort` explicitly and leave room in `max_tokens` for thinking.
- If a model lacks domain data, put knowledge docs in `lib/ai/knowledge.ts` and inject them into the prompt.
- [Add project-specific rules as they emerge]

---

## Session Rules (non-negotiable)

1. **Read code before answering.** Do not answer from memory. Read the actual files first.
2. **Execute ALL user instructions.** Do not silently drop any. Confirm each was done.
3. **Convert timestamps to ET.** API timestamps are UTC. User is in America/New_York.
4. **Close issues immediately** when implementing code is committed.
5. **Save important discoveries to memory immediately.** Do not wait until end of session.
