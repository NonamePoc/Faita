import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

function ThemeSwitcher() {
  const inputRef = React.useRef(null)
  const { theme } = useSelector((state) => state.theme)
  const dispatch = useDispatch()

  const toggleTheme = () => dispatch({ type: 'TOGGLE_THEME' })

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
