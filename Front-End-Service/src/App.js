import React from 'react'
import Router from './router'
import { useSelector } from 'react-redux'
import { getUserId } from './api/userRequests'

function App() {
  const { theme } = useSelector((state) => state.theme)

  console.log(getUserId())

  return (
    <div className={theme}>
      <Router />
    </div>
  )
}

export default App
