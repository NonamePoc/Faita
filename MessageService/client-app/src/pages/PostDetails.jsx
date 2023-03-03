import React from 'react'
import { BackHeader, Input, Post, Comments } from '../components'

function PostDetails() {
  return (
    <div>
      <BackHeader />
      <Post />
      <div className='card'>
        <Input type={false} />
        <Comments />
      </div>
    </div>
  )
}

export default PostDetails
