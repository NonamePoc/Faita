import React from 'react'
import ThemeSwitcher from '../components/switcher/ThemeSwitcher'
import { logo } from '../assets'
import { useSelector } from 'react-redux'
import { setAvatar } from '../utils/setAvatar'

function Header() {
  const userAvatar = useSelector((state) => state.user.avatar)
  return (
    <header className='header'>
      <img width='115' height='50' src={logo} alt='Faita logo' />
      <div className='flex'>
        <ThemeSwitcher />
        <img className='avatar' src={setAvatar(userAvatar)} alt='avatar' />
      </div>
    </header>
  )
}

export default Header
