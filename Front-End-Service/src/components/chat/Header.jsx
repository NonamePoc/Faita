import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import usePopup from '../../hooks/usePopup'
import { useSelector } from 'react-redux'

function Header() {
  const { isOpen, togglePopup } = usePopup()
  const room = useSelector((state) => state.chat)
  const user = useSelector((state) => state.user)
  const receiver = room.users.find((u) => u.id !== user.id)
  const navigate = useNavigate()

  const navigateToProfile = () => {
    navigate(`/profile/${receiver.userName}`)
  }

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
      <Link to='/profile'>
        <img
          className='chatroom__header__img'
          src='https://picsum.photos/id/235/800'
          alt='profile-img'
        />
      </Link>
      <figcaption className='chatroom__header__info'>
        <h1 className='name'>{room.name}</h1>
        <div className='status'>
          <div className='statusCircle'></div>
          <p className='status__text'>online</p>
        </div>
      </figcaption>
      <svg
        onClick={togglePopup}
        className='dots'
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
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M7.54028 14.9812C7.54028 16.0158 6.69981 16.8562 5.66528 16.8562C4.63028 16.8562 3.79028 16.0158 3.79028 14.9812C3.79028 13.9462 4.63028 13.1062 5.66528 13.1062C6.69981 13.1062 7.54028 13.9462 7.54028 14.9812Z'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M16.9153 14.9812C16.9153 16.0158 16.0748 16.8562 15.0403 16.8562C14.0053 16.8562 13.1653 16.0158 13.1653 14.9812C13.1653 13.9462 14.0053 13.1062 15.0403 13.1062C16.0748 13.1062 16.9153 13.9462 16.9153 14.9812Z'
          />
        </g>
        <defs>
          <clipPath id='clip0_5_170'>
            <rect width='30' height='30' fill='white' />
          </clipPath>
        </defs>
      </svg>
      <ul className={`pop popup ${isOpen ? 'open' : ''}`}>
        <li onClick={navigateToProfile}>
          <svg
            width='26'
            height='26'
            viewBox='0 0 26 26'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M13 10.5625C11.6512 10.5625 10.5625 11.6512 10.5625 13C10.5625 14.3487 11.6512 15.4375 13 15.4375C14.3487 15.4375 15.4375 14.3487 15.4375 13C15.4375 11.6512 14.3487 10.5625 13 10.5625ZM8.9375 13C8.9375 10.7538 10.7538 8.9375 13 8.9375C15.2462 8.9375 17.0625 10.7538 17.0625 13C17.0625 15.2462 15.2462 17.0625 13 17.0625C10.7538 17.0625 8.9375 15.2462 8.9375 13Z'
              fill='white'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M2.47303 10.0462C5.08405 6.43789 8.87917 4.3008 13.0001 4.3008C17.1212 4.3008 20.9164 6.43809 23.5275 10.0467C24.1359 10.8852 24.413 11.9623 24.413 12.9946C24.413 14.027 24.1358 15.1043 23.5272 15.9429C20.9161 19.5512 17.121 21.6883 13.0001 21.6883C8.87897 21.6883 5.08367 19.551 2.47264 15.9423C1.86429 15.1038 1.58716 14.0268 1.58716 12.9946C1.58716 11.9621 1.86439 10.8848 2.47303 10.0462ZM13.0001 5.9258C9.47284 5.9258 6.1398 7.75055 3.78916 10.9993L3.78839 11.0004C3.42229 11.5047 3.21216 12.2271 3.21216 12.9946C3.21216 13.7619 3.42229 14.4845 3.78839 14.9887L3.78916 14.9898C6.1398 18.2386 9.47284 20.0633 13.0001 20.0633C16.5273 20.0633 19.8603 18.2386 22.211 14.9898L22.2118 14.9887C22.5778 14.4845 22.788 13.7619 22.788 12.9946C22.788 12.2271 22.5778 11.5047 22.2118 11.0004L22.211 10.9993C19.8603 7.75055 16.5273 5.9258 13.0001 5.9258Z'
              fill='white'
            />
          </svg>
          View profile
        </li>
      </ul>
    </figure>
  )
}

export default Header
