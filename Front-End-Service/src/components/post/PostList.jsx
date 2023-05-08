import React from 'react'
import { Post, Repost } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, fetchUserReposts } from '../../redux/asyncThunks/posts'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function PostList({ userName }) {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = React.useState(true)
  const mergedData = useSelector((state) => {
    const posts = state.posts.userPosts
    const reposts = state.posts.userReposts
    const merged = [...posts, ...reposts]
    merged.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    return merged
  })

  React.useEffect(() => {
    dispatch(fetchPosts(userName)).then(() => {
      dispatch(fetchUserReposts(userName)).then(() => {
        setIsLoading(false)
      })
    })
  }, [dispatch, userName])

  if (isLoading) return <Skeleton count={2} height={200} />

  return (
    <>
      {[...mergedData].map((item, index) => {
        if (item.hasOwnProperty('repostId')) {
          return <Repost key={item.repostId} repost={item} />
        } else {
          return <Post key={index} post={item} />
        }
      })}
    </>
  )
}

export default React.memo(PostList, (prevProps, nextProps) => {
  return prevProps.userName === nextProps.userName
})
