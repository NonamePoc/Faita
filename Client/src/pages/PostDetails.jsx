import React from 'react'
import {
  BackHeader,
  Input,
  Post,
  Comments,
  DeletePostModal,
  DeleteCommentModal,
  EditCommentModal,
  EditPostModal,
} from '../components'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPostById, getComments } from '../redux/asyncThunks/posts'

function PostDetails() {
  const dispatch = useDispatch()
  const { postId } = useParams()
  const [post, setPost] = React.useState(null)
  const [loaded, setLoaded] = React.useState(false)
  const [comments, setComments] = React.useState()
  const loadedComs = useSelector((state) => state.posts.commentsLoaded)

  React.useEffect(() => {
    dispatch(fetchPostById(postId)).then((res) => {
      setPost(res.payload)
      dispatch(getComments(postId)).then((res) => {
        setLoaded(true)
        setComments(res.payload)
      })
    })
  }, [dispatch, postId])

  return loaded ? (
    <main>
      <BackHeader />
      <Post post={post} />
      <EditPostModal />
      <DeletePostModal />
      <section className='card'>
        <Input type={false} postId={postId} setComments={setComments} />
        {loadedComs ? <Comments comments={comments} /> : null}
        <DeleteCommentModal postId={postId} setComments={setComments} />
        <EditCommentModal postId={postId} setComments={setComments} />
      </section>
    </main>
  ) : null
}

export default PostDetails
