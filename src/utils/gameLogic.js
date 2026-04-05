// Create initial empty grid
export function createEmptyGrid(rows, cols) {
  const grid = []
  for (let row = 0; row < rows; row++) {
    grid[row] = []
    for (let col = 0; col < cols; col++) {
      grid[row][col] = {
        row,
        col,
        isRevealed: false,
        isThreat: false,
        isTargeted: false,
        adjacentThreats: 0
      }
    }
  }
  return grid
}

// Place threats randomly, avoiding the first clicked cell and its neighbors
export function placeThreats(grid, threatCount, firstClickRow, firstClickCol) {
  const rows = grid.length
  const cols = grid[0].length
  const safeZone = new Set()

  // Mark first click and all adjacent cells as safe
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      const r = firstClickRow + dr
      const c = firstClickCol + dc
      if (r >= 0 && r < rows && c >= 0 && c < cols) {
        safeZone.add(`${r},${c}`)
      }
    }
  }

  let threatsPlaced = 0
  while (threatsPlaced < threatCount) {
    const row = Math.floor(Math.random() * rows)
    const col = Math.floor(Math.random() * cols)
    const key = `${row},${col}`

    if (!grid[row][col].isThreat && !safeZone.has(key)) {
      grid[row][col].isThreat = true
      threatsPlaced++
    }
  }

  return grid
}

// Calculate adjacent threat counts for all cells
export function calculateAdjacentThreats(grid) {
  const rows = grid.length
  const cols = grid[0].length

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!grid[row][col].isThreat) {
        let count = 0

        // Check all 8 adjacent cells
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue

            const r = row + dr
            const c = col + dc

            if (r >= 0 && r < rows && c >= 0 && c < cols) {
              if (grid[r][c].isThreat) {
                count++
              }
            }
          }
        }

        grid[row][col].adjacentThreats = count
      }
    }
  }

  return grid
}

// Flood fill reveal for empty cells (0 adjacent threats)
export function revealCell(grid, row, col) {
  const rows = grid.length
  const cols = grid[0].length

  // Out of bounds check
  if (row < 0 || row >= rows || col < 0 || col >= cols) {
    return grid
  }

  const cell = grid[row][col]

  // Don't reveal if already revealed, targeted, or is a threat
  if (cell.isRevealed || cell.isTargeted || cell.isThreat) {
    return grid
  }

  // Reveal this cell
  cell.isRevealed = true

  // If this cell has no adjacent threats, recursively reveal neighbors
  if (cell.adjacentThreats === 0) {
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue
        revealCell(grid, row + dr, col + dc)
      }
    }
  }

  return grid
}

// Check if game is won (all non-threat cells revealed)
export function checkWin(grid) {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const cell = grid[row][col]
      if (!cell.isThreat && !cell.isRevealed) {
        return false
      }
    }
  }
  return true
}

// Reveal all threats (for game over state)
export function revealAllThreats(grid) {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col].isThreat) {
        grid[row][col].isRevealed = true
      }
    }
  }
  return grid
}

// Toggle target lock on a cell
export function toggleTarget(grid, row, col) {
  const cell = grid[row][col]

  // Can't target revealed cells
  if (!cell.isRevealed) {
    cell.isTargeted = !cell.isTargeted
  }

  return grid
}

// Count remaining threats (total threats - targeted cells)
export function countRemainingThreats(grid, totalThreats) {
  let targetedCount = 0

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col].isTargeted) {
        targetedCount++
      }
    }
  }

  return totalThreats - targetedCount
}
