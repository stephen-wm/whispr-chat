# Changelog

All notable changes to Whispr will be documented in this file.

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) and [Conventional Commits](https://www.conventionalcommits.org/). The formatting for this document is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

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

[Unreleased]: https://github.com/stephen-wm/whispr-chat/compare/v0.2.2...HEAD
[0.2.2]: https://github.com/stephen-wm/whispr-chat/compare/v0.2.1...v0.2.2
[0.2.1]: https://github.com/stephen-wm/whispr-chat/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/stephen-wm/whispr-chat/compare/v0.1.2...v0.2.0
[0.1.2]: https://github.com/stephen-wm/whispr-chat/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/stephen-wm/whispr-chat/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/stephen-wm/whispr-chat/releases/tag/v0.1.0
