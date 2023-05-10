import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleAvatarModal } from '../../redux/slices/modal'

function ChangeAvatar() {
  const dispatch = useDispatch()

  const handleOpen = () => {
    dispatch(toggleAvatarModal())
  }
  return (
    <div className='stngs__item'>
      <div>
        <h2>Change image</h2>
        <p>Change your profile image by uploading new file or inserting url.</p>
      </div>
      <div className='stngs__change'>
        <button className='btn' onClick={handleOpen}>
          Change
        </button>
      </div>
    </div>
  )
}

export default ChangeAvatar
