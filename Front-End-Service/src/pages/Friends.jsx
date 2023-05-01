import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchFriends } from '../redux/asyncThunks/user'
import { FriendCard, SearchBar } from '../components'
import { useParams } from 'react-router-dom'

function Friends() {
  const { userName } = useParams()
  const currentUser = useSelector((state) => state.user)
  const dispatch = useDispatch()
  let selectedUser = null

  if (userName !== currentUser.userName) {
    selectedUser = currentUser.friends.find(
      (friend) => friend.userName === userName
    )
    if (!selectedUser) {
      alert('Friend not found')
    }
  } else {
    selectedUser = currentUser
  }

  React.useEffect(() => {
    dispatch(fetchFriends(selectedUser.id))
  }, [dispatch, selectedUser.id])

  return (
    <main className='friendsMain'>
      <SearchBar />
      <section className='friendPage'>
        {selectedUser.friends.length > 0 ? (
          currentUser.friends.map((friend, index) => (
            <FriendCard key={index} friend={friend} />
          ))
        ) : (
          <h3>You have no friends</h3>
        )}
      </section>
    </main>
  )
}

export default Friends
