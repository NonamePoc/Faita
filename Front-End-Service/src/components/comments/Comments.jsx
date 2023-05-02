import React from 'react'
import { useDispatch } from 'react-redux'
import Block from './Block'

function Comments({ post, comments }) {
  const dispatch = useDispatch()

  return (
    <div className='commentsList'>
      {comments.map((comment) => (
        <Block key={comment.id} comment={comment} />
      ))}
    </div>
  )
}

export default Comments
