import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import usePopup from '../../hooks/usePopup'
import truncateDate from '../../utils/truncateDate'
import { useSelector, useDispatch } from 'react-redux'
import {
  openDeletePostModal,
  openEditPostModal,
} from '../../redux/slices/modal'
import { setAvatar } from '../../utils/setAvatar'

function UserDetails({ post }) {
  const { isOpen, togglePopup } = usePopup()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userName = useSelector((state) => state.user.userName)
  const navigateTo = () => {
    navigate(`/post/${post.postId}`)
  }

  function isMyPost() {
    return post.title === userName ? true : false
  }

  return (
    <>
      <div className='post__info'>
        <Link to={`/profile/${post.userName}`}>
          <img
            src={setAvatar(post.avatar)}
            alt='Avatar of Creator'
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
        <ul className={`pop popup popup__post ${isOpen ? 'open' : ''}`}>
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
          {isMyPost() ? (
            <>
              <li onClick={() => dispatch(openDeletePostModal(post.postId))}>
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
              <li onClick={() => dispatch(openEditPostModal(post))}>
                <svg
                  width='20px'
                  height='20px'
                  viewBox='0 0 20 20'
                  version='1.1'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                  <g
                    id='SVGRepo_tracerCarrier'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  ></g>
                  <g id='SVGRepo_iconCarrier'>
                    <g
                      id='Page-1'
                      stroke='none'
                      strokeWidth='1'
                      fill='none'
                      fillRule='evenodd'
                    >
                      <g
                        id='DribbbleLight-Preview'
                        transform='translate(-339.000000, -800.000000)'
                      >
                        <g
                          id='icons'
                          transform='translate(56.000000, 160.000000)'
                        >
                          <path
                            fill='white'
                            d='M286.15,654 C285.5704,654 285.1,653.552 285.1,653 L285.1,647 C285.1,646.448 285.5704,646 286.15,646 C286.7296,646 287.2,645.552 287.2,645 C287.2,644.448 286.7296,644 286.15,644 L285.1,644 C283.93975,644 283,644.895 283,646 L283,654 C283,655.105 283.93975,656 285.1,656 L286.15,656 C286.7296,656 287.2,655.552 287.2,655 C287.2,654.448 286.7296,654 286.15,654 M301.9,644 L294.55,644 C293.9704,644 293.5,644.448 293.5,645 C293.5,645.552 293.9704,646 294.55,646 L300.85,646 C301.4296,646 301.9,646.448 301.9,647 L301.9,653 C301.9,653.552 301.4296,654 300.85,654 L294.55,654 C293.9704,654 293.5,654.448 293.5,655 C293.5,655.552 293.9704,656 294.55,656 L301.9,656 C303.06025,656 304,655.105 304,654 L304,646 C304,644.895 303.06025,644 301.9,644 M293.5,659 C293.5,659.552 293.0296,660 292.45,660 L288.25,660 C287.6704,660 287.2,659.552 287.2,659 C287.2,658.448 287.6704,658 288.25,658 L289.3,658 L289.3,642 L288.25,642 C287.6704,642 287.2,641.552 287.2,641 C287.2,640.448 287.6704,640 288.25,640 L292.45,640 C293.0296,640 293.5,640.448 293.5,641 C293.5,641.552 293.0296,642 292.45,642 L291.4,642 L291.4,658 L292.45,658 C293.0296,658 293.5,658.448 293.5,659'
                          ></path>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
                Edit post
              </li>
            </>
          ) : null}
        </ul>
      </div>
    </>
  )
}

export default UserDetails
