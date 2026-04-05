import { useState, useCallback } from 'react'
import { DIFFICULTY, GAME_STATUS } from '../utils/constants'
import {
  createEmptyGrid,
  placeThreats,
  calculateAdjacentThreats,
  revealCell,
  toggleTarget,
  checkWin,
  revealAllThreats,
  countRemainingThreats
} from '../utils/gameLogic'

export function useGameState(difficulty = 'medium') {
  const config = DIFFICULTY[difficulty]

  const [grid, setGrid] = useState(() => createEmptyGrid(config.rows, config.cols))
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.IDLE)
  const [isFirstClick, setIsFirstClick] = useState(true)
  const [threatsRemaining, setThreatsRemaining] = useState(config.threats)

  // Initialize new game
  const initGame = useCallback((newDifficulty) => {
    const newConfig = DIFFICULTY[newDifficulty || difficulty]
    const newGrid = createEmptyGrid(newConfig.rows, newConfig.cols)

    setGrid(newGrid)
    setGameStatus(GAME_STATUS.IDLE)
    setIsFirstClick(true)
    setThreatsRemaining(newConfig.threats)
  }, [difficulty])

  // Handle cell click (reveal)
  const handleCellClick = useCallback((row, col) => {
    if (gameStatus === GAME_STATUS.WON || gameStatus === GAME_STATUS.LOST) {
      return
    }

    setGrid(prevGrid => {
      const newGrid = prevGrid.map(r => r.map(c => ({ ...c })))
      const cell = newGrid[row][col]

      // Can't click revealed or targeted cells
      if (cell.isRevealed || cell.isTargeted) {
        return prevGrid
      }

      // First click - set up the game
      if (isFirstClick) {
        placeThreats(newGrid, config.threats, row, col)
        calculateAdjacentThreats(newGrid)
        setIsFirstClick(false)
        setGameStatus(GAME_STATUS.PLAYING)
      }

      // Check if clicked a threat
      if (cell.isThreat) {
        revealAllThreats(newGrid)
        setGameStatus(GAME_STATUS.LOST)
        return newGrid
      }

      // Reveal the cell (and neighbors if empty)
      revealCell(newGrid, row, col)

      // Check for win
      if (checkWin(newGrid)) {
        setGameStatus(GAME_STATUS.WON)
      }

      return newGrid
    })
  }, [gameStatus, isFirstClick, config.threats])

  // Handle right click (target lock)
  const handleCellRightClick = useCallback((row, col) => {
    if (gameStatus === GAME_STATUS.WON || gameStatus === GAME_STATUS.LOST) {
      return
    }

    setGrid(prevGrid => {
      const newGrid = prevGrid.map(r => r.map(c => ({ ...c })))
      toggleTarget(newGrid, row, col)
      setThreatsRemaining(countRemainingThreats(newGrid, config.threats))
      return newGrid
    })
  }, [gameStatus, config.threats])

  // Load saved game state
  const loadGameState = useCallback((savedState) => {
    if (!savedState) return

    setGrid(savedState.grid)
    setGameStatus(savedState.gameStatus)
    setIsFirstClick(savedState.isFirstClick)
    setThreatsRemaining(savedState.threatsRemaining)
  }, [])

  // Get current game state for saving
  const getGameState = useCallback(() => {
    return {
      grid,
      gameStatus,
      isFirstClick,
      threatsRemaining,
      difficulty,
      timestamp: Date.now()
    }
  }, [grid, gameStatus, isFirstClick, threatsRemaining, difficulty])

  return {
    grid,
    gameStatus,
    threatsRemaining,
    isFirstClick,
    handleCellClick,
    handleCellRightClick,
    initGame,
    loadGameState,
    getGameState
  }
}
