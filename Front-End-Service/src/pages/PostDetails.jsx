import React from 'react'
import { BackHeader, Input, Post, Comments } from '../components'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchPostById } from '../redux/asyncThunks/posts'

function PostDetails() {
  const { postId } = useParams()
  const dispatch = useDispatch()
  const post = dispatch(fetchPostById(postId))
  console.log(post)

  return (
    <main>
      <BackHeader />
      <Post post={post} />
      <section className='card'>
        <Input type={false} />
        <Comments />
      </section>
    </main>
  )
}

export default PostDetails
