import { useState } from 'react'
import './App.css'
import Game from './components/Game'

function App() {
  const [theme, setTheme] = useState('rebel')

  const toggleTheme = () => {
    setTheme(prev => prev === 'rebel' ? 'imperial' : 'rebel')
  }

  return (
    <div className={`app ${theme}-theme`}>
      <header className="app-header">
        <h1>Probe Droid Sweeper</h1>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'rebel' ? '⚪ Rebel Alliance' : '⚫ Galactic Empire'}
        </button>
      </header>
      <Game theme={theme} />
    </div>
  )
}

export default App
