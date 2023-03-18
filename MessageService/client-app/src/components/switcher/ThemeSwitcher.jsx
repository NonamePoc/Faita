import React from 'react'
import useTheme from '../../hooks/useTheme'

function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme()
  const inputRef = React.useRef()

  React.useEffect(() => {
    inputRef.current.checked = theme === 'dark'
  }, [theme])

  return (
    <div className='theme-switch'>
      <input
        ref={inputRef}
        id='checkbox'
        type='checkbox'
        onClick={toggleTheme}
      />
    </div>
  )
}

export default ThemeSwitcher
