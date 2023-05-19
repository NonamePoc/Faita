import React from 'react'
import { Post } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRandomPosts } from '../../redux/asyncThunks/posts'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import sortByDate from '../../utils/sortByDate'

function HomePostsList() {
  const dispatch = useDispatch()
  const { posts, loadedPosts } = useSelector((state) => state.posts)

  React.useEffect(() => {
    dispatch(fetchRandomPosts(10))
  }, [dispatch])

  return (
    <div className='posts-list'>
      {loadedPosts ? (
        sortByDate(posts).map((post) => <Post key={post.id} post={post} />)
      ) : (
        <Skeleton count={2} height={200} />
      )}
    </div>
  )
}

export default HomePostsList
