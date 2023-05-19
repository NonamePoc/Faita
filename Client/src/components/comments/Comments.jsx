import React from 'react'
import Block from './Block'
import sortByDate from '../../utils/sortByDate'

function Comments({ comments }) {
  return (
    <div className='commentsList'>
      {sortByDate(comments).map((comment) => (
        <Block key={comment.commentId} comment={comment} />
      ))}
    </div>
  )
}

export default Comments
