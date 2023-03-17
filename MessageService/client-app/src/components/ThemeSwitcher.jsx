import React from 'react'
import useTheme from '../hooks/useTheme'

function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className='theme-switch'>
      <input
        onClick={toggleTheme}
        id='checkbox'
        type='checkbox'
        defaultChecked={theme === 'dark'}
      />
    </div>
  )
}

export default ThemeSwitcher
