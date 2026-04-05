# Probe Droid Sweeper

A Star Wars themed minesweeper game built with React. Hunt Imperial probe droids on Hoth as the Rebel Alliance, or locate hidden rebel bases as the Galactic Empire.

🎮 **[Play Now](https://jsantoru.github.io/probe-droid-sweeper/)**

## Features

- **Dual Themes**: Switch between Rebel Alliance (light) and Galactic Empire (dark) themes
- **Multiple Difficulties**: Easy, Medium, and Hard modes
- **Multi-User Support**: Each player has their own stats, preferences, and game history
- **Persistent Stats**: Track games played, win rate, streaks, and best times
- **Game History**: Review your recent games in the sidebar
- **Star Wars Aesthetics**: Custom icons and authentic Star Wars branding

## Tech Stack

- React 18
- Vite
- JavaScript
- Plain CSS (no UI libraries)
- Lucide React (icons)
- localStorage for persistence

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Deployment to GitHub Pages

```bash
# Build the project
npm run build

# Deploy to gh-pages branch
cd dist && git init && git add -A && git commit -m "Deploy to GitHub Pages" && git push -f https://github.com/jsantoru/probe-droid-sweeper.git HEAD:gh-pages && cd ..

# Clean up
rm -rf dist/.git
```

Then configure GitHub Pages:
1. Go to repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: `gh-pages` / `(root)`
4. Save

Site will be live at: `https://jsantoru.github.io/probe-droid-sweeper/`

## How to Play

- **Left Click**: Reveal a cell
- **Right Click**: Place/remove a target lock (flag)
- Find all probe droids/rebel bases without triggering one
- Numbers indicate how many threats are in adjacent cells
- Win by correctly identifying all threat locations

## License

MIT
