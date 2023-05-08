import React from 'react'
import { Link } from 'react-router-dom'
import { setAvatar } from '../../utils/setAvatar'

function ProfileItem({ friend }) {
  const { userName, avatar } = friend
  return (
    <Link to={`/profile/${userName}`}>
      <div className='friendsMini__item'>
        <img src={setAvatar(avatar)} alt='friend' />
        <h2>{userName}</h2>
      </div>
    </Link>
  )
}

export default React.memo(ProfileItem)
