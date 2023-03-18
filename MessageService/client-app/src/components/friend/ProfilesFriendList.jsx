import { Link } from 'react-router-dom'
import ProfileItem from '../friend/ProfileItem'

function ProfilesFriendList() {
  return (
    <section className='card friendsMini'>
      <h1 className='friendsMini__title'>Friends</h1>
      <div className='friendsMini__list'>
        <ProfileItem />
        <ProfileItem />
        <ProfileItem />
        <ProfileItem />
        <ProfileItem />
      </div>
      <Link to='/friends'>
        <button className='friendsMini__button'>
          View more
          <svg
            width='18'
            height='18'
            viewBox='0 0 18 18'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g clipPath='url(#clip0_19_283)'>
              <path
                d='M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z'
                strokeWidth='1.2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M6.375 9H10.875'
                strokeWidth='1.2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M9.375 11.25L11.625 9L9.375 6.75'
                strokeWidth='1.2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </g>
            <defs>
              <clipPath id='clip0_19_283'>
                <rect width='18' height='18' fill='white' />
              </clipPath>
            </defs>
          </svg>
        </button>
      </Link>
    </section>
  )
}

export default ProfilesFriendList
