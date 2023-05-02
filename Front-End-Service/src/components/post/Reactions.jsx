import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  getLikes,
  getComments,
  getShares,
  putLike,
  sharePost,
} from '../../redux/asyncThunks/posts'

function Reactions({ post }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userId = useSelector((state) => state.user.id)
  const [likes, setLikes] = React.useState([])
  const [likeActive, setLikeActive] = React.useState(false)
  const [likeByUser, setLikeByUser] = React.useState({})
  const [comments, setComments] = React.useState([])
  const [shares, setShares] = React.useState([])
  const [shareActive, setShareActive] = React.useState(false)
  const [shareByUser, setShareByUser] = React.useState({})

  React.useEffect(() => {
    dispatch(getLikes(post.id)).then((res) => setLikes(res.payload))
    dispatch(getComments(post.id)).then((res) => setComments(res.payload))
    dispatch(getShares(post.id)).then((res) => setShares(res.payload))
  }, [dispatch, post.id])

  React.useEffect(() => {
    setLikeByUser(likes.find((like) => like.userId === userId))
    setShareByUser(shares.find((share) => share.userId === userId))
  }, [likes, shares, userId])

  React.useEffect(() => {
    likeByUser ? setLikeActive(true) : setLikeActive(false)
    shareByUser ? setShareActive(true) : setShareActive(false)
  }, [likeByUser, shareByUser])

  const handleLike = () => {
    dispatch(putLike(post.id)).then(() => {
      dispatch(getLikes(post.id)).then((res) => setLikes(res.payload))
      setLikeActive(!likeActive)
    })
  }

  const handleComment = () => {
    navigate(`/post/${post.id}`)
  }

  const handleShare = () => {
    dispatch(sharePost(post.id)).then(() => {
      dispatch(getShares(post.id)).then((res) => setShares(res.payload))
      setShareActive(!shareActive)
    })
  }

  return (
    <ul className='post__below'>
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
        <p>{likes.length}</p>
      </li>
      <li onClick={handleComment}>
        <svg
          className={`reaction com `}
          width='32'
          height='30'
          viewBox='0 0 32 30'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g clipPath='url(#clip0_13_221)'>
            <path
              d='M10.4 0C16.145 0 20.8 3.94 20.8 8.8C20.8 13.66 16.145 17.6 10.4 17.6C9.465 17.6 8.56 17.485 7.695 17.29C6.165 18.24 3.9565 19.2 1.2475 19.2C0.7485 19.2 0.2965 18.905 0.1009 18.445C-0.0948 17.985 -0.000370002 17.455 0.33695 17.095C0.363 17.075 1.469 15.87 2.2865 14.295C0.859 12.79 0 10.88 0 8.8C0 3.94 4.6565 0 10.4 0ZM8.23 14.905C8.96 15.115 9.69 15.2 10.4 15.2C14.81 15.2 18.4 12.33 18.4 8.8C18.4 5.27 14.81 2.4 10.4 2.4C5.99 2.4 2.4 5.27 2.4 8.8C2.4 10.56 3.2855 11.86 4.0285 12.645L5.205 13.89L4.4155 15.405C4.237 15.705 4.0365 16.095 3.8275 16.425C4.713 16.17 5.585 15.775 6.435 15.205L7.27 14.73L8.23 14.905ZM22.08 6.41C27.6 6.62 32 10.475 32 15.2C32 17.28 31.14 19.19 29.715 20.695C30.53 22.27 31.635 23.475 31.665 23.495C32 23.855 32.095 24.385 31.855 24.845C31.705 25.305 31.25 25.6 30.75 25.6C28.045 25.6 25.835 24.64 24.305 23.69C23.44 23.885 22.535 24 21.6 24C17.5 24 13.955 21.99 12.26 19.075C13.125 18.96 13.955 18.765 14.745 18.495C16.145 20.355 18.695 21.6 21.6 21.6C22.31 21.6 23.04 21.515 23.77 21.305L24.73 21.13L25.565 21.605C26.415 22.175 27.285 22.57 28.175 22.825C27.965 22.495 27.765 22.105 27.585 21.805L26.795 20.29L27.97 19.045C28.715 18.265 29.6 16.96 29.6 15.2C29.6 11.885 26.435 9.155 22.355 8.83L22.4 8.8C22.4 7.975 22.29 7.175 22.08 6.41Z'
              fill='#9BA9BA'
            />
          </g>
          <defs>
            <clipPath id='clip0_13_221'>
              <rect width='32' height='25.6' fill='white' />
            </clipPath>
          </defs>
        </svg>
        <p>{comments.length}</p>
      </li>
      <li onClick={handleShare}>
        <svg
          className={`reaction repost ${shareActive ? 'active' : ''}`}
          width='32'
          height='32'
          viewBox='0 0 32 32'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M24.6133 9.48001C25.9944 10.4619 27.028 11.857 27.5651 13.4642C28.1023 15.0713 28.1152 16.8075 27.6021 18.4225C27.089 20.0375 26.0763 21.4478 24.7101 22.4502C23.3438 23.4526 21.6945 23.9953 20 24H13.3333'
            stroke='#9BA9BA'
            strokeWidth='2.304'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M16 26.6667L13.3333 24L16 21.3333'
            stroke='#9BA9BA'
            strokeWidth='2.304'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M7.38666 22.52C6.00561 21.5381 4.97201 20.143 4.43487 18.5359C3.89772 16.9287 3.88477 15.1925 4.39789 13.5775C4.91101 11.9625 5.92368 10.5522 7.28994 9.5498C8.6562 8.5474 10.3055 8.00473 12 8H18.6667'
            stroke='#9BA9BA'
            strokeWidth='2.304'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M16 5.33334L18.6667 8.00001L16 10.6667'
            stroke='#9BA9BA'
            strokeWidth='2.304'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
        <p>{shares.length}</p>
      </li>
    </ul>
  )
}

export default Reactions
