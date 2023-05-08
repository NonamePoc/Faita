import React from 'react'
import truncateDate from '../../utils/truncateDate'

function Block({ comment }) {
  return (
    <div className='comment'>
      <div className='comment__info'>
        <img className='comment__avatar' src={comment.avatar} alt='avatar' />
        <div>
          <h1 className='comment__info__name'>{comment.userName}</h1>
          <p className='comment__info__date'>
            {truncateDate(comment.createdAt)}
          </p>
        </div>
        <div></div>
        <div className='comment__content'>
          <p>{comment.content}</p>
        </div>
      </div>
      <div className='comment__replies'>
        <div className='comment__replies__create'>
          <svg
            width='22'
            height='25'
            viewBox='0 0 22 22'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g opacity='0.8'>
              <path
                d='M8.89552 7.98008C9.25329 7.62186 9.25284 7.04146 8.89464 6.68372C8.53642 6.32598 7.95601 6.32638 7.59827 6.68461L3.01804 11.2711C2.66051 11.6291 2.66067 12.2091 3.01842 12.567L7.59865 17.1481C7.95659 17.5061 8.53699 17.5062 8.89502 17.1483C9.25302 16.7903 9.25311 16.2099 8.89514 15.8519L5.87675 12.8333H11.9167C15.8903 12.8333 19.1258 9.67286 19.2465 5.72842L19.25 5.50001C19.25 4.99375 18.8396 4.58334 18.3333 4.58334C17.8271 4.58334 17.4167 4.99375 17.4167 5.50001C17.4167 8.46854 15.0649 10.8878 12.1228 10.9963L11.9167 11H5.8795L8.89552 7.98008Z'
                fill='#9BA9BA'
              />
            </g>
          </svg>
          <p>Reply</p>
        </div>
      </div>
    </div>
  )
}

export default Block
