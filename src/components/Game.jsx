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
      <Header
        threatsRemaining={threatsRemaining}
        seconds={seconds}
        onReset={handleReset}
        gameStatus={gameStatus}
      />

      <div className="game-play-area">
        <div className="game-side-panel">
          <div className="game-info">
            <div className="game-description">
              {theme === 'rebel' ? (
                <>
                  <Search size={16} />
                  <span>Hunt Probe Droids</span>
                </>
              ) : (
                <>
                  <Crosshair size={16} />
                  <span>Find Rebel Bases</span>
                </>
              )}
            </div>
          </div>

          <DifficultySelector
            currentDifficulty={difficulty}
            onSelect={handleDifficultyChange}
            disabled={gameStatus === GAME_STATUS.PLAYING}
          />

          {(gameStatus === GAME_STATUS.WON || gameStatus === GAME_STATUS.LOST) && (
            <div className={`game-message ${gameStatus === GAME_STATUS.WON ? 'win-message' : 'loss-message'}`}>
              {gameStatus === GAME_STATUS.WON ? (
                <>
                  <Trophy size={28} />
                  <h3>Victory!</h3>
                  <p>{theme === 'rebel' ? 'All probe droids located!' : 'All bases destroyed!'}</p>
                  <p className="game-time">{Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2, '0')}</p>
                </>
              ) : (
                <>
                  <AlertCircle size={28} />
                  <h3>Failed!</h3>
                  <p>{theme === 'rebel' ? 'Probe droid detected you!' : 'Rebels destroyed scanner!'}</p>
                </>
              )}
            </div>
          )}
        </div>

        <Grid
          grid={grid}
          theme={theme}
          onCellClick={handleCellClick}
          onCellRightClick={handleCellRightClick}
        />
      </div>
    </div>
  )
}

export default Game
