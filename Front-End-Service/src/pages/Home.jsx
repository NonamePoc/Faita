import React from 'react'
import { PostList, Input, FileModal } from '../components'

function Home() {
  const [media, setMedia] = React.useState({
    image: '',
    audio: '',
    video: '',
  })

  return (
    <main>
      <FileModal media={media} setMedia={setMedia} />
      <Input type={true} media={media} />
      {/* <PostList /> */}
    </main>
  )
}

export default Home
