import React from 'react'
import { Link } from 'react-router-dom'

function UserMiniCard() {
  return (
    <Link to='/profile'>
      <figure className='card profileCard'>
        <img
          className='profileCard__img'
          src='https://picsum.photos/200'
          alt='avatar'
        />
        <figcaption className='profileCard__caption'>
          ProfileName_001
        </figcaption>
      </figure>
    </Link>
  )
}

export default UserMiniCard
