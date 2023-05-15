import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { putLike, getLikes } from '../../redux/asyncThunks/posts'

function Likes({ post, userId }) {
  const likesLoaded = useSelector((state) => state.posts.likesLoaded)
  const [likeActive, setLikeActive] = React.useState(false)
  const [likes, setLikes] = React.useState([])
  const dispatch = useDispatch()

  const handleLike = React.useCallback(() => {
    dispatch(putLike(post.postId)).then(() => {
      dispatch(getLikes(post.postId)).then((res) => setLikes(res.payload))
      setLikeActive(!likeActive)
    })
  }, [dispatch, post.postId, likeActive])

  React.useEffect(() => {
    dispatch(getLikes(post.postId)).then((res) => setLikes(res.payload))
  }, [dispatch, post.postId])

  React.useEffect(() => {
    likes.find((like) => like.userId === userId)
      ? setLikeActive(true)
      : setLikeActive(false)
  }, [likes, userId])

  return (
    <li onClick={handleLike}>
      <svg
        className={`reaction heart ${likeActive ? 'active' : ''}`}
        width='32'
        height='31'
        viewBox='0 0 32 32'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g clipPath='url(#clip0_13_219)'>
          <path
            d='M16 0.313721C7.34117 0.313721 0.313721 7.34117 0.313721 16C0.313721 24.6588 7.34117 31.6863 16 31.6863C24.6588 31.6863 31.6863 24.6588 31.6863 16C31.6863 7.34117 24.6588 0.313721 16 0.313721ZM16.5176 23.8431C16.2353 23.9372 15.749 23.9372 15.4667 23.8431C13.0196 23.0118 7.52941 19.5137 7.52941 13.5843C7.52941 10.9647 9.63137 8.84705 12.2353 8.84705C13.7725 8.84705 15.1372 9.58431 16 10.7451C16.8471 9.59999 18.2274 8.84705 19.7647 8.84705C22.3686 8.84705 24.4706 10.9647 24.4706 13.5843C24.4706 19.5137 18.9804 23.0118 16.5176 23.8431Z'
            fill='#9BA9BA'
          />
        </g>
        <defs>
          <clipPath id='clip0_13_219'>
            <rect width='32' height='32' />
          </clipPath>
        </defs>
      </svg>
      <p>{likesLoaded ? likes.length : 0}</p>
    </li>
  )
}

export default React.memo(Likes, (prevProps, nextProps) => {
  return prevProps.post.postId === nextProps.post.postId
})
