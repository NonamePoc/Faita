import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  acceptFriendRequest,
  fetchReceivedRequests,
  declineRequest,
} from '../../redux/asyncThunks/friends'

function Request({ user }) {
  const dispatch = useDispatch()

  const cancelRequest = () => {
    dispatch(declineRequest(user.id))
    dispatch(fetchReceivedRequests())
  }

  const acceptRequest = () => {
    dispatch(acceptFriendRequest(user.id))
    dispatch(fetchReceivedRequests())
  }

  return (
    <li className='friend'>
      <Link to='/profile'>
        <figure className='friend__figure'>
          <img
            className='friend__avatar'
            src='https://picsum.photos/id/235/500'
            alt='friend'
          />
          <figcaption className='friend__name'>{user.userName}</figcaption>
        </figure>
      </Link>
      <div className='aside-friend-actions'>
        <svg
          onClick={acceptRequest}
          fill='#25a727'
          width='27px'
          height='27px'
          viewBox='-1.44 -1.44 26.88 26.88'
          xmlns='http://www.w3.org/2000/svg'
          stroke='#25a727'
          strokeWidth='0.576'
        >
          <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
          <g
            id='SVGRepo_tracerCarrier'
            strokeLinecap='round'
            strokeLinejoin='round'
          ></g>
          <g id='SVGRepo_iconCarrier'>
            <defs>
              <style> .cls-1 </style>
            </defs>
            <path
              id='accept'
              className='cls-1'
              d='M1008,120a12,12,0,1,1,12-12A12,12,0,0,1,1008,120Zm0-22a10,10,0,1,0,10,10A10,10,0,0,0,1008,98Zm-0.08,14.333a0.819,0.819,0,0,1-.22.391,0.892,0.892,0,0,1-.72.259,0.913,0.913,0,0,1-.94-0.655l-2.82-2.818a0.9,0.9,0,0,1,1.27-1.271l2.18,2.184,4.46-7.907a1,1,0,0,1,1.38-.385,1.051,1.051,0,0,1,.36,1.417Z'
              transform='translate(-996 -96)'
            ></path>
          </g>
        </svg>
        <svg
          onClick={cancelRequest}
          fill='#EE7055'
          className='friend__cancel'
          width='32px'
          height='32px'
          viewBox='0 0 32 32'
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
            <title>cancel1</title>
            <path d='M16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13zM16 6c-5.522 0-10 4.478-10 10s4.478 10 10 10c5.523 0 10-4.478 10-10s-4.477-10-10-10zM20.537 19.535l-1.014 1.014c-0.186 0.186-0.488 0.186-0.675 0l-2.87-2.87-2.87 2.87c-0.187 0.186-0.488 0.186-0.675 0l-1.014-1.014c-0.186-0.186-0.186-0.488 0-0.675l2.871-2.869-2.871-2.87c-0.186-0.187-0.186-0.489 0-0.676l1.014-1.013c0.187-0.187 0.488-0.187 0.675 0l2.87 2.87 2.87-2.87c0.187-0.187 0.489-0.187 0.675 0l1.014 1.013c0.186 0.187 0.186 0.489 0 0.676l-2.871 2.87 2.871 2.869c0.186 0.187 0.186 0.49 0 0.675z'></path>
          </g>
        </svg>
      </div>
    </li>
  )
}

export default Request
