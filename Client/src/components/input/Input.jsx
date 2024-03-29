import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Captcha, Emoji } from '../../components'
import FileClip from './FileClip'
import {
  createPost,
  createComment,
  fetchUserPosts,
  getComments,
} from '../../redux/asyncThunks/posts'
import useInput from '../../hooks/useInput'
import { setAvatar } from '../../utils/setAvatar'

function Input({ type, postId, media, setComments }) {
  const { userName, avatar } = useSelector((state) => state.user)
  const [focused, setFocused] = React.useState(false)
  const [submitCount, setSubmitCount] = React.useState(1)
  const inputRef = React.useRef(null)
  const { value, handleChange, handleEmojiSelect, resetValue } = useInput('')
  const dispatch = useDispatch()

  const handleBlur = (event) =>
    event.relatedTarget === null &&
    inputRef.current.value === '' &&
    setFocused(false)

  const handleSendMessage = (value) => {
    if (submitCount === 15) {
      alert('Please verify the captcha')
    } else if (value === '') {
      return
    } else {
      type
        ? dispatch(
            createPost({
              content: value,
              image: media.image,
              audio: media.audio,
              video: media.video,
            })
          ).then(
            (res) =>
              res.payload.status === 200 && dispatch(fetchUserPosts(userName))
          )
        : dispatch(createComment({ content: value, postId })).then(
            (res) =>
              res.payload.status === 200 &&
              dispatch(getComments(postId)).then((res) =>
                setComments(res.payload)
              )
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
            src={setAvatar(avatar)}
            alt='user avatar'
          />
          <h1 className='input__name'>{userName}</h1>
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
