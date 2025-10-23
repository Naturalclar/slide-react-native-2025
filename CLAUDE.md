# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React presentation slide deck built with RemdX (React + MDX) using Vite. The presentation is about parallel development with Claude Code and git worktrees (title: "Claude Codeによる並列開発のすゝめ"), delivered at Nihonbashi JS #10.

## Architecture

- **Slide Content**: `slides.re.mdx` - Main presentation content written in MDX format
- **Components**: `Components.tsx` - Custom React components for slide layouts including:
  - Layout components: `Center`, `Row`, `Column`
  - Text components: `Heading`, `Text`, `SubText`, `Link`
  - Image components: `Image`, `GPTImage`, `MyIcon`
  - Utilities: `Note` (for speaker notes), `Splitter`
- **Themes**: `Themes.tsx` - Presentation theme definitions (dark/default)
- **Build Tool**: Vite with `@nkzw/vite-plugin-remdx` for MDX processing
- **Screenshots**: `screenshot.mjs` - Playwright script for generating slide thumbnails (generates `card.png` from localhost:5173)

## Development Commands

```bash
# Start development server (runs on port 5173)
npm run dev

# Build for production
npm run build

# Generate slide screenshot (requires dev server to be running)
npm run screenshot

# Deploy to Vercel
npm run deploy
```

## Key Dependencies

- `@nkzw/remdx@0.17.0` - RemdX library for React + MDX slides (patched version)
- `@nkzw/vite-plugin-remdx` - Vite plugin for RemdX processing
- `playwright` - Used for screenshot generation
- React 19 with TypeScript
- `shiki` - Pinned to `^0.11.0` via pnpm overrides

## Development Notes

- The project supports both npm and Bun as package managers (both `pnpm-lock.yaml` and `bun.lockb` present)
- TypeScript configuration is strict with `noUnusedLocals` and `noImplicitOverride` enabled
- Custom patch applied to `@nkzw/remdx@0.8.0` (see `patches/` directory)
- Slide images and assets are stored in the `public/` directory
- The presentation runs on port 5173 in development mode
- Screenshot script uses Playwright with dark mode color scheme and waits 2 seconds before capturing

## Slide Management

- Slides are separated by `---` markers in `slides.re.mdx`
- Transition settings can be specified with `transition: none` or `--` between slides
- Each slide should have a `<Note>Page X</Note>` component indicating its page number
- `<Note>` components also support speaker notes in Japanese
- **IMPORTANT**: When adding, removing, or reordering slides, always update the page numbers in the `<Note>` components accordingly to maintain accurate slide numbering
- The presentation content is in Japanese