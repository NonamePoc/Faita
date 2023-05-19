import React from 'react'
import { Input, FileModal, RandomPostsList } from '../components'

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
      <RandomPostsList />
    </main>
  )
}

export default Home
