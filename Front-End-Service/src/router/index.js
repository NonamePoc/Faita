import { Route, Routes, Outlet } from 'react-router-dom'
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
} from '../components'

const MainLayout = () => (
  <>
    <Header />
    <div className='wrapper'>
      <div>
        <UserMiniCard />
        <MenuTab />
        <NewMessageAlert />
      </div>
      <Outlet />
      <AsideFriendList />
    </div>
  </>
)

const Router = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<Home />} exact />
        <Route path='/friends' element={<Friends />} exact />
        <Route path='/chat' element={<Chats />} exact />
        <Route path='/chat/1' element={<ChatRoom />} exact />
        <Route path='/post' element={<PostDetails />} exact />
        <Route path='/profile' element={<Profile />} exact />
        <Route path='/settings' element={<Settings />} exact />
      </Route>
      <Route path='/auth' element={<Auth />} />
      <Route path='/confirm-email' element={<EmailConfirmation />} exact />
    </Routes>
  )
}

export default Router
