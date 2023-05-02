import React from 'react'
import { Post } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../../redux/asyncThunks/posts'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function PostList() {
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.posts.userPosts)
  const loaded = useSelector((state) => state.posts.loaded)

  React.useEffect(() => {
    dispatch(fetchPosts())
  }, [])

  if (!loaded) return <Skeleton count={2} height={150} className='post' />

  return (
    posts?.length > 0 &&
    [...posts]
      .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
      .map((post) => <Post key={post.id} post={post} />)
  )
}

export default PostList
