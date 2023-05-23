import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { resetUserError } from '../redux/slices/user'
import { resetFriendsError } from '../redux/slices/friends'

function Error() {
  const [error, setError] = React.useState(null)
  const { error: userError } = useSelector((state) => state.user)
  const { error: friendsError } = useSelector((state) => state.friends)
  const dispatch = useDispatch()

  React.useEffect(() => {
    setError(userError || friendsError)
    const timer = setTimeout(() => {
      resetErrors()
    }, 5000)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, friendsError, userError])

  const resetErrors = () => {
    dispatch(resetUserError())
    dispatch(resetFriendsError())
  }

  return (
    <>
      <div className={`modal-overlay ${error && 'active'}`}></div>
      <div className={`modal card ${error && 'active'}`}>
        <div className='modal-header'>
          <h2>⚠ Error!</h2>
          <span className='close' onClick={resetErrors}>
            &times;
          </span>
        </div>
        <div className='modal-body'>
          <span>{error}</span>
        </div>
      </div>
    </>
  )
}

export default Error
