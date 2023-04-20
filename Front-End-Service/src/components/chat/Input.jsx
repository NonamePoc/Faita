import React from 'react'
import { Emoji, Gif } from '../../components'
import useInput from '../../hooks/useInput'
import { useDispatch, useSelector } from 'react-redux'
import { sendChatMessage } from '../../redux/slices/chat'
import ReCAPTCHA from 'react-google-recaptcha'

function Input() {
  const [submitCount, setSubmitCount] = React.useState(1)
  const inputRef = React.useRef()
  const room = useSelector((state) => state.chat)
  const user = useSelector((state) => state.user)
  const receiver = room.users.find((u) => u.id !== user.id)
  const dispatch = useDispatch()
  const { value, handleChange, handleEmojiSelect, resetValue } = useInput('')

  const handleSendMessage = (value) => {
    if (submitCount === 15) {
      alert('Please verify the captcha')
    } else {
      dispatch(sendChatMessage(value, receiver.id))
      resetValue()
    }
    setSubmitCount(submitCount + 1)
  }

  const handleCaptchaVerify = () => {
    setTimeout(() => {
      setSubmitCount(1)
    }, 2000)
  }

  return (
    <fieldset className='card chatroom__field'>
      <input
        ref={inputRef}
        type='text'
        onChange={handleChange}
        onKeyDown={(event) =>
          event.key === 'Enter' && handleSendMessage(inputRef.current.value)
        }
        value={value}
        className='chatroom__field__input'
        placeholder='Write something...'
      />
      <div className='flex'>
        <Gif submitCount={submitCount} setSubmitCount={setSubmitCount} />
        <Emoji handleEmojiSelect={handleEmojiSelect} />

        <button
          className='btn send-btn'
          onClick={() => handleSendMessage(inputRef.current.value)}
        >
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
      {submitCount > 15 ? (
        <>
          <div className='modal-overlay active'></div>
          <ReCAPTCHA
            className='recaptcha'
            sitekey={process.env.REACT_APP_CAPTCHA_API_KEY}
            onChange={handleCaptchaVerify}
          />
        </>
      ) : null}
    </fieldset>
  )
}

export default Input
