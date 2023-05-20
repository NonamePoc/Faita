import React from 'react'
import Router from './router'
import { useSelector } from 'react-redux'
import { SkeletonTheme } from 'react-loading-skeleton'

function App() {
  const { theme } = useSelector((state) => state.theme)
  return (
    <div className={theme}>
      <SkeletonTheme
        baseColor={theme === 'dark' ? '#202020' : '#ebebeb'}
        highlightColor={theme === 'dark' ? '#292929' : '#f5f5f5'}
      >
        <Router />
      </SkeletonTheme>
    </div>
  )
}

export default App
