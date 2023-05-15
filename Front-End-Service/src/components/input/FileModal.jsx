import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleFileModal } from '../../redux/slices/modal'
import { checkValidMedia } from '../../utils/checkValidMedia'

function FileModal({ media, setMedia }) {
  const open = useSelector((state) => state.modal.fileModalOpen)
  const dispatch = useDispatch()

  const handleChange = (event) => {
    setMedia({ ...media, [event.target.name]: event.target.value })
  }

  const handleSave = () => {
    if (media.image || media.audio || media.video) {
      checkValidMedia(media, (isValid) => {
        isValid ? dispatch(toggleFileModal()) : alert('Invalid media url')
      })
    } else {
      dispatch(toggleFileModal())
    }
  }

  return open ? (
    <>
      <div className={`modal-overlay ${open ? 'active' : ''}`}></div>
      <div className={`modal card ${open ? 'active' : ''}`}>
        <div className='modal-header'>
          <h2>Put media in post</h2>
        </div>
        <div className='modal-body'>
          <p>Insert the url of image</p>
          <input
            onChange={handleChange}
            defaultValue={media.image}
            className='modal-input'
            name='image'
            type='text'
            aria-label='URL file input'
          />
          <p>Insert the url of audio</p>
          <input
            onChange={handleChange}
            defaultValue={media.audio}
            className='modal-input'
            name='audio'
            type='text'
            aria-label='URL file input'
          />
          <p>Insert the url of video</p>
          <input
            onChange={handleChange}
            defaultValue={media.video}
            className='modal-input'
            name='video'
            type='text'
            aria-label='URL file input'
          />
          <button className='btn' onClick={handleSave}>
            Save changes
          </button>
        </div>
      </div>
    </>
  ) : null
}

export default FileModal
