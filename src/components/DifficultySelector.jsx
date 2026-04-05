import { DIFFICULTY } from '../utils/constants'
import './DifficultySelector.css'

function DifficultySelector({ currentDifficulty, onSelect, disabled }) {
  return (
    <div className="difficulty-selector">
      <span className="difficulty-label">Difficulty:</span>
      <div className="difficulty-buttons">
        {Object.keys(DIFFICULTY).map((key) => (
          <button
            key={key}
            className={`difficulty-btn ${currentDifficulty === key ? 'active' : ''}`}
            onClick={() => onSelect(key)}
            disabled={disabled}
          >
            {DIFFICULTY[key].label}
            <span className="difficulty-info">
              {DIFFICULTY[key].rows}×{DIFFICULTY[key].cols}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default DifficultySelector
