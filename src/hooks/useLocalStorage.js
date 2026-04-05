import { useState, useEffect } from 'react'

export function useLocalStorage(key, initialValue) {
  // Get initial value from localStorage or use provided initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error)
      return initialValue
    }
  })

  // Update localStorage when value changes
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error)
    }
  }

  return [storedValue, setValue]
}

// Specific hooks for game data
export function useGamePreferences() {
  return useLocalStorage('pds_preferences', {
    theme: 'rebel',
    lastDifficulty: 'medium'
  })
}

export function useGameStats() {
  return useLocalStorage('pds_stats', {
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    bestStreak: 0,
    bestTimes: {
      easy: null,
      medium: null,
      hard: null
    }
  })
}

export function useCurrentGame() {
  return useLocalStorage('pds_current_game', null)
}
