import React from 'react'
import { Emoji, Gif } from '../../components'
import useInput from '../../hooks/useInput'
import { useDispatch } from 'react-redux'

import { sendChatMessage } from '../../redux/slices/user'

function Input() {
  const dispatch = useDispatch()
  const { value, handleChange, handleEmojiSelect } = useInput('')

  const handleSendMessage = async () => {
    dispatch(sendChatMessage('Hello World', 'receiverId', 'roomId'))
  }

  return (
    <fieldset className='card chatroom__field'>
      <input
        onChange={handleChange}
        value={value}
        className='chatroom__field__input'
        placeholder='Write something...'
      />
      <div className='flex'>
        <Gif />
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
    </fieldset>
  )
}

export default Input
