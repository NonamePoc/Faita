import React from 'react'
import { BackHeader, Input, Post, Comments } from '../components'

function PostDetails() {
  return (
    <main>
      <BackHeader />
      <Post />
      <section className='card'>
        <Input type={false} />
        <Comments />
      </section>
    </main>
  )
}

export default PostDetails
