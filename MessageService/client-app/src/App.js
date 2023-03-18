import React from 'react'
import Router from './router'
import ThemeContext from './contexts/ThemeContext'

function App() {
  const [theme, setTheme] = React.useState(() => {
    return localStorage.getItem('theme') || 'light'
  })

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme}>
        <Router />
      </div>
    </ThemeContext.Provider>
  )
}

export default App
