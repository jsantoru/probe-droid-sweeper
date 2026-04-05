import { useState, useEffect, useRef } from 'react'
import { Search, Crosshair, Trophy, AlertCircle } from 'lucide-react'
import { GAME_STATUS } from '../utils/constants'
import { useGameState } from '../hooks/useGameState'
import { useTimer } from '../hooks/useTimer'
import Grid from './Grid'
import Header from './Header'
import DifficultySelector from './DifficultySelector'
import './Game.css'

function Game({ theme, onGameComplete }) {
  const [difficulty, setDifficulty] = useState('medium')
  const {
    grid,
    gameStatus,
    threatsRemaining,
    handleCellClick,
    handleCellRightClick,
    initGame
  } = useGameState(difficulty)

  const { seconds, reset: resetTimer } = useTimer(gameStatus === GAME_STATUS.PLAYING)
  const gameCompletedRef = useRef(false)

  const handleReset = () => {
    initGame(difficulty)
    resetTimer()
    gameCompletedRef.current = false
  }

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty)
    initGame(newDifficulty)
    resetTimer()
    gameCompletedRef.current = false
  }

  useEffect(() => {
    // Initialize game on mount
    initGame(difficulty)
  }, [])

  useEffect(() => {
    // Handle game completion
    if ((gameStatus === GAME_STATUS.WON || gameStatus === GAME_STATUS.LOST) && !gameCompletedRef.current) {
      gameCompletedRef.current = true
      if (onGameComplete) {
        onGameComplete({
          won: gameStatus === GAME_STATUS.WON,
          difficulty,
          time: seconds,
          timestamp: Date.now()
        })
      }
    }
  }, [gameStatus, difficulty, seconds, onGameComplete])

  return (
    <div className="game-container">
      <div className="game-info">
        <div className="game-description">
          {theme === 'rebel' ? (
            <>
              <Search size={20} />
              <span>Hunt Imperial Probe Droids on Hoth</span>
            </>
          ) : (
            <>
              <Crosshair size={20} />
              <span>Locate Rebel Bases in Deep Space</span>
            </>
          )}
        </div>
      </div>

      <DifficultySelector
        currentDifficulty={difficulty}
        onSelect={handleDifficultyChange}
        disabled={gameStatus === GAME_STATUS.PLAYING}
      />

      <Header
        threatsRemaining={threatsRemaining}
        seconds={seconds}
        onReset={handleReset}
        gameStatus={gameStatus}
      />

      <Grid
        grid={grid}
        theme={theme}
        onCellClick={handleCellClick}
        onCellRightClick={handleCellRightClick}
      />

      {gameStatus === GAME_STATUS.WON && (
        <div className="game-message win-message">
          <Trophy size={32} />
          <h2>Victory!</h2>
          <p>{theme === 'rebel' ? 'All probe droids located!' : 'All rebel bases destroyed!'}</p>
          <p className="game-time">Time: {Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2, '0')}</p>
        </div>
      )}

      {gameStatus === GAME_STATUS.LOST && (
        <div className="game-message loss-message">
          <AlertCircle size={32} />
          <h2>Mission Failed!</h2>
          <p>{theme === 'rebel' ? 'A probe droid detected you!' : 'Rebel forces destroyed your scanner!'}</p>
        </div>
      )}
    </div>
  )
}

export default Game
