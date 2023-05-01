import React from 'react'
import { ProfilesFriendList, UserInfo } from '../components'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Profile() {
  const { userName } = useParams()
  const currentUser = useSelector((state) => state.user)
  const [selectedUser, setSelectedUser] = React.useState(null)

  userName !== currentUser.userName
    ? setSelectedUser(currentUser)
    : setSelectedUser(currentUser)

  return (
    <main>
      <UserInfo user={selectedUser} currentUser={currentUser} />
      <ProfilesFriendList user={selectedUser} currentUser={currentUser} />
    </main>
  )
}

export default Profile
