import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { resetMessage } from '../redux/slices/message'

function NewMessageAlert() {
  const [isOpen, setIsOpen] = React.useState(false)
  const newMsg = useSelector((state) => state.message)
  const dispatch = useDispatch()

  React.useEffect(() => {
    if (newMsg.isShown) {
      setIsOpen(true)
      setTimeout(() => {
        dispatch(resetMessage())
        setIsOpen(false)
      }, 4000)
    }
  }, [dispatch, newMsg])

  return (
    <figure className={`newMsgAlert ${isOpen ? 'active' : ''}`}>
      <img
        className='newMsgAlert__img'
        src='https://picsum.photos/id/235/800'
        alt='profile-img'
      />
      <figcaption>
        <h1 className='newMsgAlert__name'>{newMsg.name}</h1>
        <p className='newMsgAlert__text'>{newMsg.message}</p>
      </figcaption>
    </figure>
  )
}

export default NewMessageAlert
