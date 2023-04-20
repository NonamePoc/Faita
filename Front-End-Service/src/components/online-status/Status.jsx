import React from 'react'
/* import { useSelector, useDispatch } from 'react-redux'
import { setUserData } from '../../redux/slices/user' */

function Status({ user }) {
  /*  const currentUser = useSelector((state) => state.user)
  const dispatch = useDispatch()

  React.useEffect(() => {
    const handleStatusChange = () => {
      dispatch(setUserData({ ...currentUser, isOnline: navigator.onLine }))
    }

    window.addEventListener('online', handleStatusChange)
    window.addEventListener('offline', handleStatusChange)

    

    return () => {
      window.removeEventListener('online', handleStatusChange)
      window.removeEventListener('offline', handleStatusChange)
    }
  }, [currentUser.isOnline]) */

  return <div className={`statusCircle ${user.isOnline ? 'online' : ''}`}></div>
}

export default Status
