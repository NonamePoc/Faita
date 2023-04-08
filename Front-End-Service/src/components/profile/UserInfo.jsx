import React from 'react'

function UserInfo() {
  return (
    <section className='card profile'>
      <img
        className='profile__photo'
        src='https://picsum.photos/200'
        alt='avatar'
      />
      <h1 className='profile__name'>ProfileName_001</h1>
      <p className='profile__descr'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vulputate
        neque vel aliquet sollicitudin. Morbi eros dui, consectetur vitae rutrum
        in, fringilla vitae ligula. Proin et malesuada justo. Sed varius lib
      </p>
      <button className='btn addFriendBtn'>
        <svg
          width='24px'
          height='24px'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M9 12H15'
            stroke='white'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M12 9L12 15'
            stroke='white'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z'
            stroke='white'
            strokeWidth='2'
          />
        </svg>
        Add to friends
      </button>
    </section>
  )
}

export default UserInfo
