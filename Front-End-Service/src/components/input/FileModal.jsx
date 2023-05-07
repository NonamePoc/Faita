import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleFileModal } from '../../redux/slices/modal'

function FileModal({ image, setImage, setAudio, setVideo }) {
  const open = useSelector((state) => state.modal.fileModalOpen)
  const dispatch = useDispatch()

  const handleImageChange = (e) => {
    setImage(e.target.value)

    console.log(image)
  }

  const handleAudioChange = (e) => {
    setAudio(e.target.value)
  }

  const handleVideoChange = (e) => {
    setVideo(e.target.value)
  }

  const handleOpen = () => {
    dispatch(toggleFileModal())
  }
  return open ? (
    <>
      <div className={`modal-overlay ${open ? 'active' : ''}`}></div>
      <div className={`modal card ${open ? 'active' : ''}`}>
        <div className='modal-header'>
          <h2>Put media in post</h2>
          <span className='close' onClick={handleOpen}>
            &times;
          </span>
        </div>
        <div className='modal-body'>
          <p>Insert the url of image</p>
          <input
            onChange={handleImageChange}
            defaultValue={image}
            className='modal-input'
            name='imageURL'
            type='text'
            aria-label='URL file input'
          />
          <p>Insert the url of audio</p>
          <input
            onChange={handleAudioChange}
            className='modal-input'
            name='audioURL'
            type='text'
            aria-label='URL file input'
          />
          <p>Insert the url of video</p>
          <input
            onChange={handleVideoChange}
            className='modal-input'
            name='videoURL'
            type='text'
            aria-label='URL file input'
          />
          <button className='btn'>Save changes</button>
        </div>
      </div>
    </>
  ) : null
}

export default FileModal
