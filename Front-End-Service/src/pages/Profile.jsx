import React from 'react'
import { ProfilesFriendList, UserInfo } from '../components'
import { useParams } from 'react-router-dom'
import { searchUser } from '../api/userRequests'

function Profile() {
  const { userName } = useParams()
  const [loaded, setLoaded] = React.useState(false)
  const [selectedUser, setSelectedUser] = React.useState(null)

  React.useEffect(() => {
    searchUser(userName).then((res) => {
      setSelectedUser(res.data.$values)
      setLoaded(true)
    })
  }, [userName])

  return !loaded ? (
    <h1>Searching user...</h1>
  ) : (
    <main>
      <UserInfo user={selectedUser} />
      {/* <ProfilesFriendList user={selectedUser} /> */}
    </main>
  )
}

export default Profile
