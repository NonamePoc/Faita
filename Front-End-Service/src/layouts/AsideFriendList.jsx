import React from 'react'
import Friend from '../components/friend/Aside'
import { useSelector, useDispatch } from 'react-redux'
import { fetchFriends } from '../redux/slices/user'

function AsideFriendList() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(fetchFriends(user.id))
  }, [dispatch, user.id])

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
}

export default AsideFriendList
