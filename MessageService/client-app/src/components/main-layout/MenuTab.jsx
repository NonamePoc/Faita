import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setMenu } from '../../redux/reducers/menu'
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
  const dispatch = useDispatch()
  const activeItem = useSelector((state) => state.menu.activeItem)

  const onClickItem = React.useCallback(
    (index) => {
      dispatch(setMenu(index))
    },
    [dispatch]
  )

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
              <span> {item} </span>
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  )
}

export default MenuTab
