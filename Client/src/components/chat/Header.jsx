import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { setAvatar } from '../../utils/setAvatar'

function Header({ room }) {
  const user = useSelector((state) => state.user)
  const receiver = room.users.$values.find((u) => u.userId !== user.id)
  const { avatar, userName } = receiver

  return (
    <figure className='card chatroom__header'>
      <Link to='/chat'>
        <svg
          width='45'
          height='45'
          viewBox='0 0 45 45'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            opacity='0.4'
            d='M41.25 22.5C41.25 12.1448 32.8552 3.75 22.5 3.75C12.1447 3.75 3.75 12.1448 3.75 22.5C3.75 32.8553 12.1447 41.25 22.5 41.25C32.8552 41.25 41.25 32.8553 41.25 22.5Z'
          />
          <path
            d='M20.5686 15.8822L14.9436 21.5072C14.3999 22.0509 14.3999 22.9509 14.9436 23.4947L20.5686 29.1198C21.1123 29.6635 22.0123 29.6635 22.5561 29.1198C23.0998 28.576 23.0998 27.676 22.5561 27.1323L19.3311 23.9072H29.0623C29.8311 23.9072 30.4686 23.2697 30.4686 22.5009C30.4686 21.7322 29.8311 21.0947 29.0623 21.0947H19.3311L22.5561 17.8697C22.8373 17.5884 22.9686 17.2322 22.9686 16.8759C22.9686 16.5197 22.8373 16.1634 22.5561 15.8822C22.0123 15.3384 21.1123 15.3384 20.5686 15.8822Z'
            fill='#2176E6'
          />
        </svg>
      </Link>
      <Link to={`/profile/${userName}`}>
        <img
          className='chatroom__header__img'
          src={setAvatar(avatar)}
          alt='profile-img'
        />
      </Link>
      <figcaption className='chatroom__header__info'>
        <h1 className='name'>{userName}</h1>
        <div className='status'>
          <div className='statusCircle'></div>
          <p className='status__text'>online</p>
        </div>
      </figcaption>
    </figure>
  )
}

export default Header
