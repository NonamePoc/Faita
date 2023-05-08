import React from 'react'
import { Post, Repost } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, fetchUserReposts } from '../../redux/asyncThunks/posts'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function PostList({ userName }) {
  const dispatch = useDispatch()
  const [posts, setPosts] = React.useState([])
  const [reposts, setReposts] = React.useState([])
  const postsLoaded = useSelector((state) => state.posts.loaded)
  const repostsLoaded = useSelector((state) => state.posts.repostsLoaded)

  React.useEffect(() => {
    dispatch(fetchPosts(userName)).then((res) => setPosts(res.payload))
    dispatch(fetchUserReposts(userName)).then((res) => setReposts(res.payload))
  }, [dispatch, userName])

  if (!postsLoaded) return <Skeleton count={2} height={200} />
  if (!repostsLoaded) return <Skeleton count={2} height={200} />

  const mergedData = [...posts, ...reposts]
  mergedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  return (
    <>
      {mergedData.map((item, index) => {
        if (item.hasOwnProperty('repostId')) {
          return <Repost key={item.repostId} repost={item} />
        } else {
          return <Post key={index} post={item} />
        }
      })}
    </>
  )
}

export default PostList
