import React from 'react'
import { Post } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRandomPosts } from '../../redux/asyncThunks/posts'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function HomePostsList() {
  const count = 7
  const { posts, loadedPosts } = useSelector((state) => state.posts)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(fetchRandomPosts(count))
  }, [dispatch, count])

  const loadMore = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    dispatch(fetchRandomPosts(count))
  }

  return (
    <div className='posts-list'>
      {loadedPosts ? (
        <>
          {[...posts]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((post) => (
              <Post key={post.postId} post={post} />
            ))}
          <button className='button-48' onClick={loadMore}>
            <span className='text'>Regenerate posts 👆</span>
          </button>
        </>
      ) : (
        <Skeleton className='post' count={count} height={150} />
      )}
    </div>
  )
}

export default HomePostsList
