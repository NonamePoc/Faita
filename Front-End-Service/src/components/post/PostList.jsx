import React from 'react'
import { Post } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../../redux/asyncThunks/posts'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function PostList({ userName }) {
  const dispatch = useDispatch()
  const [posts, setPosts] = React.useState([])
  const loaded = useSelector((state) => state.posts.loaded)

  React.useEffect(() => {
    dispatch(fetchPosts(userName)).then((res) => setPosts(res.payload))
  }, [dispatch, userName])

  if (!loaded) return <Skeleton count={2} height={150} className='post' />

  return (
    posts.length > 0 &&
    [...posts]
      .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
      .map((post) => <Post key={post.postId} post={post} />)
  )
}

export default PostList
