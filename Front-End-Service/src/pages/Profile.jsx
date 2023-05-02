import React from 'react'
import { ProfilesFriendList, UserInfo, PostList } from '../components'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getUserData } from '../redux/asyncThunks/user'

function Profile() {
  const { userName } = useParams()
  const [user, setUser] = React.useState({})
  const loaded = useSelector((state) => state.user.userLoaded)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getUserData(userName)).then((res) => setUser(res.payload))
  }, [dispatch, userName])

  return !loaded ? (
    <h3>Searching user...</h3>
  ) : (
    <main>
      <UserInfo user={user} />
      <ProfilesFriendList friends={user.friends} />
      <PostList userName={userName} />
    </main>
  )
}

export default Profile
