import React from 'react'
import { Route, Routes, Outlet, useNavigate } from 'react-router-dom'
import {
  Home,
  Friends,
  Auth,
  Chats,
  ChatRoom,
  PostDetails,
  Profile,
  EmailConfirmation,
  Settings,
} from '../pages'
import {
  Header,
  UserMiniCard,
  MenuTab,
  AsideFriendList,
  NewMessageAlert,
} from '../layouts'
import { useSelector } from 'react-redux'

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

const Router = () => {
  const navigate = useNavigate()
  const isAuth = useSelector((state) => state.user.isAuth)

  React.useEffect(() => {
    if (!isAuth) {
      navigate('/auth')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth])

  if (!isAuth) {
    return (
      <Routes>
        <Route path='/auth' element={<Auth />} />
        <Route path='/confirm-email' element={<EmailConfirmation />} exact />
        <Route path='/*' element={<Auth />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<Home />} exact />
        <Route path='/friends/:userName' element={<Friends />} />
        <Route path='/chat' element={<Chats />} exact />
        <Route path='/chat/:roomId' element={<ChatRoom />} />
        <Route path='/post' element={<PostDetails />} exact />
        <Route path='/profile/:userName' element={<Profile />} />
        <Route path='/settings' element={<Settings />} exact />
        <Route path='/*' element={<Home />} />
      </Route>
    </Routes>
  )
}

export default Router
