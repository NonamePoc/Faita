import React from 'react'
import { Post } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRandomPosts } from '../redux/asyncThunks/posts'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function AsidePost() {
  const dispatch = useDispatch()
  const { posts, loadedPosts } = useSelector((state) => state.posts)

  React.useEffect(() => {
    dispatch(fetchRandomPosts(1))
  }, [dispatch])

  return (
    <aside className='aside-post'>
      <h1 className='title'>Look what people post</h1>
      {loadedPosts ? (
        <Post post={posts[0]} />
      ) : (
        <Skeleton count={1} height={200} />
      )}
    </aside>
  )
}
