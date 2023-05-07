import React from 'react'
import useInput from '../../hooks/useInput'
import { Captcha, Emoji, FileModal } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import {
  createNewPost,
  createComment,
  fetchPosts,
  getComments,
} from '../../redux/asyncThunks/posts'
import FileClip from './FileClip'
import { setAvatar } from '../../utils/setAvatar'

function Input({ type, postId, image, audio, video }) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const { value, handleChange, handleEmojiSelect, resetValue } = useInput('')
  const [focused, setFocused] = React.useState(false)
  const [submitCount, setSubmitCount] = React.useState(1)
  const inputRef = React.useRef(null)

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
        ? dispatch(createNewPost({ content: value, image, audio, video })).then(
            () => dispatch(fetchPosts())
          )
        : dispatch(createComment({ content: value, postId })).then(
            (res) => res && dispatch(getComments(postId))
          )
      resetValue()
    }
    setSubmitCount(submitCount + 1)
  }

  React.useEffect(() => {
    inputRef.current.style.height = 'auto'
    inputRef.current.style.height = inputRef.current.scrollHeight + 'px'
  }, [inputRef])

  return (
    <>
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
            src={setAvatar(user.avatar)}
            alt='user avatar'
          />
          <h1 className='input__name'>{user.userName}</h1>
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
          {type && <FileClip />}
          <button
            onClick={() => handleSendMessage(inputRef.current.value)}
            className='btn postIt'
          >{`${type ? 'Post it!' : 'Send'}`}</button>
        </div>
        <Captcha submitCount={submitCount} setSubmitCount={setSubmitCount} />
      </div>
    </>
  )
}

export default Input
