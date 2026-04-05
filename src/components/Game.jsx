import { useState } from 'react'
import './Game.css'

function Game({ theme }) {
  return (
    <div className="game-container">
      <div className="game-info">
        <p>{theme === 'rebel' ? '🔍 Hunt Imperial Probe Droids on Hoth' : '🎯 Locate Rebel Bases in Deep Space'}</p>
      </div>
      <div className="game-board">
        <p>Game board coming soon...</p>
      </div>
    </div>
  )
}

export default Game
