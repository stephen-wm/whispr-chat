# <img src="./public/whispr.svg#gh-light-mode-only" alt="Whispr logo" height="45" /><img src="./public/whispr-dark-mode.svg#gh-dark-mode-only" alt="Whispr dark mode logo" height="45" />

![License](https://img.shields.io/github/license/stephen-wm/whispr-chat?color=blue) ![Version](https://img.shields.io/github/v/tag/stephen-wm/whispr-chat?label=version) ![Build](https://img.shields.io/github/actions/workflow/status/stephen-wm/whispr-chat/ci.yml) ![Last Commit](https://img.shields.io/github/last-commit/stephen-wm/whispr-chat?color=yellow) ![Contributors](https://img.shields.io/github/contributors/stephen-wm/whispr-chat?color=5d00ff) ![Open Issues](https://img.shields.io/github/issues/stephen-wm/whispr-chat?color=ff0000) ![GitHub Repo stars](https://img.shields.io/github/stars/stephen-wm/whispr-chat)

An anonymous, ephemeral 1:1 chat app. Land on the homepage, get assigned a random anonymous username, spin up a chat room, and share the link with one other person. Rooms self-destruct after 10 minutes — no accounts, no history, no trace.

> **Status:** early development. This README tracks what's actually built, not the end goal — see [Roadmap](#roadmap) below.

## Why this exists

Built as a hands-on way to learn [TanStack Query](https://tanstack.com/query) in depth, alongside a realtime backend built on [Elysia](https://elysiajs.com/) and [Upstash](https://upstash.com/) (Redis + Realtime). Loosely inspired by [Josh tried coding's realtime chat tutorial](https://github.com/joschan21/nextjs16_realtime_chat), rebuilt from scratch as a learning exercise rather than following along.

## Tech stack

| Layer              | Tool                           |
| ------------------ | ------------------------------ |
| Framework          | Next.js (App Router)           |
| API                | Elysia + Eden (typed client)   |
| Data store         | Upstash Redis                  |
| Realtime           | Upstash Realtime               |
| Validation         | Zod                            |
| Data fetching      | TanStack Query                 |
| UI                 | shadcn/ui, Tailwind CSS        |
| Linting/formatting | Oxlint + Oxfmt (via Ultracite) |

## Getting Started

### Prerequisites

- Node.js `22.22.1` (see [.nvmrc](./.nvmrc))
- npm `10.9.3`

If you use nvm, run:

```bash
nvm use
```

You'll need a free [Upstash](https://upstash.com/) account for Redis + Realtime — environment variable setup is documented here once the integration lands.

### Installation

1. Clone the repository and install dependencies:

   ```bash
   git clone https://github.com/stephen-wm/whispr-chat.git
   cd web
   npm install
   ```

2. Configure environment variables:

   ```bash
   cp .env.example .env.local
   # Windows (CMD/Powershell)
   copy .env.example .env.local
   ```

   Fill in the required values &mdash; see `.env.example` for descriptions of each variable.

   | Variable | Description |
   | --- | --- |
   | `NEXT_PUBLIC_APP_URL` | Base URL of the app (e.g. `http://localhost:3000/`); used for generating absolute short link URLs |

3. Start the development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

You can start editing the project! The application will automatically reload as you edit files during development.

> This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

### Next.js Configuration

This project enables two non-default options in `next.config.ts`:

| Option | Description |
| --- | --- |
| `turbopackFileSystemCacheForDev` | Persists Turbopack's cache to disk between dev server restarts for faster cold starts |
| `reactCompiler` | Enables the React Compiler for automatic render optimizations; avoids `useMemo` / `useCallback` unless you have a specific reason |

## Roadmap

- [x] Project scaffold, tooling (Oxlint/Oxfmt, Husky, lint-staged)
- [ ] Anonymous username generation
- [ ] Chat room creation (2-user cap)
- [ ] Realtime messaging
- [ ] 10-minute room TTL + expiry redirect
- [ ] Rate limiting on message sends
- [ ] E2E tests (Playwright)

## Project Structure

```ASCII
stephen-wm/whispr-chat/
├─ .claude/                             # Claude Code workspace settings, commands, and contexts
├─ .cspell/                             # Spell-check dictionaries
├─ .github/                             # GitHub configuration (workflows, issue/PR templates, etc.)
│  ├─ workflows/                        # GitHub Actions CI, release, lint, auto-merge, etc.
│  ├─ hooks/                            # AI agent hook configurations (Ultracite)
│  └─ dependabot.yml                    # Dependabot dependency update configuration
├─ .husky/                              # Git hooks for enforcing code quality and commit standards
├─ .vscode/                             # VSCode workspace settings, recommended extensions, etc.
├─ public/                              # Static assets served directly by Next.js
├─ src/                                 # Application source code (App Router, components, styles, utilities)
│  └─ app/                              # Next.js App Router (routes, layouts, route handlers, etc.)
├─ .editorconfig                        # Editor-agnostic coding style rules
├─ .env.example                         # Example .env file for contributors
├─ .gitattributes                       # Git behavior settings (line endings, diff rules, etc.)
├─ .gitignore                           # Files and directories excluded from version control
├─ .lintstagedrc.json                   # lint-staged configuration for running checks on staged files
├─ .markdownlint-cli2.jsonc             # Markdown linting configuration
├─ .npmrc                               # npm configuration (dependency behavior, install settings)
├─ .nvmrc                               # Node.js version for local development consistency
├─ AGENTS.md                            # Guidelines for AI agents/tools interacting with the codebase
├─ CHANGELOG.md                         # Project changelog (Keep a Changelog format)
├─ CLAUDE.md                            # Project-specific instructions and context for Claude AI
├─ commitlint.config.mjs                # Commit message linting rules (Conventional Commits)
├─ cspell.json                          # Spell checking configuration for code and docs
├─ LICENSE                              # Project license (AGPL-3.0)
├─ lychee.toml                          # Dead link checker configuration
├─ next.config.ts                       # Next.js configuration
├─ oxfmt.config.ts                      # Oxfmt configuration
├─ oxlint.config.ts                     # Oxlint configuration
├─ package-lock.json                    # Locked dependency versions for reproducible installs
├─ package.json                         # Project metadata, scripts, and dependencies
├─ postcss.config.mjs                   # PostCSS configuration
├─ README.md                            # Project overview, setup, and usage instructions
└─ tsconfig.json                        # TypeScript configuration
```

## Scripts

| Command                | Description                                   |
| ---------------------- | --------------------------------------------- |
| `npm run dev`          | Start local dev server                        |
| `npm run build`        | Production build                              |
| `npm run start`        | Start production server                       |
| `npm run docs`         | Open README in browser                        |
| `npm run typecheck`    | Run TypeScript type checking                  |
| `npm run lint`         | Run Oxlint                                    |
| `npm run lint:fix`     | Run Oxlint and auto-fix issues                |
| `npm run lint:md`      | Run markdownlint on markdown files            |
| `npm run fmt`          | Format code with Oxfmt                        |
| `npm run fmt:check`    | Check formatting without writing changes      |
| `npm run check`        | Run all Ultracite checks                      |
| `npm run fix`          | Run all Ultracite auto-fixes                  |
| `npm run cspell`       | Spell check the project                       |
| `npm run cspell:words` | Append unknown words to the project word list |
| `npm run lychee`       | Run Lychee link checker locally               |
| `npm run prepare`      | Install Husky Git hooks                       |

## Versioning

This project is currently in pre-1.0 development. Breaking changes may occur at any time.

Releases follow [Semantic Versioning](https://semver.org/) and are documented in [CHANGELOG.md](./CHANGELOG.md).

## Repository Standards

This project includes a complete governance and automation setup, including:

- Conventional commits
- Commitlint and Husky hooks

## Author

Created and maintained by [@stephen-wm](https://github.com/stephen-wm/).

## Contributors

- [@stephen-wm](https://github.com/stephen-wm/)

## License

MIT, see [LICENSE](./LICENSE) for details.

## Contact

For questions or support, open an issue or email [hellostephenwm@gmail.com](mailto:hellostephenwm@gmail.com).

---

Badges generated by [shields.io](https://shields.io/).
