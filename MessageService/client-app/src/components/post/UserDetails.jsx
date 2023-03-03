import React from 'react'

function UserDetails() {
  return (
    <div className='post__info'>
      <img
        src='https://picsum.photos/id/34/200'
        alt='Profile'
        className='post__avatar'
      />
      <div>
        <h1 className='post__name'>ProfileName</h1>
        <p className='post__date'>27 hours ago</p>
      </div>
      <svg
        className='friend__dots'
        width='30'
        height='30'
        viewBox='0 0 30 30'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g clipPath='url(#clip0_5_170)'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M26.2903 14.9812C26.2903 16.0158 25.4498 16.8562 24.4153 16.8562C23.3803 16.8562 22.5403 16.0158 22.5403 14.9812C22.5403 13.9462 23.3803 13.1062 24.4153 13.1062C25.4498 13.1062 26.2903 13.9462 26.2903 14.9812Z'
            fill='#9BA9BA'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M7.54028 14.9812C7.54028 16.0158 6.69981 16.8562 5.66528 16.8562C4.63028 16.8562 3.79028 16.0158 3.79028 14.9812C3.79028 13.9462 4.63028 13.1062 5.66528 13.1062C6.69981 13.1062 7.54028 13.9462 7.54028 14.9812Z'
            fill='#9BA9BA'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M16.9153 14.9812C16.9153 16.0158 16.0748 16.8562 15.0403 16.8562C14.0053 16.8562 13.1653 16.0158 13.1653 14.9812C13.1653 13.9462 14.0053 13.1062 15.0403 13.1062C16.0748 13.1062 16.9153 13.9462 16.9153 14.9812Z'
            fill='#9BA9BA'
          />
        </g>
        <defs>
          <clipPath id='clip0_5_170'>
            <rect width='30' height='30' fill='white' />
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}

export default UserDetails
