import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  addToFriends,
  removeFromFriends,
  fetchFriends,
} from '../redux/slices/user'
import { FriendCard } from '../components'
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

  function handleAddFriend() {
    /* 
    dispatch(removeFromFriends('b4e76c84-8cc3-44a5-892a-b40827bc5f85')) */
    dispatch(addToFriends('b4e76c84-8cc3-44a5-892a-b40827bc5f85'))
  }

  return (
    <section className='friendPage'>
      {currentUser.friends ? (
        currentUser.friends.map((friend, index) => (
          <FriendCard key={index} friend={friend} />
        ))
      ) : (
        <h1>You have no friends</h1>
      )}
      <button className='btn' onClick={handleAddFriend}>
        Add Friend
      </button>
    </section>
  )
}

export default Friends
