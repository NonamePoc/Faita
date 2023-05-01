import React from 'react'
import Friend from '../components/friend/Aside'
import { useSelector, useDispatch } from 'react-redux'
import { fetchFriends } from '../redux/asyncThunks/user'

const AsideFriendList = React.memo(function AsideFriendList() {
  const userId = useSelector((state) => state.user.id)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(fetchFriends(userId))
  }, [dispatch, userId])

  return (
    <aside>
      <h1 className='friendsTitle'>Online Friends</h1>
      <ul className='card friends'>
        <Friend />
        <Friend />
      </ul>
      <h1 className='friendsTitle'>Offline Friends</h1>
      <ul className='card friends'>
        <Friend />
        <Friend />
      </ul>
    </aside>
  )
})

export default AsideFriendList
