import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleFileModal } from '../../redux/slices/modal'
import { checkValidMedia } from '../../utils/checkValidMedia'

function FileModal({ media, setMedia }) {
  const [error, setError] = React.useState(null)
  const open = useSelector((state) => state.modal.fileModalOpen)
  const dispatch = useDispatch()

  const handleChange = (event) => {
    setMedia({ ...media, [event.target.name]: event.target.value })
  }

  const handleSave = () => {
    if (media.imageUrl || media.audioUrl || media.videoUrl) {
      checkValidMedia(media, (isValid) => {
        isValid ? dispatch(toggleFileModal()) : setError('⚠ Invalid media url')
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
          <p>Insert the url of image 📸</p>
          <input
            onChange={handleChange}
            defaultValue={media.imageUrl}
            className='modal-input'
            name='imageUrl'
            type='text'
            aria-label='URL file input'
          />
          <p>Insert the url of audio 🔊</p>
          <input
            onChange={handleChange}
            defaultValue={media.audioUrl}
            className='modal-input'
            name='audioUrl'
            type='text'
            aria-label='URL file input'
          />
          <p>Insert the url of video 🎥</p>
          <input
            onChange={handleChange}
            defaultValue={media.videoUrl}
            className='modal-input'
            name='videoUrl'
            type='text'
            aria-label='URL file input'
          />
        </div>
        <p className={`error-span ${error && 'active'}`}>{error}</p>
        <button className='btn' onClick={handleSave}>
          Save changes 📝
        </button>
      </div>
    </>
  ) : null
}

export default FileModal
