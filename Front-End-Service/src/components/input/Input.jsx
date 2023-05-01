import React from 'react'
import useInput from '../../hooks/useInput'
import { Captcha, Emoji } from '../../components'
import { useDispatch } from 'react-redux'
import { createNewPost, fetchPosts } from '../../redux/asyncThunks/posts'

function Input({ type }) {
  const [focused, setFocused] = React.useState(false)
  const [submitCount, setSubmitCount] = React.useState(1)
  const inputRef = React.useRef(null)
  const { value, handleChange, handleEmojiSelect, resetValue } = useInput('')
  const dispatch = useDispatch()

  const handleBlur = (event) => {
    if (event.relatedTarget === null && inputRef.current.value === '') {
      setFocused(false)
    }
  }

  const handleSendMessage = (value) => {
    if (submitCount === 15) {
      alert('Please verify the captcha')
    } else {
      type
        ? dispatch(createNewPost({ content: value })).then(
            dispatch(fetchPosts())
          )
        : console.log('create comment')
      resetValue()
    }
    setSubmitCount(submitCount + 1)
  }

  React.useEffect(() => {
    inputRef.current.style.height = 'auto'
    inputRef.current.style.height = inputRef.current.scrollHeight + 'px'
  }, [inputRef])

  return (
    <div
      onFocus={() => setFocused(true)}
      onBlur={handleBlur}
      className={`card input ${focused ? 'active' : ''} ${
        type ? 'sendPost' : ''
      }`}
    >
      <div className='input__info'>
        <img
          className={`input__avatar ${type ? 'sendPost' : ''}`}
          src='https://i0.wp.com/www.printmag.com/wp-content/uploads/2021/02/4cbe8d_f1ed2800a49649848102c68fc5a66e53mv2.gif?fit=476%2C280&ssl=1'
          alt='user avatar'
        />
        <h1 className='input__name'>ProfileName_001</h1>
      </div>
      <textarea
        ref={inputRef}
        className='input__input'
        onChange={handleChange}
        value={value}
        maxLength='1200'
        type='text'
        placeholder={`${
          type ? "What's new, ProfileName__001?" : 'Write a comment...'
        }`}
        aria-label='Input Field'
      />

      <div className='input__btns'>
        <Emoji handleEmojiSelect={handleEmojiSelect} />
        <button
          onClick={() => handleSendMessage(inputRef.current.value)}
          className='btn postIt'
        >{`${type ? 'Post it!' : 'Send'}`}</button>
      </div>
      <Captcha submitCount={submitCount} setSubmitCount={setSubmitCount} />
    </div>
  )
}

export default Input
