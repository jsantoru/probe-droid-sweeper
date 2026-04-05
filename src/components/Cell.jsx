import ProbeDroid from '../icons/ProbeDroid'
import RebelBase from '../icons/RebelBase'
import TargetLock from '../icons/TargetLock'
import './Cell.css'

function Cell({ cell, theme, onClick, onRightClick }) {
  const handleClick = () => {
    onClick(cell.row, cell.col)
  }

  const handleContextMenu = (e) => {
    e.preventDefault()
    onRightClick(cell.row, cell.col)
  }

  const getThreatIcon = () => {
    return theme === 'rebel' ? (
      <ProbeDroid size={20} />
    ) : (
      <RebelBase size={20} />
    )
  }

  const getNumberColor = (num) => {
    const colors = {
      1: '#0000ff',
      2: '#008000',
      3: '#ff0000',
      4: '#000080',
      5: '#800000',
      6: '#008080',
      7: '#000000',
      8: '#808080'
    }
    return colors[num] || '#000'
  }

  return (
    <div
      className={`cell ${cell.isRevealed ? 'revealed' : 'unrevealed'} ${theme}-cell`}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      {cell.isTargeted && !cell.isRevealed && (
        <TargetLock size={16} variant={theme} />
      )}

      {cell.isRevealed && (
        <>
          {cell.isThreat ? (
            getThreatIcon()
          ) : cell.adjacentThreats > 0 ? (
            <span
              className="cell-number"
              style={{ color: getNumberColor(cell.adjacentThreats) }}
            >
              {cell.adjacentThreats}
            </span>
          ) : null}
        </>
      )}
    </div>
  )
}

export default Cell
