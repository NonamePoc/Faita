import React from 'react'
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
} from './pages'
import { Header, ProfileCard, MenuTab, FriendList } from './components'
import { Route, Routes, Outlet } from 'react-router-dom'
import ThemeContext from './contexts/ThemeContext'

const MainLayout = () => (
  <>
    <Header />
    <div className='wrapper'>
      <div>
        <ProfileCard />
        <MenuTab />
      </div>
      <Outlet />
      <FriendList />
    </div>
  </>
)

function App() {
  const [theme, setTheme] = React.useState(() => {
    return localStorage.getItem('theme') || 'light'
  })

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme}>
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
          <Route path='/email-cnfrm' element={<EmailConfirmation />} exact />
        </Routes>
      </div>
    </ThemeContext.Provider>
  )
}

export default App
