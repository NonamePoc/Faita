import React from 'react'
import Content from './Content'
import Reactions from './Reactions'
import UserDetails from './UserDetails'
import { useSelector } from 'react-redux'
import { getLikesByPostId } from '../../api/postRequests'

function Post({ post }) {
  return (
    <section className='card post'>
      <UserDetails post={post} />
      <Content content={post.content} />
      <Reactions />
    </section>
  )
}

export default Post
