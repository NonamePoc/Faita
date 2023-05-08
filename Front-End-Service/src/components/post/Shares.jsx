import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getShares, sharePost } from '../../redux/asyncThunks/posts'

function Shares({ post, userId }) {
  const [shares, setShares] = React.useState([])
  const [shareActive, setShareActive] = React.useState(false)
  const sharesLoaded = useSelector((state) => state.posts.sharesLoaded)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getShares(post.postId)).then((res) => setShares(res.payload))
  }, [dispatch, post.postId])

  React.useEffect(() => {
    shares.find((share) => share.userId === userId)
      ? setShareActive(true)
      : setShareActive(false)
  }, [shares, userId])

  const handleShare = () => {
    dispatch(sharePost(post.postId)).then(() => {
      dispatch(getShares(post.postId)).then((res) => setShares(res.payload))
      setShareActive(!shareActive)
    })
  }

  return (
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
      <p>{sharesLoaded ? shares.length : 0}</p>
    </li>
  )
}

export default Shares
