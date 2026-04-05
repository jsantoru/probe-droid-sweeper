import { useState } from 'react'
import './App.css'
import Game from './components/Game'
import Sidebar from './components/Sidebar'
import DifficultySelector from './components/DifficultySelector'
import { useGamePreferences, useGameStats } from './hooks/useLocalStorage'

const REBEL_LOGO = 'https://1000logos.net/wp-content/uploads/2017/08/Rebel-Alliance-Emblem.jpg'
const IMPERIAL_LOGO = 'https://logos-world.net/wp-content/uploads/2021/12/Galactic-Empire-Logo.png'

function App() {
  const [preferences, setPreferences] = useGamePreferences()
  const [stats, setStats] = useGameStats()
  const [gameHistory, setGameHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('pds_game_history')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  const [difficulty, setDifficulty] = useState('medium')
  const [isGameActive, setIsGameActive] = useState(false)

  const theme = preferences.theme || 'rebel'

  const toggleTheme = () => {
    const newTheme = theme === 'rebel' ? 'imperial' : 'rebel'
    setPreferences({ ...preferences, theme: newTheme })
  }

  const handleGameComplete = (gameResult) => {
    // Update stats
    const newStats = {
      ...stats,
      gamesPlayed: stats.gamesPlayed + 1,
      gamesWon: gameResult.won ? stats.gamesWon + 1 : stats.gamesWon,
      currentStreak: gameResult.won ? stats.currentStreak + 1 : 0,
      bestStreak: gameResult.won
        ? Math.max(stats.bestStreak, stats.currentStreak + 1)
        : stats.bestStreak
    }

    // Update best time if won
    if (gameResult.won) {
      const currentBest = newStats.bestTimes[gameResult.difficulty]
      if (!currentBest || gameResult.time < currentBest) {
        newStats.bestTimes[gameResult.difficulty] = gameResult.time
      }
    }

    setStats(newStats)

    // Add to game history
    const newHistory = [gameResult, ...gameHistory]
    setGameHistory(newHistory)
    localStorage.setItem('pds_game_history', JSON.stringify(newHistory))
  }

  return (
    <div className={`app ${theme}-theme`}>
      <Sidebar gameHistory={gameHistory} stats={stats} theme={theme} />

      <div className="main-content">
        <header className="app-header">
          <div className="header-left">
            <h1>
              <img
                src={theme === 'rebel' ? REBEL_LOGO : IMPERIAL_LOGO}
                alt={theme === 'rebel' ? 'Rebel Alliance' : 'Galactic Empire'}
                className="header-logo"
              />
              Probe Droid Sweeper
            </h1>
          </div>

          <div className="header-center">
            <DifficultySelector
              currentDifficulty={difficulty}
              onSelect={setDifficulty}
              disabled={isGameActive}
            />
          </div>

          <div className="header-right">
            <button className="theme-toggle" onClick={toggleTheme}>
              <img
                src={theme === 'rebel' ? REBEL_LOGO : IMPERIAL_LOGO}
                alt={theme === 'rebel' ? 'Rebel Alliance' : 'Galactic Empire'}
                className="theme-toggle-icon"
              />
              <span>{theme === 'rebel' ? 'Rebel Alliance' : 'Galactic Empire'}</span>
            </button>
          </div>
        </header>

        <Game
          theme={theme}
          difficulty={difficulty}
          onGameComplete={handleGameComplete}
          onGameStatusChange={setIsGameActive}
        />
      </div>
    </div>
  )
}

export default App
