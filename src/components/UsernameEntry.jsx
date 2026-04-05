import { useState } from 'react'
import { User } from 'lucide-react'
import './UsernameEntry.css'

function UsernameEntry({ onSubmit, existingUsers }) {
  const [username, setUsername] = useState('')
  const [showExisting, setShowExisting] = useState(existingUsers.length > 0)

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = username.trim()
    if (trimmed) {
      onSubmit(trimmed)
    }
  }

  const handleSelectUser = (user) => {
    onSubmit(user)
  }

  return (
    <div className="username-overlay">
      <div className="username-modal">
        <div className="username-header">
          <User size={48} />
          <h2>Probe Droid Sweeper</h2>
          <p>Enter your username to begin</p>
        </div>

        {showExisting && existingUsers.length > 0 && (
          <div className="existing-users">
            <h3>Continue as:</h3>
            <div className="user-list">
              {existingUsers.map(user => (
                <button
                  key={user}
                  className="user-button"
                  onClick={() => handleSelectUser(user)}
                >
                  <User size={16} />
                  {user}
                </button>
              ))}
            </div>
            <button
              className="toggle-button"
              onClick={() => setShowExisting(false)}
            >
              Or create new user
            </button>
          </div>
        )}

        {(!showExisting || existingUsers.length === 0) && (
          <form onSubmit={handleSubmit} className="username-form">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="username-input"
              autoFocus
              maxLength={20}
            />
            <button type="submit" className="username-submit" disabled={!username.trim()}>
              Start Playing
            </button>
            {existingUsers.length > 0 && (
              <button
                type="button"
                className="toggle-button"
                onClick={() => setShowExisting(true)}
              >
                Back to user list
              </button>
            )}
          </form>
        )}
      </div>
    </div>
  )
}

export default UsernameEntry
