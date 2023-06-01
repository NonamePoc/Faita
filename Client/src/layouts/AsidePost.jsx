import React from 'react'
import { Post } from '../components'
import { useSelector } from 'react-redux'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function AsidePost() {
  const { posts, loadedPosts } = useSelector((state) => state.posts)

  return (
    <aside className='aside-post'>
      {posts[0] ? (
        <>
          <h1 className='title'>Look what people post</h1>

          {loadedPosts ? (
            <Post post={posts[0]} />
          ) : (
            <Skeleton count={1} height={200} />
          )}
        </>
      ) : null}
    </aside>
  )
}
