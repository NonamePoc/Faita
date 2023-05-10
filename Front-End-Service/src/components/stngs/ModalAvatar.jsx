import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleAvatarModal } from '../../redux/slices/modal'
import { changeProfileImage } from '../../redux/asyncThunks/user'
import checkValidMedia from '../../utils/checkValidMedia'

function ModalAvatar() {
  const modalImgOpen = useSelector((state) => state.modal.avatarModalOpen)
  const [image, setImage] = React.useState(null)
  const dispatch = useDispatch()

  const handleOpen = () => {
    dispatch(toggleAvatarModal())
  }

  const onFileChange = (event) => {
    event.target.value && setImage(event.target.value)
  }

  const onClickUpload = () => {
    checkValidMedia(image, (isValid) => {
      isValid ? dispatch(changeProfileImage(image)) : alert('Invalid image url')
    })
  }

  return (
    <>
      <div className={`modal-overlay ${modalImgOpen ? 'active' : ''}`}></div>
      <div className={`modal card ${modalImgOpen ? 'active' : ''}`}>
        <div className='modal-header'>
          <h2>Change photo</h2>
          <span className='close' onClick={handleOpen}>
            &times;
          </span>
        </div>
        <div className='modal-body'>
          <p>Insert the url of file</p>
          <input
            className='modal-input'
            type='text'
            aria-label='URL file input'
            onChange={onFileChange}
          />
          <button className='btn' onClick={onClickUpload}>
            Save changes
          </button>
        </div>
      </div>
    </>
  )
}

export default ModalAvatar
