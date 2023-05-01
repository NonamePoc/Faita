import React from 'react'
import { BackHeader, Input, Post, Comments } from '../components'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchPostById } from '../redux/asyncThunks/posts'

function PostDetails() {
  const { postId } = useParams()
  const dispatch = useDispatch()
  const [post, setPost] = React.useState(null)
  const [loaded, setLoaded] = React.useState(false)

  React.useEffect(() => {
    dispatch(fetchPostById(postId)).then((res) => {
      setPost(res.payload)
      setLoaded(true)
    })
  }, [dispatch, postId])

  return loaded ? (
    <main>
      <BackHeader />
      <Post post={post} />
      <section className='card'>
        <Input type={false} />
        <Comments />
      </section>
    </main>
  ) : null
}

export default PostDetails
