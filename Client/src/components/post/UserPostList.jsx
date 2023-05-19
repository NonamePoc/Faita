import React from 'react'
import { Post, Repost } from '..'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserPosts, fetchUserReposts } from '../../redux/asyncThunks/posts'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function PostList({ userName }) {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = React.useState(true)
  const [visibleItems, setVisibleItems] = React.useState(7)
  const mergedData = useSelector((state) => {
    const posts = state.posts.userPosts
    const reposts = state.posts.userReposts
    const merged = [...posts, ...reposts]
    merged.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    return merged
  })

  React.useEffect(() => {
    dispatch(fetchUserPosts(userName)).then(() =>
      dispatch(fetchUserReposts(userName)).then(() => setIsLoading(false))
    )
  }, [dispatch, userName])

  const loadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 7)
  }

  if (isLoading) return <Skeleton count={2} height={200} />

  return (
    <>
      {[...mergedData].slice(0, visibleItems).map((item, index) => {
        if (item.hasOwnProperty('content')) {
          return <Post key={index} post={item} />
        } else {
          return <Repost key={item.id} repost={item} />
        }
      })}
      {visibleItems < mergedData.length && (
        <button className='button-48' onClick={loadMore}>
          <span className='text'>Load more 👇</span>
        </button>
      )}
    </>
  )
}

export default React.memo(PostList, (prevProps, nextProps) => {
  return prevProps.userName === nextProps.userName
})
