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
  }, [])

  function handleAddFriend() {
    addFriend(user.id, 'f63335bb-5f9a-486b-9b26-6c1a48888131', user.token)
  }

  return (
    <section className='friendPage'>
      {user.friends.map((friend, index) => (
        <FriendCard key={index} userName={friend.userName} />
      ))}
      <button onClick={handleAddFriend}>Add Friend</button>
    </section>
  )
}

export default Friends
