import React from 'react'
import Content from './Content'
import Reactions from './Reactions'
import UserDetails from './UserDetails'
import { useSelector } from 'react-redux'
import { getLikesByPostId } from '../../api/postRequests'

function Post({ post }) {
  const userToken = useSelector((state) => state.user.token)
  const [likes, setLikes] = React.useState([])

  React.useEffect(() => {
    console.log(post.id, userToken)
    getLikesByPostId(post.id)
  }, [post.id])

  return (
    <section className='card post'>
      <UserDetails userName={post.title} date={post.createdAt} />
      <Content content={post.content} />
      <Reactions />
    </section>
  )
}

export default Post
