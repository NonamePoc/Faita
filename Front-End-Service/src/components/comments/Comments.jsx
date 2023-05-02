import React from 'react'
import Block from './Block'

function Comments({ comments }) {
  return (
    <div className='commentsList'>
      {comments.map((comment) => (
        <Block key={comment.id} comment={comment} />
      ))}
    </div>
  )
}

export default Comments
