import React from 'react'
import {
  ProfilesFriendList,
  UserInfo,
  PostList,
  FileModal,
  Input,
} from '../components'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getUserData } from '../redux/asyncThunks/user'
import DeletePostModal from '../components/post/DeletePostModal'

function Profile() {
  const { userName } = useParams()
  const [user, setUser] = React.useState({})
  const loaded = useSelector((state) => state.user.userLoaded)
  const dispatch = useDispatch()

  const [image, setImage] = React.useState(null)
  const [audio, setAudio] = React.useState(null)
  const [video, setVideo] = React.useState(null)

  React.useEffect(() => {
    dispatch(getUserData(userName)).then((res) => setUser(res.payload))
  }, [dispatch, userName])

  return !loaded ? (
    <h3>Searching user...</h3>
  ) : (
    <main>
      <UserInfo user={user} />
      <FileModal
        image={image}
        setImage={setImage}
        setAudio={setAudio}
        setVideo={setVideo}
      />
      <Input type={true} image={image} audio={audio} video={video} />
      <ProfilesFriendList friends={user.friends} />
      <DeletePostModal />
      <PostList userName={userName} />
    </main>
  )
}

export default Profile
