# Probe Droid Sweeper - Project Plan

## Overview
Star Wars themed Minesweeper game with dual faction themes (Rebel Alliance vs Galactic Empire). Built with React + Vite, vanilla JavaScript, and plain CSS.

---

## Game Concept

### Rebel Theme (Light/Hoth Theme)
- **Setting**: Hoth ice planet
- **Objective**: Locate hidden Imperial Probe Droids
- **Color Scheme**: White, light blue, icy tones
- **Hidden Threat**: Probe Droids
- **Marker**: Target lock (Rebel-style targeting reticle)
- **Loss Condition**: Probe droid detects you!

### Imperial Theme (Dark Theme)
- **Setting**: Deep space / Imperial facility
- **Objective**: Locate hidden Rebel Bases
- **Color Scheme**: Dark grays, blacks, red accents
- **Hidden Threat**: Rebel Bases
- **Marker**: Target lock (Imperial-style targeting)
- **Loss Condition**: Rebel base destroys your scanner!

---

## Core Features

### 1. Classic Minesweeper Gameplay
- Left click to reveal tiles
- Right click to place/remove target locks
- Number indicators show adjacent threats (1-8)
- First click is always safe
- Timer tracking game duration
- Mine/threat counter

### 2. Difficulty Levels
Following classic Minesweeper:
- **Easy**: 9x9 grid, 10 threats
- **Medium**: 16x16 grid, 40 threats
- **Hard**: 30x16 grid, 99 threats

### 3. Theme Toggle
- Switch between Rebel and Imperial themes
- Persists user preference in localStorage
- Smooth transitions between themes
- Theme affects:
  - Color scheme
  - Icons/SVGs
  - Terminology in UI

### 4. LocalStorage Integration
Super lightweight persistence:
- **Current Session**: Save/resume active game state
  - Grid state
  - Timer value
  - Difficulty level
  - Current theme
- **History Tracking**:
  - Games played
  - Games won
  - Best times per difficulty
  - Win streak

---

## Technical Architecture

### Tech Stack
- **Framework**: React 18+
- **Build Tool**: Vite
- **Language**: JavaScript (ES6+)
- **Styling**: Plain CSS with CSS variables for theming
- **Icons**: Lucide React (utility icons only)
- **Custom Graphics**: Hand-crafted SVG components

### Project Structure
```
probe-droid-sweeper/
├── docs/
│   └── plan.md
├── public/
├── src/
│   ├── components/
│   │   ├── Game.jsx              # Main game container
│   │   ├── Grid.jsx              # Game grid
│   │   ├── Cell.jsx              # Individual cell
│   │   ├── Header.jsx            # Timer, counter, reset
│   │   ├── DifficultySelector.jsx
│   │   ├── ThemeToggle.jsx
│   │   └── Stats.jsx             # Game history/stats
│   ├── icons/
│   │   ├── ProbeDroid.jsx        # Probe droid SVG
│   │   ├── RebelBase.jsx         # Rebel base SVG
│   │   ├── TargetLock.jsx        # Target lock SVG
│   │   ├── RebelSymbol.jsx       # Rebel alliance symbol
│   │   └── ImperialSymbol.jsx    # Imperial crest
│   ├── hooks/
│   │   ├── useGameState.js       # Core game logic
│   │   ├── useLocalStorage.js    # Persistence hook
│   │   └── useTimer.js           # Timer logic
│   ├── utils/
│   │   ├── gameLogic.js          # Minesweeper algorithms
│   │   └── constants.js          # Difficulty configs
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

### Game State Management
Using React useState/useReducer - keep it simple:
```javascript
{
  grid: [],              // 2D array of cells
  gameStatus: 'idle',    // idle | playing | won | lost
  difficulty: 'medium',  // easy | medium | hard
  theme: 'rebel',        // rebel | imperial
  timer: 0,
  threatsRemaining: 0,
  firstClick: true
}
```

### Cell Object Structure
```javascript
{
  isRevealed: false,
  isThreat: false,      // probe droid or rebel base
  isTargeted: false,    // has target lock
  adjacentThreats: 0,   // 0-8
  row: 0,
  col: 0
}
```

### LocalStorage Schema
```javascript
// Current game (single object)
localStorage.setItem('pds_current_game', JSON.stringify({
  grid,
  gameStatus,
  difficulty,
  theme,
  timer,
  threatsRemaining,
  timestamp: Date.now()
}));

// History (lightweight stats)
localStorage.setItem('pds_stats', JSON.stringify({
  gamesPlayed: 0,
  gamesWon: 0,
  currentStreak: 0,
  bestTimes: {
    easy: null,
    medium: null,
    hard: null
  }
}));

