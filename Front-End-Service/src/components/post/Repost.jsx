import React from 'react'
import { useDispatch } from 'react-redux'
import { Post } from '../../components'
import { fetchPostById } from '../../redux/asyncThunks/posts'
import truncateDate from '../../utils/truncateDate'

function Repost({ repost }) {
  const [post, setPost] = React.useState({})
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(fetchPostById(repost.postId)).then((res) => setPost(res.payload))
  }, [dispatch, repost.postId])

  return (
    <section className='card post' key={`repost-${repost.postId}`}>
      <p>
        <span className='post__name'>{repost.userName}</span> shared the post
        (☞ﾟヮﾟ)☞{'  '}
        <span className='post__date'>{` • ${truncateDate(
          repost.createdAt
        )}`}</span>
      </p>

      <Post post={post} />
    </section>
  )
}

export default Repost
