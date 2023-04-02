import React from 'react'
import ThemeSwitcher from '../switcher/ThemeSwitcher'
import { logo } from '../../assets'

function Header() {
  return (
    <header className='header'>
      <img width='115' height='50' src={logo} alt='Faita logo' />
      <div className='flex'>
        <ThemeSwitcher />
        <img
          className='avatar'
          src='https://i0.wp.com/www.printmag.com/wp-content/uploads/2021/02/4cbe8d_f1ed2800a49649848102c68fc5a66e53mv2.gif?fit=476%2C280&ssl=1'
          alt='avatar'
        />
      </div>
    </header>
  )
}

export default Header
