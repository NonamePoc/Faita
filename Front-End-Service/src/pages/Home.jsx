import React from 'react'
import { PostList, Input, FileModal } from '../components'
import { useSelector } from 'react-redux'

function Home() {
  return (
    <main>
      <FileModal />
      <Input type={true} />
      {/* <PostList /> */}
    </main>
  )
}

export default Home
