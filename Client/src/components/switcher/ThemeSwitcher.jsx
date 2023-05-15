import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../../redux/slices/theme'

function ThemeSwitcher() {
  const inputRef = React.useRef(null)
  const theme = useSelector((state) => state.theme.theme)
  const dispatch = useDispatch()

  React.useEffect(() => {
    inputRef.current.checked = theme === 'dark'
  }, [theme])

  return (
    <div className='theme-switch'>
      <input
        ref={inputRef}
        id='checkbox'
        type='checkbox'
        aria-label='theme switcher'
        onClick={() => dispatch(toggleTheme())}
      />
    </div>
  )
}

export default ThemeSwitcher
