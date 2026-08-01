# Changelog

All notable changes to Whispr will be documented in this file.

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) and [Conventional Commits](https://www.conventionalcommits.org/). The formatting for this document is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- Join notices in chat history: when someone connects to a room for the first time, a persisted system entry ("username joined the room") appears in the timeline for both participants, surviving refreshes

## [0.7.0] - 2026-08-01

### Added

- Rate limiting on `POST /messages` (sliding window, per auth token) and `POST /room/create` (sliding window, per IP) via `@upstash/ratelimit`, with `429` responses surfaced as toasts; a specific "slow down" message for messages, and the server-computed cool down duration for room creation

## [0.6.0] - 2026-07-30

### Added

- Toast notifications (via `sonner`) for room-unavailable and room-full redirects, so leaving a dead or full room actually tells the user why instead of silently bouncing them home
- Live room TTL countdown in the chat header, redirecting to the homepage with a notice once time expires
- Added a dedicated `NoticeHandler` component for the homepage's `?notice=` toast logic, scoped inside its own narrow `Suspense` boundary (required for `useSearchParams()`'s<br/>static-prerender requirements), kept separate from the page's visible content so a suspend/resume there can't blank out the whole homepage

### Changed

- Standardized `proxy.ts`'s redirect params on a single `?notice=` convention (`room-full`, `room-unavailable`), replacing the previous `?error=ROOM_IS_FULL`/`?error=ROOM_NOT_FOUND` values that redirected into silence
- Removed empty space between mutation function block and onSuccess block in `hooks/use-create-room.ts` file

## [0.5.0] - 2026-07-29

### Added

- Basic page-view analytics via Vercel Analytics, for visibility into real usage post-deploy

## [0.4.1] - 2026-07-29

### Fixed

- Chat history failing to load on refresh; `GET /messages` was reading from a mistyped Redis key (`messages: {roomId}` with a stray space) that never matched what `POST /messages` actually wrote to (in `features/room/server/messages.ts`)

## [0.4.0] - 2026-07-28

### Added

- Realtime messaging via `@upstash/realtime`: message send/receive, room history on join/refresh
- `GET`/`POST /api/messages` endpoints, authenticated via room membership
- `/api/realtime` SSE relay route
- Realtime provider setup for Upstash Realtime
- shadcn/ui `textarea.tsx` UI component

## [0.3.0] - 2026-07-28

### Added

- Room creation endpoint (`POST /api/room/create`)
- `useCreateRoom` mutation hook and homepage "Create room" flow
- Room-join middleware (`proxy.ts`) with capacity enforcement, token-based reconnection, and collision-free anonymous username assignment per room
- Redis client (`lib/redis.ts`) and Eden API client (`lib/eden.ts`)
- Query provider setup for TanStack Query
- Added shadcn/ui `card.tsx` and `spinner.tsx` UI components
- Added custom GitHub SVG icon in `components/icons/github.tsx`
- Expanded README with project structure, getting started guide, scripts reference, and contributor/governance documentation

### Changed

- Added missing change notes for [0.2.1] and [0.2.2] in this CHANGELOG file
- Extracted Eclipse component arguments type definition to interface
- Added variant attribute with ghost option in GitHub button in home page header
- Refactored the room creation mutation to validate API responses and throw errors for failed requests
- CI build and Vercel deployment now require `UPSTASH_REDIS_REST_URL`/`UPSTASH_REDIS_REST_TOKEN` as configured secrets, since `lib/redis.ts` initializes eagerly at module load

### Fixed

- Incorrect replaced incorrect `variant` attribute assignment for Button component size with valid `size` attribute in home page header
- Set correct `variant` attribute to `"ghost"` in Button component for desired GitHub button styling

## [0.2.2] - 2026-07-27

### Changed

- Bumped `react` and `react-dom` from v19.2.4 to v19.2.8 respectively

## [0.2.1] - 2026-07-27

### Changed

