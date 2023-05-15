import React from 'react'
import Block from './Block'

function Comments({ comments }) {
  return (
    <div className='commentsList'>
      {[...comments]
        ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((comment) => (
          <Block key={comment.commentId} comment={comment} />
        ))}
    </div>
  )
}

export default Comments
