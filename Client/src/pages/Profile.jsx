import React from 'react'
import {
  UserInfo,
  PostList,
  FileModal,
  Input,
  DeletePostModal,
  EditPostModal,
} from '../components'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getUserData } from '../redux/asyncThunks/user'

function Profile() {
  const { userName } = useParams()
  const [user, setUser] = React.useState({})
  const { id: curUserId } = useSelector((state) => state.user)
  const loaded = useSelector((state) => state.user.userLoaded)
  const dispatch = useDispatch()

  const [media, setMedia] = React.useState({
    imageUrl: '',
    audioUrl: '',
    videoUrl: '',
  })

  React.useEffect(() => {
    dispatch(getUserData(userName)).then((res) => setUser(res.payload))
  }, [dispatch, userName])

  return !loaded ? (
    <h3>Searching user...</h3>
  ) : (
    <main>
      <UserInfo user={user} />
      <FileModal media={media} setMedia={setMedia} />
      {curUserId === user.id && <Input type={true} media={media} />}
      <DeletePostModal />
      <EditPostModal />
      <PostList userName={userName} />
    </main>
  )
}

export default Profile
