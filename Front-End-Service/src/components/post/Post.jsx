import React from 'react'
import Content from './Content'
import Reactions from './Reactions'
import UserDetails from './UserDetails'

function Post({ post }) {
  return (
    <section className='card post'>
      <UserDetails post={post} />
      <Content post={post} />
      <Reactions post={post} />
    </section>
  )
}

export default Post
