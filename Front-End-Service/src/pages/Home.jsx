import React from 'react'
import { PostList, Input, FileModal } from '../components'

function Home() {
  const [image, setImage] = React.useState(null)
  const [audio, setAudio] = React.useState(null)
  const [video, setVideo] = React.useState(null)

  return (
    <main>
      <FileModal
        image={image}
        setImage={setImage}
        setAudio={setAudio}
        setVideo={setVideo}
      />
      <Input type={true} image={image} audio={audio} video={video} />
      {/* <PostList /> */}
    </main>
  )
}

export default Home