- Bumped actions group versions:
  - `lewagon/wait-on-check-action` from v1.8.0 to v1.9.0
  - `actions/setup-node` from v6 to v7
  - `lycheeverse/lychee-action` from v2.8.0 to v2.9.0

## [0.2.0] - 2026-07-27

### Added

- `next-themes` integration for application-wide light and dark theme support
- shadcn/ui configuration with generated `components.json`
- shadcn/ui `Button` and `Skeleton` components
- Custom `ThemeToggle` component for switching between light and dark themes
- `ThemeProvider` for global theme management
- Centralized `Providers` component for composing and registering application providers
- Custom `useTheme` hook for interacting with the active application theme
- Custom `useHydrated` hook for safely handling client-side hydration state
- shadcn/ui `cn` utility in `src/lib/utils.ts` for conditional class name composition
- `SHADCN_PRESET` environment variable to document the project's selected shadcn/ui preset
- `class-variance-authority`, `clsx`, and `tailwind-merge` utilities for shadcn/ui component styling

### Changed

- Moved global stylesheet from `src/app/globals.css` to `src/styles/`
- Updated `src/app/layout.tsx` to use the centralized `Providers` component
- Enabled `suppressHydrationWarning` on the root layout to prevent expected theme hydration mismatches
- Updated the landing page with theme toggle
- Expanded `README.md` project structure documentation

## [0.1.2] - 2026-07-26

### Added

- GitHub `labels.sh` script for creating labels for issues, PRs, etc.

## [0.1.1] - 2026-07-26

### Added

- `release-it` release automation with `@release-it/conventional-changelog` and `@release-it/keep-a-changelog` plugins
- `.github/workflows/release.yml` automated release workflow, triggered on merge to `main`
- `.github/workflows/auto-merge.yml` for Dependabot auto-merge of non-major dependency updates

### Updated

- `pre-commit` hook with preceding commit message validation step
- `pre-push` hook to group valid commit messages prior to push to ensure no invalid commits fallthrough

## [0.1.0] - 2026-07-26

### Added

- Initial project scaffold via `create-next-app` with Next.js app router
- TailwindCSS configuration with PostCSS
- `.nvmrc` pinned Node.js to `22.22.1`
- `engines` field in `package.json` enforcing Node.js `22.22.1` and npm version `10.9.0`
- `.env.example` with placeholder environment variable keys
- `README.md` with setup instructions, project structure, and contributing guidelines
- Repository metadata and AI agent guidance files
- `.editorconfig` and `.gitattributes` for consistent editor and git behavior
- `.npmrc` with project-level npm configuration
- `vercel.json` for Vercel deployment configuration
- Oxlint + Oxfmt linting and formatting via Ultracite
- Husky pre-commit hook with lint-staged
- Enabled `turbopackFileSystemCacheForDev` in `next.config.ts` for faster local dev builds
- Enabled `reactCompiler` in `next.config.ts` for automatic render optimization

[Unreleased]: https://github.com/stephen-wm/whispr-chat/compare/v0.7.0...HEAD
[0.7.0]: https://github.com/stephen-wm/whispr-chat/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/stephen-wm/whispr-chat/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/stephen-wm/whispr-chat/compare/v0.4.1...v0.5.0
[0.4.1]: https://github.com/stephen-wm/whispr-chat/compare/v0.4.0...v0.4.1
[0.4.0]: https://github.com/stephen-wm/whispr-chat/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/stephen-wm/whispr-chat/compare/v0.2.2...v0.3.0
[0.2.2]: https://github.com/stephen-wm/whispr-chat/compare/v0.2.1...v0.2.2
[0.2.1]: https://github.com/stephen-wm/whispr-chat/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/stephen-wm/whispr-chat/compare/v0.1.2...v0.2.0
[0.1.2]: https://github.com/stephen-wm/whispr-chat/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/stephen-wm/whispr-chat/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/stephen-wm/whispr-chat/releases/tag/v0.1.0
