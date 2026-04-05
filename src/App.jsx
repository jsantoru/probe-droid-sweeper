import { useState } from 'react'
import './App.css'
import Game from './components/Game'
import Sidebar from './components/Sidebar'
import RebelSymbol from './icons/RebelSymbol'
import ImperialSymbol from './icons/ImperialSymbol'
import { useGamePreferences, useGameStats } from './hooks/useLocalStorage'

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
          <h1>
            {theme === 'rebel' ? (
              <RebelSymbol size={28} className="header-logo" />
            ) : (
              <ImperialSymbol size={28} className="header-logo" />
            )}
            Probe Droid Sweeper
          </h1>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'rebel' ? (
              <>
                <ImperialSymbol size={20} className="theme-toggle-icon" />
                <span>Switch to Empire</span>
              </>
            ) : (
              <>
                <RebelSymbol size={20} className="theme-toggle-icon" />
                <span>Switch to Rebels</span>
              </>
            )}
          </button>
        </header>

        <Game theme={theme} onGameComplete={handleGameComplete} />
      </div>
    </div>
  )
}

export default App
