import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header.jsx'
import UserMiniCard from './UserMiniCard'
import MenuTab from './MenuTab'
import NewMessageAlert from './NewMessageAlert'
import AsideFriendList from './AsideFriendList'
import AsidePost from './AsidePost.jsx'
import Error from './Error.jsx'

const MainLayout = () => (
  <>
    <Header />
    <Error />
    <div className='wrapper'>
      <article>
        <UserMiniCard />
        <MenuTab />
        <NewMessageAlert />
      </article>
      <Outlet />
      <aside>
        <AsideFriendList />
        <AsidePost />
      </aside>
    </div>
  </>
)

export default MainLayout
