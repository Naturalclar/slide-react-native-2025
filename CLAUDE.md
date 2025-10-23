# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React presentation slide deck built with RemdX (React + MDX) using Vite. The project creates interactive slides for a presentation about "The Fall of React Native Bridge" delivered at meguro.es.

## Architecture

- **Slide Content**: `slides.re.mdx` - Main presentation content written in MDX format
- **Components**: `Components.tsx` - Custom React components for slide layouts (Center, Heading, MyIcon, etc.)
- **Themes**: `Themes.tsx` - Presentation theme definitions
- **Build Tool**: Vite with `@nkzw/vite-plugin-remdx` for MDX processing
- **Screenshots**: `screenshot.mjs` - Playwright script for generating slide thumbnails

## Development Commands

```bash
# Start development server
bun dev
# or
npm run dev

# Build for production
bun run build
# or
npm run build

# Generate slide screenshot
bun run screenshot
# or
npm run screenshot

# Deploy to Vercel
bun run deploy
# or
npm run deploy
```

## Key Dependencies

- `@nkzw/remdx` - RemdX library for React + MDX slides (patched version)
- `@nkzw/vite-plugin-remdx` - Vite plugin for RemdX processing
- `playwright` - Used for screenshot generation
- React 18 with TypeScript

## Development Notes

- The project uses Bun as the package manager (bun.lockb present)
- TypeScript configuration is strict with noUnusedLocals enabled
- Custom patch applied to `@nkzw/remdx@0.8.0` (see patches directory)
- Slide images are stored in the `public/` directory
- The presentation runs on port 5173 in development mode

## Slide Management

- Slides are separated by `---` markers in `slides.re.mdx`
- Each slide should have a `<Note>Page X</Note>` component indicating its page number
- **IMPORTANT**: When adding, removing, or reordering slides, always update the page numbers in the `<Note>` components accordingly to maintain accurate slide numbering