import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRooms, sendChatMessage } from '../../redux/asyncThunks/chats'
import { Emoji, Gif, Captcha } from '../../components'
import useInput from '../../hooks/useInput'

const Input = React.memo(({ room }) => {
  const inputRef = React.useRef()
  const user = useSelector((state) => state.user)
  const receiverId = room.users.$values.find((u) => u.id !== user.id).userId
  const { value, handleChange, handleEmojiSelect, resetValue } = useInput('')
  const [submitCount, setSubmitCount] = React.useState(1)
  const dispatch = useDispatch()

  const handleSendMessage = () => {
    const message = inputRef.current.value
    if (!message.trim()) return
    if (submitCount === 15) {
      alert('Please verify the captcha')
    } else {
      dispatch(
        sendChatMessage({
          receiverId: receiverId,
          text: message,
          roomId: room.chatId,
        })
      ).then(() => dispatch(fetchRooms()))
      resetValue()
    }
    setSubmitCount(submitCount + 1)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <fieldset className='card chatroom__field'>
      <input
        ref={inputRef}
        type='text'
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={value}
        className='chatroom__field__input'
        placeholder='Write something...'
      />
      <div className='flex'>
        <Gif
          submitCount={submitCount}
          setSubmitCount={setSubmitCount}
          room={room}
        />
        <Emoji handleEmojiSelect={handleEmojiSelect} />

        <button className='btn send-btn' onClick={handleSendMessage}>
          <svg
            width='17'
            height='17'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g clipPath='url(#clip0_116_448)'>
              <path
                d='M18.5938 0.12501L0.488285 10.5703C-0.218746 10.9766 -0.128902 11.9609 0.574223 12.2578L4.72657 14L15.9492 4.10939C16.1641 3.91798 16.4688 4.21095 16.2852 4.4336L6.875 15.8984V19.043C6.875 19.9649 7.98829 20.3281 8.53516 19.6602L11.0156 16.6406L15.8828 18.6797C16.4375 18.9141 17.0703 18.5664 17.1719 17.9688L19.9844 1.09376C20.1172 0.304698 19.2695 -0.265615 18.5938 0.12501Z'
                fill='white'
              />
            </g>
            <defs>
              <clipPath id='clip0_116_448'>
                <rect width='20' height='20' fill='white' />
              </clipPath>
            </defs>
          </svg>
          Send
        </button>
      </div>
      <Captcha submitCount={submitCount} setSubmitCount={setSubmitCount} />
    </fieldset>
  )
})

export default Input
