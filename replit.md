# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Team Workspace App

UKG Bryte team workspace with views connected via a shared 3-button ViewToggle (Card → List → People):
- **Card** (`/items`): Category-based card grid view with "Good morning Nina" greeting, 3-column grid of category cards (Attendance, Workforce coverage, Compliance, Approvals, Labor cost, People). Active items show count badges (critical=red fill, important=outlined) + avatar groups. Resolved items show green checkmarks. Clicking active items navigates to `/item/:cardId`.
- **List** (`/focused/:id`, default route `/` redirects to `/focused/0`): Single-member daily briefing cards, clicking any card navigates to the detail page
- **People** (`/small`): Compact overview with "Good morning Nina" greeting header, "Clocked in/Scheduled" tab chips, Me avatar centered, team member avatars with single urgency badge (total count, colored by highest urgency), off-shift sidebar, Chat card + Note panel with mint green background, and zoom control
- **Item Detail** (`/item/:cardId`): Full detail page for a briefing card with left sidebar (back nav, contextual Bryte prompt), tab navigation (Summary/Candidates/Why these options/What happens next), dark hero card, Status/Eligible coverage/Recommendation/Quick summary sections, and bottom action bar. Smooth slide-in animation on entry.
- **Team Space** (`/team`): All team members in columns with briefing cards
- **ViewToggle** (`src/components/ViewToggle.tsx`): Shared 3-button pill toggle (card grid / list bars / people grid) used across Card, List, and People pages. Order: Card → List → People.

### Design Tokens
- Avatar border-radius: `rounded-[7.2px]` (all views in Small View)
- Urgency colors: critical `#e80d24`, important `#e68200`, headsup `#4766ff`, light `#dbe2ff`
- Off-shift status: lunch `bg-black/43`, time off `bg-[#7532bc]`
- Badge style: `border-2 border-white` on urgency count badges
- Note panel: `bg-[#edf6f4]` (mint green) inside white card
- SVG icon fill: `fill="black" fillOpacity="0.65"`
- AskBar: fixed bottom, z-[150] (z-[400] in focused view)
