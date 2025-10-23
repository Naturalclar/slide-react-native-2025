# Claude Codeによる並列開発のすゝめ

A React presentation slide deck built with RemdX for a talk about parallel development with Claude Code.

## Tech Stack

- **RemdX**: React + MDX for interactive slides
- **Vite**: Build tool with @nkzw/vite-plugin-remdx
- **React 19**: UI framework
- **TypeScript**: Type safety
- **Playwright**: Screenshot generation

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Generate slide screenshots
npm run screenshot

# Deploy to Vercel
npm run deploy
```

## Project Structure

- `slides.re.mdx` - Main presentation content
- `Components.tsx` - Custom slide components
- `Themes.tsx` - Presentation themes
- `screenshot.mjs` - Playwright screenshot script