// User preferences
localStorage.setItem('pds_preferences', JSON.stringify({
  theme: 'rebel',
  lastDifficulty: 'medium'
}));
```

---

## Custom SVG Components

### 1. Probe Droid (Imperial threat in Rebel mode)
- Iconic floating sphere with sensors
- Mechanical arms/antennae
- Dark metallic colors

### 2. Rebel Base (Rebel threat in Imperial mode)
- Shield generator structure
- Communication arrays
- Rebel orange/tan colors

### 3. Target Lock
- Circular targeting reticle
- Crosshairs
- Two variants: Rebel (orange) and Imperial (red)

### 4. Rebel Alliance Symbol
- Starbird logo
- For UI elements

### 5. Imperial Symbol
- Imperial crest/cog
- For UI elements

### 6. Explosion (optional)
- Small blast effect for game over

---

## UI/UX Design

### Color Palettes

**Rebel Theme (Hoth)**
```css
--rebel-bg: #e8f1f5;
--rebel-primary: #ff6b35;
--rebel-secondary: #004e89;
--rebel-text: #1a1a2e;
--rebel-cell-bg: #ffffff;
--rebel-cell-border: #c0d6df;
--rebel-ice-accent: #7fb3d5;
```

**Imperial Theme**
```css
--imperial-bg: #1a1a1a;
--imperial-primary: #cc0000;
--imperial-secondary: #4a4a4a;
--imperial-text: #e0e0e0;
--imperial-cell-bg: #2a2a2a;
--imperial-cell-border: #404040;
--imperial-accent: #666666;
```

### Layout
- Centered game board
- Header with theme toggle
- Timer and threat counter flanking reset button
- Difficulty selector above grid
- Stats panel (collapsible) below grid

---

## Game Flow

1. **Initial Load**
   - Check localStorage for saved preferences
   - Load last theme preference
   - Show welcome state or resume prompt if game exists

2. **Starting New Game**
   - Select difficulty
   - Generate grid (don't place threats yet)
   - Reset timer
   - Set game status to 'idle'

3. **First Click**
   - Place threats (ensuring first click is safe)
   - Calculate all adjacent threat counts
   - Start timer
   - Set game status to 'playing'
   - Reveal clicked cell (and neighbors if 0)

4. **During Gameplay**
   - Auto-save state on each move
   - Update threat counter when target locks placed
   - Flood fill reveal for empty cells

5. **Game End**
   - Win: All non-threat cells revealed
   - Loss: Threat revealed
   - Update stats in localStorage
   - Show appropriate message
   - Offer restart

---

## Development Phases

### Phase 1: Project Setup
- [x] Plan documentation
- [ ] Initialize Vite + React project
- [ ] Set up project structure
- [ ] Install dependencies (lucide-react)

### Phase 2: Core SVG Assets
- [ ] Create ProbeDroid.jsx
- [ ] Create RebelBase.jsx
- [ ] Create TargetLock.jsx
- [ ] Create RebelSymbol.jsx
- [ ] Create ImperialSymbol.jsx

### Phase 3: Game Logic
- [ ] Implement grid generation
- [ ] Implement threat placement algorithm
- [ ] Implement flood fill reveal
- [ ] Implement win/loss detection
- [ ] Create useGameState hook

### Phase 4: UI Components
- [ ] Build Cell component
- [ ] Build Grid component
- [ ] Build Header component
- [ ] Build DifficultySelector component
- [ ] Build ThemeToggle component

### Phase 5: Theme System
- [ ] Set up CSS variables for both themes
- [ ] Implement theme context/state
- [ ] Apply theme classes dynamically
- [ ] Smooth transitions

### Phase 6: Persistence
- [ ] Create useLocalStorage hook
- [ ] Implement game state save/load
- [ ] Implement stats tracking
- [ ] Implement preferences save/load
- [ ] Add resume game prompt

### Phase 7: Polish
- [ ] Add animations
- [ ] Responsive design
- [ ] Sound effects (optional)
- [ ] Test all features
- [ ] Performance optimization

---

## Future Enhancements (Post-MVP)
- Sound effects (Star Wars themed)
- Particle effects on win/loss
- Custom grid sizes
- Leaderboard
- Share results
- More themes (Tatooine, Endor, Death Star)
- Accessibility improvements

---

## Success Criteria
- ✅ Fully functional minesweeper mechanics
- ✅ Both themes working with smooth toggle
- ✅ All three difficulty levels
- ✅ Game state persists across sessions
- ✅ Stats tracking works correctly
- ✅ Responsive on desktop and mobile
- ✅ Clean, Star Wars themed UI
