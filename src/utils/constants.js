// Difficulty configurations matching classic Minesweeper
export const DIFFICULTY = {
  easy: {
    rows: 9,
    cols: 9,
    threats: 10,
    label: 'Easy'
  },
  medium: {
    rows: 16,
    cols: 16,
    threats: 40,
    label: 'Medium'
  },
  hard: {
    rows: 16,
    cols: 30,
    threats: 99,
    label: 'Hard'
  }
}

export const GAME_STATUS = {
  IDLE: 'idle',
  PLAYING: 'playing',
  WON: 'won',
  LOST: 'lost'
}
