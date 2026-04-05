import { RotateCcw, Play, Trophy, X } from 'lucide-react'
import './Header.css'

function Header({ threatsRemaining, seconds, onReset, gameStatus }) {
  const formatTime = (sec) => {
    const mins = Math.floor(sec / 60)
    const secs = sec % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getStatusIcon = () => {
    switch (gameStatus) {
      case 'won':
        return <Trophy size={18} className="status-icon won" />
      case 'lost':
        return <X size={18} className="status-icon lost" />
      default:
        return <Play size={18} className="status-icon playing" />
    }
  }

  return (
    <div className="game-header">
      <div className="game-stat">
        <span className="stat-label">Threats</span>
        <span className="stat-value">{threatsRemaining.toString().padStart(3, '0')}</span>
      </div>

      <button className="reset-button" onClick={onReset} title="New Game">
        {getStatusIcon()}
        <RotateCcw size={18} />
      </button>

      <div className="game-stat">
        <span className="stat-label">Time</span>
        <span className="stat-value">{formatTime(seconds)}</span>
      </div>
    </div>
  )
}

export default Header
