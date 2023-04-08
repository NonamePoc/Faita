import React from 'react'
import Friend from '../components/friend/Aside'

function AsideFriendList() {
  return (
    <aside>
      <h1 className='friendsTitle'>Online Friends</h1>
      <ul className='card friends'>
        <Friend />
        <Friend />
      </ul>
      <h1 className='friendsTitle'>Offline Friends</h1>
      <ul className='card friends'>
        <Friend />
        <Friend />
      </ul>
    </aside>
  )
}

export default AsideFriendList
