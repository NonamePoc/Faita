import React from 'react'
import {Profile} from './pages'
import { Header, ProfileCard, MenuTab, FriendList } from './components'

function App() {
  return (
    <>
    <Header />
    <div className='wrapper'>
    <div>
      <ProfileCard />
      <MenuTab />
    </div>
    <Profile />
    <FriendList />
    </div>
    </>
  )
}

export default App
