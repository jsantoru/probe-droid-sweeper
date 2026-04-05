import { RotateCcw } from 'lucide-react'
import './Header.css'

function Header({ threatsRemaining, seconds, onReset, gameStatus }) {
  const formatTime = (sec) => {
    const mins = Math.floor(sec / 60)
    const secs = sec % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getStatusEmoji = () => {
    switch (gameStatus) {
      case 'won':
        return '🎉'
      case 'lost':
        return '💥'
      default:
        return '🎮'
    }
  }

  return (
    <div className="game-header">
      <div className="game-stat">
        <span className="stat-label">Threats</span>
        <span className="stat-value">{threatsRemaining.toString().padStart(3, '0')}</span>
      </div>

      <button className="reset-button" onClick={onReset} title="New Game">
        <span className="status-emoji">{getStatusEmoji()}</span>
        <RotateCcw size={20} />
      </button>

      <div className="game-stat">
        <span className="stat-label">Time</span>
        <span className="stat-value">{formatTime(seconds)}</span>
      </div>
    </div>
  )
}

export default Header
