import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  home,
  friends,
  chat,
  user,
  settings,
  homeHover,
  friendsHover,
  chatHover,
  userHover,
  settingsHover,
} from '../../assets'

const items = ['Home', 'Friends', 'Chat', 'Profile', 'Settings']
const icons = [home, friends, chat, user, settings]
const iconsHover = [
  homeHover,
  friendsHover,
  chatHover,
  userHover,
  settingsHover,
]
const links = ['/', '/friends', '/chat', '/profile', '/settings']

function MenuTab() {
  const [activeItem, setActiveItem] = React.useState(null)

  React.useEffect(() => {
    setActiveItem(links.indexOf(window.location.pathname))
  }, [])

  return (
    <nav className='card menu'>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <NavLink
              className='menu__item'
              to={links[index]}
              onClick={() => setActiveItem(index)}
            >
              <img
                width={33}
                height={33}
                src={`${
                  activeItem === index ? iconsHover[index] : icons[index]
                }`}
                alt='Menu Item'
              />
              <span> {item} </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default MenuTab
