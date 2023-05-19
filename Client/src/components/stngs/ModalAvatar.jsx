import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleAvatarModal } from '../../redux/slices/modal'
import { changeProfileImage } from '../../redux/asyncThunks/user'
import { checkValidImage } from '../../utils/checkValidMedia'

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
    checkValidImage(image, (isValid) => {
      isValid
        ? dispatch(changeProfileImage(image)).then(() => handleOpen())
        : alert('Invalid image url')
    })
  }

  return (
    <>
      <div className={`modal-overlay ${modalImgOpen ? 'active' : ''}`}></div>
      <div className={`modal card ${modalImgOpen ? 'active' : ''}`}>
        <div className='modal-header'>
          <h2>Change the photo</h2>
          <span className='close' onClick={handleOpen}>
            &times;
          </span>
        </div>
        <div className='modal-body'>
          <span>Insert the url of file</span>
          <input
            className='modal-input'
            type='text'
            aria-label='URL file input'
            onChange={onFileChange}
          />
        </div>
        <button className='btn' onClick={onClickUpload}>
          Save changes 📸
        </button>
      </div>
    </>
  )
}

export default ModalAvatar
