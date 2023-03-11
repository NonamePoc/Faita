import React from 'react'
import { Link } from 'react-router-dom'
import ContextMenu from './ContextMenu'

function ChatBlock({ onClickToggleColumn }) {
  const [clicked, setClicked] = React.useState(false)

  const chatRef = React.useRef()

  const handleOutsideClick = (event) => {
    const path = event.composedPath && event.composedPath()
    if (!path.includes(chatRef.current)) {
      setClicked(false)
    }
  }
  React.useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick)
  }, [])

  const onContextMenuDefault = (event) => {
    event.preventDefault()
    setClicked(true)
  }

  return (
    <>
      <Link to='/chat/1'>
        <div
          ref={chatRef}
          className='chat card'
          onClick={onClickToggleColumn}
          onContextMenu={onContextMenuDefault}
          onMouseLeave={() => setClicked(false)}
        >
          <img
            className='chat__img'
            src='https://picsum.photos/id/858/200'
            alt='profile-img'
          />
          <div className='chat__info'>
            <div className='chat__info__firstLine'>
              <h1 className='chat__name'>Name</h1>
              <div className='statusCircle'></div>
            </div>
            <p className='chat__message'>
              Hello! fkkkkkkkkkkkdsofkod fffffffffffffffff fffff fffffffff
              fffffffff ffffffff fffff fffffff fesfkkkk kkkdofjkoe....
            </p>
          </div>
          <div className='chat__info right'>
            <p className='chat__date'>12 mins ago</p>
            <div className='msgCounter'>7</div>
          </div>
          <ContextMenu isActive={clicked} />
        </div>
      </Link>
    </>
  )
}

export default ChatBlock
