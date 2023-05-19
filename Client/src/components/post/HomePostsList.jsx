import React from 'react'
import { Post } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRandomPosts } from '../../redux/asyncThunks/posts'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function HomePostsList() {
  const dispatch = useDispatch()
  const { posts, loadedPosts } = useSelector((state) => state.posts)
  const [count, setCount] = React.useState(1)

  React.useEffect(() => {
    dispatch(fetchRandomPosts(count))
  }, [dispatch, count])

  const loadMore = () => {
    setCount((prev) => prev + count)
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
            <span className='text'>Load more 👇</span>
          </button>
        </>
      ) : (
        <Skeleton count={2} height={200} />
      )}
    </div>
  )
}

export default HomePostsList
