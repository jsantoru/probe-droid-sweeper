import Cell from './Cell'
import './Grid.css'

function Grid({ grid, theme, onCellClick, onCellRightClick }) {
  return (
    <div className="grid-container">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${grid[0]?.length || 0}, 30px)`,
          gridTemplateRows: `repeat(${grid.length}, 30px)`
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell) => (
            <Cell
              key={`${cell.row}-${cell.col}`}
              cell={cell}
              theme={theme}
              onClick={onCellClick}
              onRightClick={onCellRightClick}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default Grid
