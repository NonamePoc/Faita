import React from 'react'
import { ProfilesFriendList, UserInfo } from '../components'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Profile() {
  const { userName } = useParams()
  const currentUser = useSelector((state) => state.user)
  let selectedUser = null

  if (userName !== currentUser.userName) {
    selectedUser = currentUser.friends.find(
      (friend) => friend.userName === userName
    )
    if (!selectedUser) {
      alert('User not found')
    }
  } else {
    selectedUser = currentUser
  }

  return (
    <main>
      <UserInfo user={selectedUser} currentUser={currentUser} />
      <ProfilesFriendList user={selectedUser} />
    </main>
  )
}

export default Profile
