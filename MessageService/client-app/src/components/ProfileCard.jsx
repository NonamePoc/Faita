import React from 'react'

function ProfileCard() {
  return (
    <figure className='card profileCard'>
      <img
        className='profileCard__img'
        src='https://picsum.photos/200'
        alt='avatar'
      />
      <figcaption className='profileCard__caption'>ProfileName_001</figcaption>
    </figure>
  )
}

export default ProfileCard
