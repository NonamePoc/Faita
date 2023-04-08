import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUserData } from '../redux/reducers/user'
import { FriendCard } from '../components'
import { getFriends, addFriend } from '../api/friendRequests'

function Friends() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  React.useEffect(() => {
    getFriends(user.id).then(
      (response) =>
        response.status === 200 &&
        dispatch(setUserData({ ...user, friends: response.data }))
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleAddFriend() {
    addFriend(user.id, '4864220a-8c27-4b49-884f-c8228813d2db', user.token)
  }

  return (
    <section className='friendPage'>
      {user.friends.map((friend, index) => (
        <FriendCard key={index} userName={friend.userName} />
      ))}
      <button className='btn' onClick={handleAddFriend}>
        Add Friend
      </button>
    </section>
  )
}

export default Friends
