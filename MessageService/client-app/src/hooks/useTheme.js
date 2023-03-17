import React from 'react'
import ThemeContext from '../contexts/ThemeContext'

function useTheme() {
  const { theme, toggleTheme } = React.useContext(ThemeContext)

  React.useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  return {
    theme,
    toggleTheme,
  }
}

export default useTheme
