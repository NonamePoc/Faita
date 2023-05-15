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
        <div className='comment__content'>
          <p>{comment.content}</p>
        </div>
      </div>
      {/* <div className='comment__replies'>
        <div className='comment__replies__create'>
          <p>⨉ Delete</p>
        </div>
      </div> */}
    </div>
  )
}

export default Block
