import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { setAvatar } from '../utils/setAvatar'

function UserMiniCard() {
  const user = useSelector((state) => state.user)
  return (
    <Link to={`/profile/${user.userName}`} aria-label='View Profile'>
      <figure className='card profileCard'>
        <img
          className='profileCard__img'
          src={setAvatar(user.avatar)}
          alt='avatar'
        />
        <figcaption className='profileCard__caption'>
          {user.userName}
        </figcaption>
      </figure>
    </Link>
  )
}

export default UserMiniCard
