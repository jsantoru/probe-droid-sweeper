import { History, Trophy, Target, Clock, Calendar } from 'lucide-react'
import './Sidebar.css'

function Sidebar({ gameHistory, stats, theme }) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 60) return `${diffMins}m ago`
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`
    return date.toLocaleDateString()
  }

  return (
    <div className={`sidebar ${theme}-sidebar`}>
      <div className="sidebar-header">
        <History size={20} />
        <h2>Game History</h2>
      </div>

      <div className="sidebar-stats">
        <div className="stat-card">
          <Trophy size={16} />
          <div className="stat-content">
            <span className="stat-value">{stats.gamesWon}</span>
            <span className="stat-label">Wins</span>
          </div>
        </div>
        <div className="stat-card">
          <Target size={16} />
          <div className="stat-content">
            <span className="stat-value">{stats.gamesPlayed}</span>
            <span className="stat-label">Played</span>
          </div>
        </div>
      </div>

      <div className="best-times">
        <h3>Best Times</h3>
        <div className="time-list">
          {['easy', 'medium', 'hard'].map(diff => (
            <div key={diff} className="time-item">
              <span className="time-difficulty">{diff}</span>
              <span className="time-value">
                {stats.bestTimes[diff] ? formatTime(stats.bestTimes[diff]) : '--:--'}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="recent-games">
        <h3>Recent Games</h3>
        <div className="games-list">
          {gameHistory.length === 0 ? (
            <p className="empty-message">No games yet</p>
          ) : (
            gameHistory.slice(0, 10).map((game, index) => (
              <div key={index} className={`game-item ${game.won ? 'won' : 'lost'}`}>
                <div className="game-item-header">
                  <span className={`game-result ${game.won ? 'win' : 'loss'}`}>
                    {game.won ? 'Won' : 'Lost'}
                  </span>
                  <span className="game-difficulty">{game.difficulty}</span>
                </div>
                <div className="game-item-details">
                  <span className="game-time">
                    <Clock size={12} />
                    {formatTime(game.time)}
                  </span>
                  <span className="game-date">
                    <Calendar size={12} />
                    {formatDate(game.timestamp)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
