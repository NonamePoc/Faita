import React from 'react'
import Router from './router'
import { useSelector } from 'react-redux'

function App() {
  const { theme } = useSelector((state) => state.theme)

  return (
    <div className={theme}>
      <Router />
    </div>
  )
}

export default App
