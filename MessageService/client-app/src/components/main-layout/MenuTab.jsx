import React from 'react'
import { Link } from 'react-router-dom'
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
  const [activeItem, setActiveItem] = React.useState(0)

  const onClickItem = (index) => {
    setActiveItem(index)
  }

  return (
    <nav className='card menu'>
      <ul>
        {items.map((item, index) => (
          <Link
            key={index}
            to={links[index]}
            onClick={() => onClickItem(index)}
          >
            <li
              className={`menu__item  ${activeItem === index ? 'active' : ''}`}
            >
              <img
                src={`${
                  activeItem === index ? iconsHover[index] : icons[index]
                }`}
                alt='Menu Item'
              />
              {item}
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  )
}

export default MenuTab
