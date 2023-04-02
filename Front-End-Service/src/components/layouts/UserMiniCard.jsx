import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function UserMiniCard() {
  const user = useSelector((state) => state.user)
  return (
    <Link to='/profile' aria-labelledby='View Profile'>
      <figure className='card profileCard'>
        <img
          className='profileCard__img'
          src='https://i0.wp.com/www.printmag.com/wp-content/uploads/2021/02/4cbe8d_f1ed2800a49649848102c68fc5a66e53mv2.gif?fit=476%2C280&ssl=1'
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
