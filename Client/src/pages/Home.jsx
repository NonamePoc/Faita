import React from 'react'
import {
  Input,
  FileModal,
  RandomPostsList,
  DeletePostModal,
  EditPostModal,
} from '../components'

function Home() {
  const [media, setMedia] = React.useState({
    imageUrl: '',
    audioUrl: '',
    videoUrl: '',
  })

  return (
    <main>
      <FileModal media={media} setMedia={setMedia} />
      <Input type={true} media={media} />
      <RandomPostsList />
      <DeletePostModal />
      <EditPostModal />
    </main>
  )
}

export default Home
