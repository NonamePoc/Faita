import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../layouts/Header.jsx'
import UserMiniCard from '../layouts/UserMiniCard'
import MenuTab from '../layouts/MenuTab'
import NewMessageAlert from '../layouts/NewMessageAlert'
import AsideFriendList from '../layouts/AsideFriendList'

const MainLayout = () => (
  <>
    <Header />
    <div className='wrapper'>
      <article>
        <UserMiniCard />
        <MenuTab />
        <NewMessageAlert />
      </article>
      <Outlet />
      <AsideFriendList />
    </div>
  </>
)

export default MainLayout
