import React from 'react'
import { setAvatar } from '../../utils/setAvatar'
import Button from './Button'

function UserInfo({ user }) {
  return (
    <section className='card profile'>
      <div className='profile__topColor' />
      <img
        className='profile__photo avatar'
        src={setAvatar(user.avatar)}
        alt='avatar'
      />
      <div className='profile__info'>
        <h1 className='profile__name'>{user.userName}</h1>
        <p className='profile__descr'>
          {user.firstName} {user.lastName} {user.patronymic}
        </p>
      </div>
      <Button user={user} />
    </section>
  )
}

export default UserInfo
