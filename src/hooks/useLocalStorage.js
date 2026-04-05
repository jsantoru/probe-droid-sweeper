import { useState } from 'react'

const USERS_KEY = 'pds_users'
const CURRENT_USER_KEY = 'pds_current_user'

// User management utilities
export function getAllUsers() {
  try {
    const users = localStorage.getItem(USERS_KEY)
    return users ? JSON.parse(users) : {}
  } catch (error) {
    console.error('Error loading users:', error)
    return {}
  }
}

export function getUsernames() {
  return Object.keys(getAllUsers())
}

export function getCurrentUsername() {
  return localStorage.getItem(CURRENT_USER_KEY)
}

export function setCurrentUsername(username) {
  localStorage.setItem(CURRENT_USER_KEY, username)

  // Initialize user data if doesn't exist
  const users = getAllUsers()
  if (!users[username]) {
    users[username] = {
      preferences: {
        theme: 'rebel',
        lastDifficulty: 'medium'
      },
      stats: {
        gamesPlayed: 0,
        gamesWon: 0,
        currentStreak: 0,
        bestStreak: 0,
        bestTimes: {
          easy: null,
          medium: null,
          hard: null
        }
      },
      history: []
    }
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
  }
}

export function clearCurrentUser() {
  localStorage.removeItem(CURRENT_USER_KEY)
}

// Generic hook for user-specific data
function useUserData(dataKey, initialValue) {
  const username = getCurrentUsername()

  const [storedValue, setStoredValue] = useState(() => {
    if (!username) return initialValue

    try {
      const users = getAllUsers()
      const userData = users[username]
      return userData && userData[dataKey] !== undefined ? userData[dataKey] : initialValue
    } catch (error) {
      console.error(`Error loading ${dataKey} for user ${username}:`, error)
      return initialValue
    }
  })

  const setValue = (value) => {
    if (!username) return

    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)

      const users = getAllUsers()
      if (!users[username]) {
        users[username] = {}
      }
      users[username][dataKey] = valueToStore
      localStorage.setItem(USERS_KEY, JSON.stringify(users))
    } catch (error) {
      console.error(`Error saving ${dataKey} for user ${username}:`, error)
    }
  }

  return [storedValue, setValue]
}

// Specific hooks for game data
export function useGamePreferences() {
  return useUserData('preferences', {
    theme: 'rebel',
    lastDifficulty: 'medium'
  })
}

export function useGameStats() {
  return useUserData('stats', {
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

export function useGameHistory() {
  return useUserData('history', [])
}
