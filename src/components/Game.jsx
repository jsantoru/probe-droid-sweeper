import { useState, useEffect } from 'react'
import { GAME_STATUS } from '../utils/constants'
import { useGameState } from '../hooks/useGameState'
import { useTimer } from '../hooks/useTimer'
import Grid from './Grid'
import Header from './Header'
import DifficultySelector from './DifficultySelector'
import './Game.css'

function Game({ theme }) {
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

  const handleReset = () => {
    initGame(difficulty)
    resetTimer()
  }

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty)
    initGame(newDifficulty)
    resetTimer()
  }

  useEffect(() => {
    // Initialize game on mount
    initGame(difficulty)
  }, [])

  return (
    <div className="game-container">
      <div className="game-info">
        <p className="game-description">
          {theme === 'rebel'
            ? '🔍 Hunt Imperial Probe Droids on Hoth'
            : '🎯 Locate Rebel Bases in Deep Space'}
        </p>
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
          <h2>Victory!</h2>
          <p>{theme === 'rebel' ? 'All probe droids located!' : 'All rebel bases destroyed!'}</p>
          <p>Time: {Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2, '0')}</p>
        </div>
      )}

      {gameStatus === GAME_STATUS.LOST && (
        <div className="game-message loss-message">
          <h2>Mission Failed!</h2>
          <p>{theme === 'rebel' ? 'A probe droid detected you!' : 'Rebel forces destroyed your scanner!'}</p>
        </div>
      )}
    </div>
  )
}

export default Game
