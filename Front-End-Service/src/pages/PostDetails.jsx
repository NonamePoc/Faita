import React from 'react'
import { BackHeader, Input, Post, Comments } from '../components'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPostById, getComments } from '../redux/asyncThunks/posts'

function PostDetails() {
  const dispatch = useDispatch()
  const { postId } = useParams()
  const [post, setPost] = React.useState(null)
  const [loaded, setLoaded] = React.useState(false)
  const [comments, setComments] = React.useState([])
  const loadedComs = useSelector((state) => state.posts.commentsLoaded)

  React.useEffect(() => {
    dispatch(fetchPostById(postId)).then((res) => {
      setPost(res.payload)
      setLoaded(true)
      dispatch(getComments(postId)).then((res) => setComments(res.payload))
    })
  }, [dispatch, postId])

  return loaded ? (
    <main>
      <BackHeader />
      <Post post={post} />
      <section className='card'>
        <Input type={false} postId={postId} />
        {loadedComs ? <Comments comments={comments} /> : null}
      </section>
    </main>
  ) : null
}

export default PostDetails
