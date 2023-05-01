import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import usePopup from '../../hooks/usePopup'
import truncateDate from '../../utils/truncateDate'
import { useSelector, useDispatch } from 'react-redux'
import { deleteUserPost, fetchPosts } from '../../redux/asyncThunks/posts'

function UserDetails({ post }) {
  const { isOpen, togglePopup } = usePopup()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userName = useSelector((state) => state.user.userName)

  const navigateTo = () => {
    navigate(`/post/${post.id}`)
  }

  const deletePost = () => {
    dispatch(deleteUserPost(post.id))
    dispatch(fetchPosts())
  }

  function isMyPost() {
    return post.title === userName ? true : false
  }

  return (
    <div className='post__info'>
      <Link to='/profile'>
        <img
          src='https://picsum.photos/id/34/200'
          alt='Profile'
          className='post__avatar'
        />
      </Link>
      <div>
        <h1 className='post__name'>{post.title}</h1>
        <p className='post__date'>{truncateDate(post.createdAt)}</p>
      </div>
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
        <li onClick={navigateTo}>
          <svg
            width='26'
            height='26'
            viewBox='0 0 26 26'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M13 23.8333C18.983 23.8333 23.8333 18.983 23.8333 13C23.8333 7.01691 18.983 2.16666 13 2.16666C7.0169 2.16666 2.16666 7.01691 2.16666 13C2.16666 18.983 7.0169 23.8333 13 23.8333Z'
              stroke='white'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M9.20834 13H15.7083'
              stroke='white'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M13.5417 16.25L16.7917 13L13.5417 9.75'
              stroke='white'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          Go to post
        </li>
        {isMyPost() && (
          <li onClick={deletePost}>
            <svg
              width='26'
              height='26'
              viewBox='0 0 26 26'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M16.9527 5.84447C15.693 5.36525 14.363 5.11356 13 5.11356C9.17579 5.11356 5.61162 7.09459 3.13079 10.5233C2.15579 11.8662 2.15579 14.1234 3.13079 15.4663C3.62345 16.1472 4.15885 16.7711 4.73051 17.3336M20.9352 8.33791C21.6333 8.98045 22.2816 9.71127 22.8692 10.5233C23.8442 11.8662 23.8442 14.1234 22.8692 15.4663C20.3883 18.8951 16.8242 20.8761 13 20.8761C11.4988 20.8761 10.0377 20.5708 8.66652 19.9926'
                stroke='white'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M16.25 13C16.25 14.7975 14.7975 16.25 13 16.25M15.2746 10.6767C14.6888 10.1032 13.8863 9.75 13 9.75C11.2025 9.75 9.75 11.2025 9.75 13C9.75 13.7901 10.0306 14.5135 10.4979 15.0763'
                stroke='white'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M2.16666 22.7502L23.8333 2.92522'
                stroke='white'
                strokeWidth='1.5'
                strokeLinecap='round'
              />
            </svg>
            Delete post
          </li>
        )}
      </ul>
    </div>
  )
}

export default UserDetails
