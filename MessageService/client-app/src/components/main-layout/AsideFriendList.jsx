import React from 'react'
import Friend from '../friend/Aside'

function AsideFriendList() {
  return (
    <aside>
      <h1 className='friendsTitle'>Friends</h1>
      <div className='card friends'>
        <Friend />
        <Friend />
      </div>
    </aside>
  )
}

export default AsideFriendList
