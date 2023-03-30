import React from 'react'
import Content from './Content'
import Reactions from './Reactions'
import UserDetails from './UserDetails'

function Post() {
  return (
    <section className='card post'>
      <UserDetails />
      <Content />
      <Reactions />
    </section>
  )
}

export default Post
