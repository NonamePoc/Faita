import React from 'react'
import ThemeContext from '../contexts/ThemeContext'

function ThemeSwitcher() {
  const { toggleTheme } = React.useContext(ThemeContext)

  return (
    <div className='theme-switch'>
      <input onClick={toggleTheme} id='checkbox' type='checkbox' />
    </div>
  )
}

export default ThemeSwitcher
