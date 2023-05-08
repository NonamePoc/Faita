import React from 'react'
import { useSelector } from 'react-redux'
import Likes from './Likes'
import Shares from './Shares'
import Comments from './Comments'

function Reactions({ post }) {
  const userId = useSelector((state) => state.user.id)
  return (
    <ul className='post__below'>
      <Likes post={post} userId={userId} />
      <Comments post={post} />
      <Shares post={post} userId={userId} />
    </ul>
  )
}

export default React.memo(Reactions, (prevProps, nextProps) => {
  return prevProps.post === nextProps.post
})
